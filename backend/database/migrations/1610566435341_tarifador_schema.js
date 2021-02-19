'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TarifadorSchema extends Schema {
  up () {
    this.create('tarifadors', (table) => {
      table.increments()

      table
      .string('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .string('issue_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('issues')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')


      table.timestamps()
    })
  }

  down () {
    this.drop('tarifadors')
  }
}

module.exports = TarifadorSchema
