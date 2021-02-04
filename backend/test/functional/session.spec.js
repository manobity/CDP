'use strict'

const {test, trait } = use('Test/Suite')('Session spec');

//intelicence para o adonis reconhecer comandos typescript
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient')

test('it should return JWT token when session created', async({ assert, client }) => {
    //Dados fixos na fábrica de teste
    const sessionPayload = {
        email: 'teste@emailteste.com',
        password: '123456'
    };


    // Criar usuario na base de teste
    const user = await Factory
        .model('App/Models/User')
        .create(sessionPayload);

    // Realizar login na aplicacao
    const response = await client
        .post('/authenticate')
        .send(sessionPayload)
        .end()

    response.assertStatus(200);
    assert.exists(response.body.token)
});

