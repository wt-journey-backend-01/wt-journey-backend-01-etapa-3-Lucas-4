const db = require("../db/db"); // Importa a conexão do Knex

// Knex retorna Promises, então todas as funções serão assíncronas
function findAll() {
    return db("agentes"); // SELECT * FROM agentes
}

function findById(id) {
    return db("agentes").where({ id }).first(); // SELECT * FROM agentes WHERE id = ? LIMIT 1
}

function create(agente) {
    // INSERT INTO agentes(...) VALUES(...) RETURNING *
    return db("agentes").insert(agente).returning("*");
}

function update(id, data) {
    return db("agentes").where({ id }).update(data).returning("*");
}

function remove(id) {
    return db("agentes").where({ id }).del(); // DELETE FROM agentes WHERE id = ?
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
