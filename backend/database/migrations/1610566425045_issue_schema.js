'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssueSchema extends Schema {
  up () {
    this.create('issues', (table) => {
      table.string('id').primary()
      table.string('description')
      table.string('type')
      
      table
        .string('history_id')
        .unsigned()
        .references('id')
        .inTable('histories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      
      table.string('accountable')
      table.string('system')
      table.string('factory')
      table.string('comment')
      table.string('length')
      table.string('unit')
      table.string('unit_cost')
      table.string('total_cost')
      table.string('creation_date')
      table.string('start_date')
      table.string('end_date')
      table.string('update_date')
      table.string('status')
      table.string('cap')
      table.string('budget_available')
      table.string('status_payment')
      table.string('request_gpo')
      table.string('request_date_gpo')
      table.string('request_sap')
      table.string('status_sap')
      table.timestamps()
    })
  }

  down () {
    this.drop('issues')
  }
}

module.exports = IssueSchema
