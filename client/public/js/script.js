document.addEventListener("DOMContentLoaded", () => {                                                                                                   // Aguarda o carregamento completo do DOM antes de executar o código
    const inputFoto = document.getElementById("foto");                                                                                                  // Obtém o elemento de input de arquivo de foto
    const previewBox = document.getElementById("preview-box");                                                                                          // Obtém o container de preview
    const previewImg = document.getElementById("preview-img");                                                                                          // Obtém a imagem de preview

    if (inputFoto && previewBox && previewImg) {                                                                                                        // Verifica se todos os elementos foram encontrados
        if(!previewImg.getAttribute("src") || previewImg.getAttribute("src") === "..." || previewImg.getAttribute("src") === "") {                      // Verifica se a imagem não tem src ou tem src vazio/padrão
            previewImg.src = "/img/sem-foto.png";                                                                                                       // Define a imagem padrão (sem foto)
            previewBox.style.display = "block";                                                                                                         // Mostra o container de preview               
        }

        inputFoto.addEventListener("change", function(evento) {                                                                                         // Adiciona listener para quando o arquivo for alterado
            const arquivo = evento.target.files[0];                                                                                                     // Obtém o primeiro arquivo selecionado
            if(arquivo) {                                                                                                                               // Se existe arquivo selecionado
                const leitorDeArquivo = new FileReader();                                                                                               // Cria um leitor de arquivo
                leitorDeArquivo.onload = function(e) {                                                                                                   // Define o que fazer quando o arquivo for lido
                    previewImg.src = e.target.result;                                                                                                   // Atualiza o src da imagem com o dados em base64
                    previewBox.style.display = "block";                                                                                                 // Mostra o container de preview
                }
                leitorDeArquivo.readAsDataURL(arquivo);                                                                                                 // Lê o arquivo como Data URL (base64)
            } else {                                                                                                                                    // Se nenhum arquivo foi selecionado, exibe imagem padrão
                previewImg.src = "/img/sem-foto.png";                                                                                                   // Exibe imagem padrão
                previewBox.style.display = "block";                                                                                                     // Mostra o container de preview
            }
        })
    }
})