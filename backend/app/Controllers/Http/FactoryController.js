'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Factory = use('App/Models/Factory')

/**
 * Resourceful controller for interacting with factories
 */
class FactoryController {
  /**
   * Show a list of all factories.
   * GET factories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const factories = await Factory.all();

    return factories;
  }

  /**
   * Create/save a new factory.
   * POST factories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['factoryname']);
    const factory = await Factory.create(data);

    return factory;
  }

  /**
   * Display a single factory.
   * GET factories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const factory = await Factory.findOrFail(params.id);

    return factory;
  }

  /**
   * Delete a factory with id.
   * DELETE factories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const factory = await Factory.findOrFail(params.id);

    await factory.delete();
  }
}

module.exports = FactoryController
