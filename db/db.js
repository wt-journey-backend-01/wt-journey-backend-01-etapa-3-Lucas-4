const knex = require("knex");
const knexConfig = require("../knexfile.js");

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

module.exports = knex(config);
