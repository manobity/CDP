'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');
Route.post('/upload', 'UploadController.uploadTarifador');

Route.group(() =>{
    Route.resource('factories', 'FactoryController')
        .apiOnly()
        .except(['update'])
}).middleware(['auth:jwt'])


// exemplo de rota sem autenticação
//Route.get('/index', 'HomeController.index')

// exemplo de rota com autenticação
Route.get('/index', 'HomeController.index').middleware(['auth:jwt'])
