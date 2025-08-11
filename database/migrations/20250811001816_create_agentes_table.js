/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("agentes", (table) => {
        table.uuid("id").primary();
        table.string("nome").notNullable();
        table.date("dataDeIncorporacao").notNullable();
        table.string("cargo").notNullable();
    });
};

/** @param {import("knex").Knex} knex */
exports.down = function (knex) {
    return knex.schema.dropTable("agentes");
};
