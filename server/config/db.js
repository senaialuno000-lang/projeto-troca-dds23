const mysql = require("mysql2/promise");
// Criação do pool de conexões com o banco de dados usando as variáveis de ambiente para configuração
const pool = mysql.createPool({
    host: process.env.DB_HOST,              // Usa a variável de ambiente DB_HOST para configurar o host do banco de dados
    user: process.env.DB_USER,              // Usa a variável de ambiente DB_USER para configurar o usuário do banco de dados
    password: process.env.DB_PASSWORD,      // Usa a variável de ambiente DB_PASSWORD para configurar a senha do banco de dados
    database: process.env.DB_NAME,          // Usa a variável de ambiente DB_NAME para configurar o nome do banco de dados
    waitForConnections: true,               // Configura o pool para esperar por conexões quando o limite de conexões for atingido
    connectionLimit: 10,                    // Define o limite máximo de conexões simultâneas no pool
    queueLimit: 0                           // Define o limite de filas para conexões pendentes (0 significa sem limite)
});

module.exports = pool;                      // Exporta o pool de conexões para ser usado em outras partes da aplicação