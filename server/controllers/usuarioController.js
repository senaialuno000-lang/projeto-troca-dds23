const bcrypt = require("bcrypt");                                                                               // Importa bcrypt para hash de senhas
const jwt = require("jsonwebtoken");                                                                            // Importa jsonwebtoken para criação de tokens de autenticação
const usuarioModel = require("../models/usuarioModel.js");

module.exports = {                                                                                              // Função para registrar um novo usuário      
    // Função de Login
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;                                                                  // Extrai email e senha do corpo da requisição
            const usuario = await usuarioModel.buscarPorEmail(email);                                           // Busca o usuário no banco de dados pelo email
            if (!usuario) return res.status(404).render("erro", { mensagem: "Credenciais Inválidas." });        // Renderiza a página de erro se o usuário não for encontrado
            const senhaValida = await bcrypt.compare(senha, usuario.senha);                                     // Compara a senha fornecida com a senha armazenada no banco de dados       
            if (!senhaValida) return res.status(404).render("erro", { mensagem: "Credenciais Inválidas." });    // Renderiza a página de erro se a senha for inválida
            const token = jwt.sign(                                                                             // Gera um token JWT com as informações do usuário
                { id: usuario.id, perfil: usuario.perfil, nome: usuario.nome },                                 // Payload do token contendo o ID, perfil e nome do usuário
                process.env.JWT_SECRET,                                                                         // Chave secreta para assinar o token, armazenada em uma variável de ambiente
                { expiresIn: "1h" }                                                                            // Define o tempo de expiração do token para 1 hora    
            );
            res.cookie("token", token, { httpOnly: true });
            if (usuario.perfil === "administrador") return res.redirect("/usuarios");                           // Redireciona para a página de administração de usuários se o perfil for "administrador"
            if (usuario.perfil === "ofertante") return res.redirect("/produtos/meus-produtos");                 // Redireciona para a página de produtos do usuário se o perfil for "ofertante"
            if (usuario.perfil === "interessado") return res.redirect("/produtos/vitrine");                     // Redireciona para a página de vitrine de produtos se o perfil for "interessado"
        } catch (erro) {
            res.status(500).render("erro", { mensagem: "Erro interno do servidor." });                          // Renderiza a página de erro com uma mensagem genérica
        }
    },

    logout: (req, res) => {
        res.clearCookie("token");                                                                               // Limpa o cookie de autenticação para efetuar o logout do usuário
        res.redirect("/login");                                                                                 // Redireciona para a página de login após o logout
    },

    renderizarCadastro: (req, res) => {                                                                         // Função para renderizar a página de cadastro de usuário
        res.render("usuario/cadastrar");                                                                        // Renderiza a página de cadastro de usuário
    },

    cadastrar: async (req, res) => {                                                                            // Função para cadastrar um novo usuário
        try {
            const { nome, email, senha, telefone, perfil } = req.body;                                          // Extrai os dados do usuário do corpo da requisição 

            if (perfil === "administrador") {                                                                   // Verifica se o perfil selecionado é "administrador"
                return res.status(403).render("erro", { mensagem: "Você não possui acesso" });                  // Renderiza a página de erro com uma mensagem de acesso negado se o perfil for "administrador"
            }

            const fotoDaPessoa = req.file ? `uploads/usuarios/${req.file.name}` : null;                         // Verifica se um arquivo de foto foi enviado e define o caminho da foto, ou null se não houver foto            

        const senhaHash = await bcrypt.hash(senha, 10);                                                         // Hash da senha usando bcrypt com um salt de 10 rounds     
            await usuarioModel.criarUsuario(nome, email, senhaHash, telefone, fotoDaPessoa, perfil);            // Chama a função do modelo para criar um novo usuário no banco de dados com os dados fornecidos
            let redirecionadoPara = "/login";                                                                   // Define a página de redirecionamento padrão para login  

        if (req.cookies && req.cookies.token) {                                                                 // Verifica se o usuário está autenticado verificando a presença do token no cookie
                try {
                    const decodificado = jwt.verify(req.cookies.token, process.env.JWT_SECRET);                 // Verifica e decodifica o token JWT usando a chave secreta  
                    if (decodificado.perfil === "administrador") {                                              // Verifica se o perfil do usuário autenticado é "administrador"
                        redirecionadoPara = "/usuarios";                                                        // Se o perfil do usuário autenticado for "administrador", redireciona para a página de administração de usuários
                    }
                } catch {

                }
            }
            res.redirect(redirecionadoPara);                                                                    // Redireciona para a página definida após o cadastro do usuário, que pode ser a página de login ou a página de administração de usuários, dependendo do perfil do usuário autenticado (se houver)
        } catch (erro) {
            console.error(erro);                                                                                // Loga o erro no console para depuração
            res.status(500).render("erro", { mensagem: "Erro ao cadastrar o usuário" });                        // Renderiza a página de erro com uma mensagem específica se ocorrer um erro durante o processo de cadastro do usuário
        }
    }
}

