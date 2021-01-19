'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('project', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      
      table.timestamps()
    })
  }

  down () {
    this.drop('project')
  }
}

module.exports = ProjectSchema
