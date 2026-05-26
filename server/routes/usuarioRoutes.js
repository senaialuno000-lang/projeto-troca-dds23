const express = require("express");                                                                         // Importação do módulo express;
const router = express.Router();                                                                            // Cria um roteador para definir as rotas relacionadas aos usuários
const usuarioController = require("../controllers/usuarioController.js");                                   // Importação do controlador de usuários para lidar com a lógica de negócios relacionada aos usuários
const upload = require("../config/multer.js");                                                              // Importação da configuração do multer para lidar com uploads de arquivos, como fotos de perfil dos usuários
const {verificarAutenticacao, somenteAdmin} = require("../middlewares/authMiddleware.js");                  // Importação das funções middleware de autenticação e autorização para proteger rotas que exigem autenticação e acesso de administrador

// Rotas Publicas 
router.post("/login", usuarioController.login);                                                             // Define a rota POST para login, que chama a função de login do controlador de usuários
router.post("/logout", usuarioController.logout);                                                           // Define a rota POST para logout, que chama a função de logout do controlador de usuários
router.post("/cadastrar", upload.single("foto"), usuarioController.cadastrar);                              // Define a rota POST para cadastro, que chama a função de cadastro do controlador de usuários e lida com o upload da foto


// Rotas Protegidas
router.use(verificarAutenticacao);                                                                          // Aplica o middleware de verificação de autenticação a todas as rotas definidas abaixo, garantindo que apenas usuários autenticados possam acessá-las
router.use(somenteAdmin);                                                                                   // Aplica o middleware de autorização para administradores a todas as rotas definidas abaixo, garantindo que apenas usuários com perfil de administrador possam acessá-las

// Obtém a lista de usuários e define as rotas para usuários;
router.get("/", (req, res) => {
    res.json({"mensagem": "Peguei a lista de usuários"});                                                   // Responde com um objeto JSON contendo uma mensagem;
});

// Retorna a página de cadastro de usuários;
router.get("/cadastro", (req, res) => {
    res.json({"mensagem": "Página de cadastro de usuários"});                                               // Responde com um objeto JSON contendo uma mensagem;
});

module.exports = router;                                                                                    // Exporta o roteador para ser utilizado em outros arquivos, como o server.js