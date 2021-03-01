'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstimateSchema extends Schema {
  up () {
    this.create('estimates', (table) => {
      table.string('id').primary()

      table
        .string('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('description')
      table.string('type')
      table.string('creation_date')
      table.string('start_date_alocation')
      table.string('end_date_alocation')
      table.string('start_date_metricas')
      table.string('end_date_metricas')
      table.string('update_date')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('estimates')
  }
}

module.exports = EstimateSchema
