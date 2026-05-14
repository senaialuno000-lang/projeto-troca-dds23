// Importação do módulo express;
const express = require("express");                                                 // Importa o módulo express para criar o servidor
const app = express();                                                              // Cria uma instância da aplicação express
require("dotenv").config();                                                         // Importa o módulo do dotenv, lê o arquivo .env, e já configura inicialmente as variáveis de ambiente definidas nele para serem usadas no processo do Node.js
const port = process.env.PORT || 5000;                                              // Define a porta do servidor, usando a variável de ambiente PORT ou 5000 como padrão
const path = require("path");                                                       // Importa o módulo path para lidar com caminhos de arquivos e diretórios

// Middleware para entender o JSON
app.use(express.json());                                                            // Configura o middleware para parsing do corpo da requisição em JSON, permitindo que o servidor entenda os dados enviados no formato JSON
app.use(express.urlencoded({extended: true}));                                      // Configura o middleware para parsing do corpo da requisição em URL-encoded, permitindo que o servidor entenda os dados enviados por formulários HTML   
app.use(require("cookie-parser")());                                                // Configura o middleware para parsing de cookies, permitindo que o servidor leia e manipule cookies enviados pelos clientes

// Configuração do EJS e pastas do Front-end;
// Define o EJS como engine do front;
app.set("view engine", "ejs");                                                      // Configura o EJS como a engine de visualização para renderizar arquivos .ejs
app.set("views", path.join(__dirname, "../client/views"));                          // Define o diretório onde os arquivos de visualização estão localizados
app.use(express.static(path.join(__dirname, "../client/public")));                  // Configura o diretório para servir arquivos estáticos, como CSS, JavaScript e imagens, a partir da pasta "public" dentro do diretório "client" 

// Criação de rotas padrão;
app.get("/", (req, res) => {                                                        // Define uma rota GET para a raiz "/"
    res.status(200).redirect ("/login");                                            // Redireciona a requisição para a rota "/login" com status 200 (OK)                  
});

app.get("/login", (req, res) => {                                                   // Define uma rota GET para "/login" (a função de callback está vazia, o que significa que não há resposta definida para essa rota)
    res.render("auth/login");                                                       // Tenta renderizar um arquivo EJS como resposta, mas há um erro de sintaxe aqui (falta o parâmetro 'res' na função de callback)
}); 

app.get("/cadastro", (req, res) => {                                                // Define uma rota GET para "/cadastro" (a função de callback está vazia, o que significa que não há resposta definida para essa rota)
    res.render("auth/cadastro");                                                    // Tenta renderizar um arquivo EJS  como resposta, mas há um erro de sintaxe aqui (falta o parâmetro 'res' na função de callback)
}); 


// Importar as rotas de usuário;
const usuariosRoutes = require("./routes/usuarioRoutes.js");                        // Importa as rotas de usuário do arquivo usuarioRoutes.js
app.use("/usuarios", usuariosRoutes);                                               // Usa as rotas de usuário para qualquer caminho que comece com "/usuarios"   


const pool = require("./config/db.js");                                             // Importa a configuração do pool de conexões do banco de dados
(async () => {                                                                      // Define uma função assíncrona auto-executável
    try {                                                                           // Tenta executar o código dentro do bloco
        await pool.getConnection();                                                 // Aguarda a conexão com o banco de dados ser estabelecida
        console.log("Banco Conectado com Sucesso!");                                // Exibe mensagem de sucesso no console

        app.listen(port, () => {                                                    // Inicia o servidor na porta especificada
            console.log(`Servidor ativo na porta: ${port}`);                        // Exibe mensagem de que o servidor está ativo
            console.log(`Link: http://localhost:${port}`);                          // Exibe no console o link para acessar o servidor
        });
    } catch (erro) {                                                                // Captura qualquer erro que ocorra
        console.log("Erro ao conectar com o banco de dados:", erro);                // Exibe o erro no console
        process.exit(1);                                                            // Encerra o processo com código de erro
    }
})();                                                                               // Executa a função imediatamente
