/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("casos", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.string("titulo").notNullable();
        table.text("descricao").notNullable(); // Usamos text para descrições mais longas
        table.string("status").notNullable();

        // Chave estrangeira para o agente responsável
        table
            .uuid("agente_id")
            .references("id")
            .inTable("agentes")
            .onDelete("SET NULL"); // Se um agente for deletado, o caso fica sem responsável

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("casos");
};
