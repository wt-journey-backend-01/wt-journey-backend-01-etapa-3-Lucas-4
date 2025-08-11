const { v4: uuidv4 } = require("uuid");

/** @param {import("knex").Knex} knex */
exports.seed = async function (knex) {
    // Deleta dados existentes
    await knex("casos").del();

    // Insere os casos usando os IDs fixos dos agentes
    await knex("casos").insert([
        {
            id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
            titulo: "Homicídio no Bairro União",
            descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007.",
            status: "aberto",
            agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1", // ID do Rommel Carneiro
        },
        {
            id: "c8e7f9a1-5b2d-4c6f-8a9b-3d1e7f5a2b9c",
            titulo: "Furto de Veículo",
            descricao: "Veículo furtado na noite de ontem.",
            status: "solucionado",
            agente_id: "a2b7e6c9-1d3f-4a8e-9b5c-8f6d7e9a1b3c", // ID da Ana Pereira
        },
    ]);
};
