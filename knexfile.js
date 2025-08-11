// Carrega as variáveis de ambiente do arquivo .env para process.env
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    /**
     * Configuração para o ambiente de desenvolvimento LOCAL.
     * Usado quando você roda `npm start` ou `npx knex` na sua máquina.
     */
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            tableName: "knex_migrations",
            // Corrigindo o caminho para apontar para a pasta 'database'
            directory: `${__dirname}/db/migrations`,
        },
        seeds: {
            directory: `${__dirname}/db/seeds`,
        },
    },

    /**
     * Configuração para o ambiente de Integração Contínua (CI).
     * Usado por sistemas de automação como GitHub Actions.
     * A principal diferença é o 'host', que se conecta pelo nome do serviço Docker.
     */
    ci: {
        client: "pg",
        connection: {
            host: "db", // Nome do serviço do banco de dados no docker-compose.yml do CI
            port: 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/db/migrations`,
        },
        seeds: {
            directory: `${__dirname}/db/seeds`,
        },
    },
};
