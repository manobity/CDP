'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EpicSchema extends Schema {
  up () {
    this.create('epic', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();
      
      table
        .string('estimate_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estimate')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('epic')
  }
}

module.exports = EpicSchema
