module.exports = {
    client: "pg",
    connection: {
        host: "postgres-db", // <-- MUDANÇA CRÍTICA: Nome do serviço no docker-compose
        port: 5432, // Dentro da rede Docker, a porta é a padrão 5432
        user: "postgres",
        password: "sua_senha_docker", // A mesma senha definida no docker-compose
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
