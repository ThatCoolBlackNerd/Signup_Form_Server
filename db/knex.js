const { NODE_ENV } = require('../src/config');
const config = require('../knexfile');
const envConfig = config[NODE_ENV];
const knex = require('knex');
const connection = knex(envConfig);


module.exports = connection;