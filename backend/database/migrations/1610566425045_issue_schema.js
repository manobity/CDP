'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssueSchema extends Schema {
  up () {
    this.create('issue', (table) => {
      table.string('id').primary();
      
      table
        .string('history_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('history')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('issue')
  }
}

module.exports = IssueSchema
