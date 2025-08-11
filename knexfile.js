module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "83782813", // <<< TROQUE PELA SUA SENHA
            database: "policia_api",
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
        useNullAsDefault: true,
    },
};
