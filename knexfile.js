// Remova o aninhamento "development: { ... }" e exporte o objeto diretamente.
module.exports = {
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "83782813", // Troque pela sua senha
        database: "policia_api",
    },
    migrations: {
        directory: "./db/migrations",
    },
    seeds: {
        directory: "./db/seeds",
    },
    useNullAsDefault: true,
};
