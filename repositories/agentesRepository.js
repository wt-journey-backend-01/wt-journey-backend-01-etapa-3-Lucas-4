const db = require("../db/db.js");
const { v4: uuidv4 } = require("uuid");

function findAll(filter = {}) {
    const query = db("agentes");
    if (filter.cargo) {
        query.where("cargo", "ilike", filter.cargo);
    }
    return query;
}

// ... findById, create, update, remove (permanecem como antes)
function findById(id) {
    return db("agentes").where({ id }).first();
}

function create(agente) {
    const newAgente = { id: uuidv4(), ...agente };
    return db("agentes").insert(newAgente).returning("*");
}

function update(id, data) {
    return db("agentes").where({ id }).update(data).returning("*");
}

function remove(id) {
    return db("agentes").where({ id }).del();
}

module.exports = { findAll, findById, create, update, remove };
