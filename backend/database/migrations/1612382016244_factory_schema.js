'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FactorySchema extends Schema {
  up () {
    this.create('factories', (table) => {
      table.increments()
      table.string('factoryname', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('factories')
  }
}

module.exports = FactorySchema