'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('history', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();
      
      table
        .string('epic_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('epic')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('history')
  }
}

module.exports = HistorySchema
