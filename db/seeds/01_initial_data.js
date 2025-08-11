const { v4: uuidv4 } = require("uuid");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    await knex("casos").del();
    await knex("agentes").del();

    const agente1_id = uuidv4();
    const agente2_id = uuidv4();

    await knex("agentes").insert([
        {
            id: agente1_id,
            nome: "Rommel Carneiro",
            dataDeIncorporacao: "1992-10-04",
            cargo: "delegado",
        },
        {
            id: agente2_id,
            nome: "Ana Pereira",
            dataDeIncorporacao: "2015-03-12",
            cargo: "inspetor",
        },
    ]);

    await knex("casos").insert([
        {
            id: uuidv4(),
            titulo: "Homicídio no Bairro União",
            descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007.",
            status: "aberto",
            agente_id: agente1_id,
        },
        {
            id: uuidv4(),
            titulo: "Furto de Veículo",
            descricao: "Veículo furtado na noite de ontem.",
            status: "solucionado",
            agente_id: agente2_id,
        },
    ]);
};
