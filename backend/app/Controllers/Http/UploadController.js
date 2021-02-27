'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')
const Issue = use('App/Models/Issue')
const History = use('App/Models/History')
const Epic = use('App/Models/Epic')

/**
 * Resourceful controller for interacting with projects
 */
class UploadController {
     /**
     * Create/save a new .
     * POST upload/jira
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
      async uploadJira({ request, response }) {

        const fs = require('fs');

        let rawdata = fs.readFileSync('upload/arquivo_teste_B2C4213-176.json');
        let array = JSON.parse(rawdata);
        let bodyRequest = {};

        /****************************************
         * Create or Update History in DataBase *
         ****************************************/
        if ( array.fields.issuetype.name == 'História' ) 
        {
            bodyRequest = ({
                'id': array.key,
                'description': array.fields.summary,
                'epic_id': array.fields.customfield_10100,
                'length': array.fields.customfield_11110,
                'creation_date':  array.fields.created,
                'start_date': array.fields.customfield_10818,
                'end_date': array.fields.duedate,
                'update_date': array.fields.updated
            });

            /***********************************************
             * Create Epic if it doesn't exist for History *
             ***********************************************/ 
            if ( await Epic.find( array.fields.customfield_10100 ) == undefined )
            {
                console.log('Criar Epico - ', array.fields.customfield_10100);
                await Epic.create( {' id': array.fields.customfield_10100 } );
            }

            /*****************************
             * Create or Update History  *
             *****************************/ 
            if ( await History.find(array.key ) == undefined )
            {
                console.log( 'Criar Historia: ', array.key );
                await History.create( bodyRequest );
            } 
            else 
            {
                
                console.log( 'Atualizar Historia: ', array.key );
                await History 
                    .query()
                    .where( 'id', array.key)
                    .update( bodyRequest );   
            }
        }

        /**************************************
         * Create or Update issue in DataBase *
         **************************************/
        if (( array.fields.issuetype.name == 'Tarefas Fabrica' ||
              array.fields.issuetype.name == 'Desenvolvimento Fabrica' ||
              array.fields.issuetype.name == 'Atividade de Apoio' )) 
        {
            bodyRequest = ({
                'id': array.key,
                'description': array.fields.summary,
                'type': array.fields.issuetype.name,
                'history_id': array.fields.parent.key,
                'accountable': array.fields.assignee.displayName,
                'system': array.fields.components[0].name,
                'factory': array.fields.customfield_11102.value,
                'length': array.fields.customfield_11110,
                'unit': array.fields.customfield_10242.value,
                'creation_date':  array.fields.created,
                'start_date': array.fields.customfield_10818,
                'end_date': array.fields.duedate,
                'update_date': array.fields.updated
                });
            
            /****************************************************
             * Create History if it doesn't exist for issueType *
             * Tarefa de Fabrica or Desenvolvimento Fabrica     *
             ****************************************************/ 
            if ( ( array.fields.issuetype.name == 'Tarefas Fabrica' ||
                   array.fields.issuetype.name == 'Desenvolvimento Fabrica') &&
                 ( await History.find(array.fields.parent.key ) == undefined )
                )
            {
                //console.log('Criar Historia - ', array.fields.parent.key);
                await History.create( {'id': array.fields.parent.key } );
            }

            /***************************
             * Create or Update Issue  *
             ***************************/ 
            if ( await Issue.find( array.key ) == undefined )
            {
                await Issue.create( bodyRequest );
            } 
            else 
            {
                await Issue 
                    .query()
                    .where( 'id', array.key)
                    .update( bodyRequest );                
            }
        }

        response.status(200);
      }

    /**
     * Create/save a new factory and Issues.
     * POST upload/tarifador
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async uploadTarifador({ request, response }) {

        const csv = require('csvtojson')
        const csvFilePath = 'upload/analiticos_full_20210212_064446.csv'
        const array = await csv({ delimiter: '\;', output: 'json' }).fromFile(csvFilePath);
        let bodyRequest = {};

        console.log('Start import from the  [', csvFilePath, '] file.');
        for ( var row in array ) 
        {
            /**************************************
             * Create Project if it doesn't exist *
             **************************************/ 
            
            if ( Project.find( array[row].ID_PPM ) == undefined )
            {
                //console.log('Nao achou - ', array[row].ID_PPM);
                await Project.create({
                        'id': array[row].ID_PPM,
                        'name': array[row].NOME_DA_ATIVIDADE
                });
            } 

            bodyRequest = ({
                'id': array[row].ID_ATIVIDADE,
                'description': null, //null
                'type': array[row].TIPO_ATIVIDADE,
                'history_id': null,  //null
                'accountable': array[row].RESPONSAVEL,
                'system': array[row].SISTEMA,
                'factory': array[row].FABRICA,
                'comment': array[row].CRITICA,
                'length': array[row].ESFORCO,
                'unit': array[row].UNIDADE_ESFORCO,
                'unit_cost': array[row].VALOR_UNITARIO,
                'total_cost': array[row].VALOR_TOTAL,
                'creation_date': array[row].DATA_CRIACAO,
                'start_date': array[row].DATA_INICIO,
                'end_date': array[row].DATA_CONCLUSAO,
                'update_date': array[row].DATA_ATUALIZACAO_JIRA,
                'status': array[row].STATUS,
                'cap': array[row].CAP,
                'budget_available': array[row].ORCAMENTO_DISPONIVEL,
                'status_payment': array[row].STATUS_PAGTO,
                'request_gpo': array[row].PEDIDO_GPO,
                'request_date_gpo': array[row].DATA_PEDIDO_JIRA,
                'request_sap': array[row].PEDIDO_SAP,
                'status_sap': array[row].STATUS_JIRA
                });
            
            /***************************
             * Create or Update Issue  *
             ***************************/ 
            if ( await Issue.find( array[row].ID_ATIVIDADE ) == undefined )
            {
                //console.log('Nao achou - ', array[row].ID_ATIVIDADE);
                await Issue.create( bodyRequest );

            } 
            else 
            {
                //console.log('Achou - ', array[row].ID_ATIVIDADE);
                await Issue 
                    .query()
                    .where( 'id', array[row].ID_ATIVIDADE)
                    .update( bodyRequest );                
            }
        }

        console.log('File [', csvFilePath, '] successfully imported!');
        console.log('Loaded [', array.length, '] lines.!');

        response.status(200);
    }
}

module.exports = UploadController
