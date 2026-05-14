const express = require("express");                                                                                 // Importação do módulo express;
const router = express.Router();                                                                                    // Cria um roteador para definir as rotas relacionadas aos usuários
const usuarioController = require("../controllers/usuarioController.js");                                           // Importação do controlador de usuários para lidar com a lógica de negócios relacionada aos usuários

// Rotas Publicas 
router.post("/login", usuarioController.login);                                                                    // Define a rota POST para login, que chama a função de login do controlador de usuários
router.post("/logout", usuarioController.logout);                                                                  // Define a rota POST para logout, que chama a função de logout do controlador de usuários

// Obtém a lista de usuários e define as rotas para usuários;
router.get("/", (req, res) => {
    res.json({"mensagem": "Peguei a lista de usuários"});                                                           // Responde com um objeto JSON contendo uma mensagem;
});

// Retorna a página de cadastro de usuários;
router.get("/cadastro", (req, res) => {
    res.json({"mensagem": "Página de cadastro de usuários"});                                                       // Responde com um objeto JSON contendo uma mensagem;
});

module.exports = router;                                                                                            // Exporta o roteador para ser utilizado em outros arquivos, como o server.js