const db = require("../config/db.js");                                                                                                      // Importa a configuração do banco de dados

module.exports = {
    // Busca o usuário na tabela, com o email fornecido;
    buscarPorEmail: async(email) => {
        const query = "SELECT * FROM usuarios WHERE email = ?";                                                                             // Consulta SQL para buscar o usuário pelo email
        const [linhas] = await db.execute(query, [email]);                                                                                  // Executa a consulta, passando o email como parâmetro
        return linhas[0];                                                                                                                   // Retorna o primeiro resultado encontrado
    },
    // Crud {Create} - Criar um novo usuário;
    criarUsuario: async(nome, email, senha, telefone, foto, perfil) => {
        const query = "INSERT INTO usuarios (nome, email, senha, telefone, foto, perfil) VALUES (?, ?, ?, ?, ?, ?)";                        // Consulta SQL para inserir um novo usuário
        const [resultado] = await db.execute(query, [nome, email, senha, telefone, foto, perfil]);                                          // Executa a consulta, passando os dados do usuário como parâmetros 
        return resultado.insertId;                                                                                                          // Retorna o ID do usuário recém-criado                                                
    }
}
