require("dotenv").config();

module.exports = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST || "localhost",
        port: 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "supersecretpassword",
        database: process.env.DB_NAME || "policia_api",
    },
    migrations: {
        directory: "./db/migrations",
    },
    seeds: {
        directory: "./db/seeds",
    },
};
