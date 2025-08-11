# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Instala o Knex globalmente dentro do container para poder rodar os comandos
RUN npm install -g knex

# Copia o resto dos arquivos do projeto para o diretório de trabalho
COPY . .


# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]