'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.string('id').primary()
      table.string('description')      
      table
        .string('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('epic_id')
        .unsigned()
        .references('id')
        .inTable('epics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('length')
      table.string('unit')
      table.string('creation_date')
      table.string('start_date')
      table.string('end_date')
      table.string('update_date')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
