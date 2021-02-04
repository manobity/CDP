'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssueSchema extends Schema {
  up () {
    this.create('issue', (table) => {
      table.string('id').primary()
      table.string('description').notNullable()
      table.date('type')
      
      table
        .string('history_id')
        .unsigned()
        .references('id')
        .inTable('history')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      
      table.string('factory')
      table.float('length')
      table.string('unit')
      table.float('cost')
      table.date('creation_date')
      table.date('start_date')
      table.date('end_date')
      table.string('status')
      table.string('cap')
      table.string('status_payment')
      table.string('request_gpo')
      table.timestamps()
    })
  }

  down () {
    this.drop('issue')
  }
}

module.exports = IssueSchema
