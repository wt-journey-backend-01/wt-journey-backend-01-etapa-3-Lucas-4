const db = require("../db/db.js");
const { v4: uuidv4 } = require("uuid");

function findAll(filter = {}) {
    const query = db("casos");

    if (filter.status) {
        query.where({ status: filter.status });
    }

    if (filter.agente_id) {
        query.where({ agente_id: filter.agente_id });
    }

    if (filter.q) {
        const searchTerm = `%${filter.q}%`;
        query.where(function () {
            this.where("titulo", "ilike", searchTerm).orWhere(
                "descricao",
                "ilike",
                searchTerm
            );
        });
    }

    return query;
}

function findById(id) {
    return db("casos").where({ id }).first();
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

module.exports = { findAll, findById, create, update, remove };
