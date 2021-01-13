'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstimateSchema extends Schema {
  up () {
    this.create('estimates', (table) => {
      table.string('id').primary();
      table.string('description').notNullable();

      table
        .integer('project_id')
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
    this.drop('estimates')
  }
}

module.exports = EstimateSchema
