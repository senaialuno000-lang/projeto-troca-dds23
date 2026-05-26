const multer = require("multer");                                                                   // Import Multer para lidar com uploads de arquivos
const path = require("path");                                                                       // Import Path para lidar com caminhos de arquivos
const fs = require("fs");                                                                           // Import File System para lidar com operações de arquivos

const storage = multer.diskStorage({                                                                // Configurar definições de armazenamento para o Multer
    destination: (req, file, cb) => {                                                               // Definir o destino para os arquivos enviados
        let pastaDestino = "geral";                                                                 // Pasta padrão para uploads
        
        if(req.originalUrl.includes("/usuarios")) {                                                 // Verificar se a URL da requisição contém "/usuarios"
            pastaDestino = "usuarios";                                                              // Definir pasta como "usuarios" se a condição for atendida
        } else if(req.originalUrl.includes("/produtos")) {                                          // Verificar se a URL da requisição contém "/produtos"
            pastaDestino = "produtos";                                                              // Definir pasta como "produtos" se a condição for atendida
        }

        const uploadPath = path.join(__dirname, `../../client/public/uploads/${pastaDestino}`);     // Construir o caminho completo para os uploads
        
        if(!fs.existsSync(uploadPath)) {                                                            // Verificar se o caminho de upload existe
            fs.mkdirSync(uploadPath, {recursive: true});                                            // Criar o diretório se ele não existir
        }

        cb(null, uploadPath);                                                                       // Passar o caminho de upload para a função de callback
    },

    filename: (req, file, cb) => {
        const timestamp = Date.now();                                                               // Gerar um timestamp para nome de arquivo único
        const numeroAleatorio = Math.round(Math.random() * 1E9);                                    // Gerar um número aleatório para nomeação única do arquivo   
        const extensaoDoArquivo = path.extname(file.originalname);                                  // Obter a extensão do arquivo a partir do nome original
        const nomeFinalSeguro = `${timestamp}-${numeroAleatorio}${extensaoDoArquivo}`;              // Construir o nome final do arquivo usando timestamp, número aleatório e extensão original
        cb(null, nomeFinalSeguro);                                                                  // Passar o nome final do arquivo para a função de callback
    }
});

const upload = multer({storage: storage});                                                          // Criar uma instância do Multer com as configurações de armazenamento definidas
module.exports = upload;                                                                            // Exportar a instância do Multer para uso em outras partes da aplicação