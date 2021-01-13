'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();
      
      table
        .integer('epic_id')
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
    this.drop('histories')
  }
}

module.exports = HistorySchema
