'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstimateSchema extends Schema {
  up () {
    this.create('estimate', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();

      table
        .string('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('project')
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
    this.drop('estimate')
  }
}

module.exports = EstimateSchema
