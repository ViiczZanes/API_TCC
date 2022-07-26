const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');


const connection = new Sequelize(dbConfig)

connection.authenticate()
    .then(()=> console.log('[Banco de Dados] Connectado Com Sucesso'))
    .catch((err)=>console.log(err));



module.exports = connection