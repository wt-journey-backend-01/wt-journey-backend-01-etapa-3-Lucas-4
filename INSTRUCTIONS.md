# API do Departamento de Polícia - Instruções

Este projeto contém a API para gerenciamento de casos e agentes policiais.

## Como Iniciar o Ambiente

1.  **Iniciar o Banco de Dados:**
    Certifique-se de ter o Docker e o Docker Compose instalados. Execute o comando:
    ```bash
    docker-compose up -d
    ```

2.  **Instalar Dependências do Projeto:**
    ```bash
    npm install
    ```

3.  **Executar Migrations e Seeds:**
    Para criar as tabelas e popular o banco de dados com dados iniciais, execute:
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```

4.  **Iniciar a Aplicação:**
    ```bash
    npm start
    ```

A API estará disponível em `http://localhost:3000`.
A documentação da API está em `http://localhost:3000/docs`.