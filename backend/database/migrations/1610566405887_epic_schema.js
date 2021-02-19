'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EpicSchema extends Schema {
  up () {
    this.create('epics', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();
      
      table
        .string('estimate_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estimates')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('epics')
  }
}

module.exports = EpicSchema
