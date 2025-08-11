// O feedback sugere usar process.env, o que é uma ótima prática
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;
