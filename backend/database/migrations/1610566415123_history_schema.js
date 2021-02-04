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
        .references('id')
        .inTable('epic')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('length')
      table.string('unit')
      table.float('cost')
      table.date('creation_date')
      table.date('start_date')
      table.date('end_date')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('history')
  }
}

module.exports = HistorySchema
