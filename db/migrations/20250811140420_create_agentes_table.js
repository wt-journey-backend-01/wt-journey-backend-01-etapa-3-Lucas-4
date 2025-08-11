/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("agentes", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid()); // UUID como chave primária
        table.string("nome").notNullable();
        table.date("dataDeIncorporacao").notNullable();
        table.string("cargo").notNullable();
        table.timestamps(true, true); // Cria as colunas created_at e updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("agentes");
};
