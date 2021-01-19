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


      table.timestamps()
    })
  }

  down () {
    this.drop('estimate')
  }
}

module.exports = EstimateSchema
