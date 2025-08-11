/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deleta dados existentes para evitar duplicatas, na ordem inversa da criação
    await knex("casos").del();
    await knex("agentes").del();

    // Insere os agentes e guarda os IDs retornados
    const agentes = await knex("agentes")
        .insert([
            {
                nome: "Rommel Carneiro",
                dataDeIncorporacao: "1992-10-04",
                cargo: "delegado",
            },
            {
                nome: "Ana Pereira",
                dataDeIncorporacao: "2015-03-12",
                cargo: "inspetor",
            },
        ])
        .returning(["id", "nome"]);

    // Mapeia os nomes dos agentes para seus IDs para uso fácil
    const agenteIdMap = agentes.reduce((map, agente) => {
        map[agente.nome] = agente.id;
        return map;
    }, {});

    // Insere os casos usando os IDs dos agentes criados
    await knex("casos").insert([
        {
            titulo: "Homicídio no Bairro União",
            descricao:
                "Disparos foram reportados às 22:33 do dia 10/07/2007, resultando na morte da vítima.",
            status: "aberto",
            agente_id: agenteIdMap["Rommel Carneiro"],
        },
        {
            titulo: "Furto de Veículo",
            descricao:
                "Veículo furtado na noite de ontem. O caso está sob investigação.",
            status: "solucionado",
            agente_id: agenteIdMap["Ana Pereira"],
        },
    ]);
};
