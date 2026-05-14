const UsuarioModel = require("../models/usuarioModel.js");                                                  // Importa o modelo de usuário para interagir com o banco de dados
const bcrypt = require("bcrypt");                                                                           // Importa bcrypt para hash de senhas
const jwt = require("jsonwebtoken");                                                                        // Importa jsonwebtoken para criação de tokens de autenticação
const usuarioModel = require("../models/usuarioModel.js");

module.exports = {                                                                                          // Função para registrar um novo usuário      
    // Função de Login
    login: async(req, res) => {
        try {
            const {email, senha} = req.body;                                                                // Extrai email e senha do corpo da requisição
            const usuario = await usuarioModel.buscarPorEmail(email);                                       // Busca o usuário no banco de dados pelo email
            if(!usuario) return res.status(404).render("erro", {mensagem: "Credenciais Inválidas."});       // Renderiza a página de erro se o usuário não for encontrado
            const senhaValida = await bcrypt.compare(senha, usuario.senha);                                 // Compara a senha fornecida com a senha armazenada no banco de dados       
            if(!senhaValida) return res.status(404).render("erro", {mensagem: "Credenciais Inválidas."});   // Renderiza a página de erro se a senha for inválida
            const token = jwt.sign(                                                                         // Gera um token JWT com as informações do usuário
                {id: usuario.id, perfil: usuario.perfil, nome: usuario.nome},                               // Payload do token contendo o ID, perfil e nome do usuário
                process.env.JWT_SECRET,                                                                     // Chave secreta para assinar o token, armazenada em uma variável de ambiente
                {expriresIn: "1h"}                                                                          // Define o tempo de expiração do token para 1 hora    
            );
            res.cookie("token", token, {httpOnly: true});
            if(usuario.perfil === "administrador") return res.redirect("/usuarios");                        // Redireciona para a página de administração de usuários se o perfil for "administrador"
            if(usuario.perfil === "ofertante") return res.redirect("/produtos/meus-produtos");              // Redireciona para a página de produtos do usuário se o perfil for "ofertante"
            if(usuario.perfil === "interessado") return res.redirect("/produtos/vitrine");                  // Redireciona para a página de vitrine de produtos se o perfil for "interessado"
        } catch (erro) {
            res.status(500).render("erro", {mensagem: "Erro interno do servidor."});                        // Renderiza a página de erro com uma mensagem genérica
        }
    },

    logout: (req, res) => {                                                                                 
        res.clearCookie("token");                                                                           // Limpa o cookie de autenticação para efetuar o logout do usuário
        res.redirect("/login");                                                                             // Redireciona para a página de login após o logout
    }
}

