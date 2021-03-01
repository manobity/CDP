'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')
const Issue = use('App/Models/Issue')
const History = use('App/Models/History')
const Epic = use('App/Models/Epic')
const Estimate = use('App/Models/Estimate')

/**
 * Resourceful controller for interacting with projects
 */
class UploadController {
     /**
     * Create/save a new Estimate, Epic, History or Issue.
     * POST upload/jira
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

      async uploadJira({ request, response }) {

        const fs = require('fs');

        let rawdata = fs.readFileSync('upload/arquivo_teste_B2C4213.json');
        let array = JSON.parse(rawdata);
        let bodyRequest = {};

        for ( var row in array.issues ) 
        {
            console.log('ID: ',  array.issues[row].key);

            /****************************************
             * Create or Update Estimate in DataBase *
             ****************************************/
            if ( array.issues[row].fields.issuetype.name == 'Estimativa Tecnica' ) 
            {
                bodyRequest = ({
                    'id': array.issues[row].key,
                    'project_id': array.issues[row].fields.project.key,
                    'description': array.issues[row].fields.summary,
                    'type': array.issues[row].fields.issuetype.name,
                    'creation_date':  array.issues[row].fields.created,
                    'start_date_alocation': array.issues[row].fields.customfield_10234,
                    'end_date_alocation': array.issues[row].fields.customfield_10230,
                    'start_date_metricas': array.issues[row].fields.customfield_14708,
                    'end_date_metricas': array.issues[row].fields.customfield_14709,
                    'update_date': array.issues[row].fields.updated,
                    'status': array.issues[row].fields.status.name
                });

                /*****************************
                 * Create or Update Estimate  *
                 *****************************/ 
                if ( await Estimate.find(array.issues[row].key ) == undefined )
                {
                    await Estimate.create( bodyRequest );
                } 
                else 
                {
                    await Estimate 
                        .query()
                        .where( 'id', array.issues[row].key)
                        .update( bodyRequest );   
                }
            }

            /****************************************
             * Create or Update Epic in DataBase *
             ****************************************/
            if ( array.issues[row].fields.issuetype.name == 'Épico' ) 
            {
                bodyRequest = ({
                    'id': array.issues[row].key,
                    'project_id': array.issues[row].fields.project.key,
                    'description': array.issues[row].fields.summary,
                    'creation_date':  array.issues[row].fields.created,
                    'start_date': array.issues[row].fields.customfield_10818,
                    'end_date': array.issues[row].fields.duedate,
                    'update_date': array.issues[row].fields.updated,
                    'status': array.issues[row].fields.status.name
                });

                /*****************************
                 * Create or Update Epic  *
                 *****************************/ 
                if ( await Epic.find(array.issues[row].key ) == undefined )
                {
                    await Epic.create( bodyRequest );
                } 
                else 
                {
                    await Epic 
                        .query()
                        .where( 'id', array.issues[row].key)
                        .update( bodyRequest );   
                }
            }

            /****************************************
             * Create or Update History in DataBase *
             ****************************************/
            if ( array.issues[row].fields.issuetype.name == 'História' ) 
            {
                bodyRequest = ({
                    'id': array.issues[row].key,
                    'description': array.issues[row].fields.summary,
                    'project_id': array.issues[row].fields.project.key,
                    'epic_id': array.issues[row].fields.customfield_10100,
                    'length': array.issues[row].fields.customfield_11110,
                    'creation_date':  array.issues[row].fields.created,
                    'start_date': array.issues[row].fields.customfield_10818,
                    'end_date': array.issues[row].fields.duedate,
                    'update_date': array.issues[row].fields.updated,
                    'status': array.issues[row].fields.status.name
                });

                /***********************************************
                 * Create Epic if it doesn't exist for History *
                 ***********************************************/ 
                if ( await Epic.find( array.issues[row].fields.customfield_10100 ) == undefined && 
                     array.issues[row].fields.customfield_10100 !== null
                   )
                {
                    await Epic.create( {' id': array.issues[row].fields.customfield_10100 } );
                }

                /*****************************
                 * Create or Update History  *
                 *****************************/ 
                if ( await History.find(array.issues[row].key ) == undefined )
                {
                    await History.create( bodyRequest );
                } 
                else 
                {
                    await History 
                        .query()
                        .where( 'id', array.issues[row].key)
                        .update( bodyRequest );   
                }
            }

            /**************************************
             * Create or Update issue in DataBase *
             **************************************/
            if (( array.issues[row].fields.issuetype.name == 'Tarefas Fabrica' ||
                array.issues[row].fields.issuetype.name == 'Desenvolvimento Fabrica' ||
                array.issues[row].fields.issuetype.name == 'Atividade de Apoio' )) 
            {

                bodyRequest = ({
                    'id': array.issues[row].key,
                    'description': array.issues[row].fields.summary,
                    'type': array.issues[row].fields.issuetype.name,
                    'accountable': array.issues[row].fields.assignee.displayName,
                    'system': array.issues[row].fields.components[0].name,
                    'factory': array.issues[row].fields.customfield_11102.value,
                    'length': array.issues[row].fields.customfield_11110,
                    'unit': array.issues[row].fields.customfield_10242.value,
                    'creation_date':  array.issues[row].fields.created,
                    'start_date': array.issues[row].fields.customfield_10818,
                    'end_date': array.issues[row].fields.duedate,
                    'update_date': array.issues[row].fields.updated,
                    'status': array.issues[row].fields.status.name
                    });
                
                //Add history case Tarefa Fabrica or Desenvolvimento Fabrica
                if ( array.issues[row].fields.issuetype.name !== 'Atividade de Apoio' ){
                    bodyRequest = ({
                        'id': array.issues[row].key,
                        'description': array.issues[row].fields.summary,
                        'type': array.issues[row].fields.issuetype.name,
                        'history_id': array.issues[row].fields.parent.key,
                        'accountable': array.issues[row].fields.assignee.displayName,
                        'system': array.issues[row].fields.components[0].name,
                        'factory': array.issues[row].fields.customfield_11102.value,
                        'length': array.issues[row].fields.customfield_11110,
                        'unit': array.issues[row].fields.customfield_10242.value,
                        'creation_date':  array.issues[row].fields.created,
                        'start_date': array.issues[row].fields.customfield_10818,
                        'end_date': array.issues[row].fields.duedate,
                        'update_date': array.issues[row].fields.updated,
                        'status': array.issues[row].fields.status.name
                        });
                }
                
                /****************************************************
                 * Create History if it doesn't exist for issueType *
                 * Tarefa de Fabrica or Desenvolvimento Fabrica     *
                 ****************************************************/ 
                if ( ( array.issues[row].fields.issuetype.name == 'Tarefas Fabrica' ||
                    array.issues[row].fields.issuetype.name == 'Desenvolvimento Fabrica') &&
                    ( await History.find(array.issues[row].fields.parent.key ) == undefined )
                    )
                {
                    await History.create( {'id': array.issues[row].fields.parent.key } );
                }

                /***************************
                 * Create or Update Issue  *
                 ***************************/ 
                if ( await Issue.find( array.issues[row].key ) == undefined )
                {
                    await Issue.create( bodyRequest );
                } 
                else 
                {
                    await Issue 
                        .query()
                        .where( 'id', array.issues[row].key)
                        .update( bodyRequest );                
                }
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
            
            if (await Project.find( array[row].PROJETO ) == undefined )
            {
                await Project.create({
                        'id': array[row].PROJETO,
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
                await Issue.create( bodyRequest );

            } 
            else 
            {
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
