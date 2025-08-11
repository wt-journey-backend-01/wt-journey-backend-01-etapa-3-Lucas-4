/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("casos", (table) => {
        table.uuid("id").primary();
        table.string("titulo").notNullable();
        table.text("descricao").notNullable();
        table.string("status").notNullable();
        table
            .uuid("agente_id")
            .references("id")
            .inTable("agentes")
            .onDelete("SET NULL");
    });
};

/** @param {import("knex").Knex} knex */
exports.down = function (knex) {
    return knex.schema.dropTable("casos");
};
