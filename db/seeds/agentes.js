const { v4: uuidv4 } = require("uuid");

/** @param {import("knex").Knex} knex */
exports.seed = async function (knex) {
    // Deleta dados existentes para evitar duplicatas
    await knex("agentes").del();

    // Insere os agentes
    await knex("agentes").insert([
        {
            id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
            nome: "Rommel Carneiro",
            dataDeIncorporacao: "1992-10-04",
            cargo: "delegado",
        },
        {
            id: "a2b7e6c9-1d3f-4a8e-9b5c-8f6d7e9a1b3c",
            nome: "Ana Pereira",
            dataDeIncorporacao: "2015-03-12",
            cargo: "inspetor",
        },
    ]);
};
