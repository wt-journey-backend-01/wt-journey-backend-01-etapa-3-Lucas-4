const db = require("../database");
const { v4: uuidv4 } = require("uuid");

function findAll() {
    return db("casos");
}

function findById(id) {
    return db("casos").where({ id }).first();
}

// Bônus: Para filtros como /casos?status=aberto
function findBy(filter) {
    return db("casos").where(filter);
}

// Bônus: Para busca full-text
function search(query) {
    const searchTerm = `%${query}%`;
    return db("casos")
        .where("titulo", "ilike", searchTerm)
        .orWhere("descricao", "ilike", searchTerm);
}

function create(caso) {
    const newCaso = { id: uuidv4(), ...caso };
    return db("casos").insert(newCaso).returning("*");
}

function update(id, data) {
    return db("casos").where({ id }).update(data).returning("*");
}

function remove(id) {
    return db("casos").where({ id }).del();
}

module.exports = { findAll, findById, findBy, search, create, update, remove };
