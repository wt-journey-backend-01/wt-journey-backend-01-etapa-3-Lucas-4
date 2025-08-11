const db = require("../db/db");

function findAll() {
    return db("casos");
}

function findById(id) {
    return db("casos").where({ id }).first();
}

// Funções para os filtros bônus
function findBy(filter) {
    return db("casos").where(filter);
}

function search(query) {
    return db("casos")
        .where("titulo", "ilike", `%${query}%`) // ilike é case-insensitive (específico do Postgres)
        .orWhere("descricao", "ilike", `%${query}%`);
}

function create(caso) {
    return db("casos").insert(caso).returning("*");
}

function update(id, data) {
    return db("casos").where({ id }).update(data).returning("*");
}

function remove(id) {
    return db("casos").where({ id }).del();
}

module.exports = {
    findAll,
    findById,
    findBy,
    search,
    create,
    update,
    remove,
};
