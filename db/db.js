// Agora, apenas importamos a configuração, sem precisar especificar o ambiente.
const config = require("../knexfile.js");
const knex = require("knex")(config);

module.exports = knex;
