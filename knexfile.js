// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "pg", // Indica que estamos usando PostgreSQL
        connection: {
            host: "127.0.0.1", // Ou 'localhost'
            port: 5432, // Porta padrão do Postgres
            user: "postgres", // Usuário padrão
            password: "docker", // Senha que definimos no Docker
            database: "policia_api", // O banco de dados que criamos
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/db/migrations`, // Pasta para as migrations
        },
        seeds: {
            directory: `${__dirname}/db/seeds`, // Pasta para os seeds
        },
    },
    // Você pode adicionar configurações para 'staging' e 'production' aqui
};
