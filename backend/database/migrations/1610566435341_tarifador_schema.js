'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TarifadorSchema extends Schema {
  up () {
    this.create('tarifadors', (table) => {
      table.increments()

      table
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('project')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('issue_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('issue')
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
