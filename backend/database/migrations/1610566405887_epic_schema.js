'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EpicSchema extends Schema {
  up () {
    this.create('epics', (table) => {
      table.string('id').primary()
      table
        .string('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description')
      table.string('creation_date')
      table.string('start_date')
      table.string('end_date')
      table.string('update_date')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('epics')
  }
}

module.exports = EpicSchema
