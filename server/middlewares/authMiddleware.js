const jwt = require("jsonwebtoken");                                                                                    // Importa jsonwebtoken para criação de tokens de autenticação


function verificarAutenticacao(req, res, next) {                                                                        // Função middleware para verificar a autenticação do usuário
    const token = req.cookies?.token;                                                                                   // Obtém o token do cookie de autenticação      

    if(!token) {                                                                                                        // Se não houver token, redireciona para a página de login  
        return res.redirect("/login");                                                                                  // Redireciona para a página de login se o token não estiver presente
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);                                                        // Verifica e decodifica o token JWT usando a chave secreta    
        req.usuario = dados;                                                                                            // Armazena os dados do usuário decodificados no objeto de requisição para uso posterior    
        res.locals.usuario = dados;                                                                                     // Armazena os dados do usuário decodificados no objeto de resposta para uso em templates ou outras partes do código
        next();                                                                                                         // Chama a próxima função middleware ou rota
    } catch (erro) {
        res.clearCookie("token");                                                                                       // Limpa o cookie de autenticação se o token for inválido ou expirado
        return res.redirect("/login");                                                                                  // Redireciona para a página de login se o token não estiver presente ou se o token for inválido
    }
}

function somenteAdmin(req, res, next) {                                                                                 // Função middleware para verificar se o usuário tem perfil de administrador
    if(req.usuario.perfil !== "administrador") {                                                                       // Verifica se o perfil do usuário autenticado é diferente de "administrador"
        return res.status(403).render("erro", {mensagem: "Acesso negado"});                                             // Renderiza a página de erro com uma mensagem de acesso negado se o perfil do usuário autenticado não for "administrador"
    }
    next();                                                                                                             // Chama a próxima função middleware ou rota se o perfil do usuário autenticado for "administrador"
}

function somenteOfertante(req, res, next) {                                                                             // Função middleware para verificar se o usuário tem perfil de ofertante
    if(req.usuario.perfil !== "administrador" && req.usuario.perfil !== "ofertante") {                                 // Verifica se o perfil do usuário autenticado é diferente de "administrador" e "ofertante"
        return res.status(403).render("erro", {mensagem: "Acesso negado: Área para adm e ofertantes"});                 // Renderiza a página de erro com uma mensagem de acesso negado se o perfil do usuário autenticado não for "administrador" ou "ofertante"
    }
    next();                                                                                                             // Chama a próxima função middleware ou rota se o perfil do usuário autenticado for "administrador" ou "ofertante"
}

function somenteInteressado(req, res, next) {                                                                           // Função middleware para verificar se o usuário tem perfil de interessado
    if(req.usuario.perfil !== "interessado") {                                                                          // Verifica se o perfil do usuário autenticado é diferente de "administrador" e "interessado"
        return res.status(403).render("erro", {mensagem: "Acesso negado: Área para interessados"});                     // Renderiza a página de erro com uma mensagem de acesso negado se o perfil do usuário autenticado não for "interessado"
    }
    next();                                                                                                             // Chama a próxima função middleware ou rota se o perfil do usuário autenticado for "interessado"
}

function usuariosComuns(req, res, next) {                                                                               // Função middleware para verificar se o usuário tem perfil de usuário comum
    if(req.usuario.perfil === "interessado" && req.usuario.perfil === "ofertante") {                                    // Verifica se o perfil do usuário autenticado é diferente de "administrador", "ofertante" e "interessado"
        return res.status(403).render("erro", {mensagem: "Acesso negado: Área para usuários comuns"});                  // Renderiza a página de erro com uma mensagem de acesso negado se o perfil do usuário autenticado for diferente de "administrador", "ofertante" e "interessado"
    }
    next();                                                                                                             // Chama a próxima função middleware ou rota se o perfil do usuário autenticado for diferente de "administrador", "ofertante" e "interessado"
}

module.exports = {
    verificarAutenticacao,                                                                                              // Exporta a função middleware de verificação de autenticação para ser utilizada em outras partes do código, como em rotas protegidas
    somenteAdmin,                                                                                                       // Exporta a função middleware de verificação de perfil de administrador para ser utilizada em outras partes do código, como em rotas protegidas para administradores
    somenteOfertante,                                                                                                   // Exporta a função middleware de verificação de perfil de ofertante para ser utilizada em outras partes do código, como em rotas protegidas para ofertantes
    somenteInteressado,                                                                                                 // Exporta a função middleware de verificação de perfil de interessado para ser utilizada em outras partes do código, como em rotas protegidas para interessados
    usuariosComuns                                                                                                      // Exporta a função middleware de verificação de perfil de usuário comum para ser utilizada em outras partes do código, como em rotas protegidas para usuários comuns   
}                                                                                                                    



