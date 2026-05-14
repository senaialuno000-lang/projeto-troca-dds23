-- Deleta o banco de dados:
DROP DATABASE sistema_trocas;

-- Cria o banco de dados:
CREATE DATABASE IF NOT EXISTS sistema_trocas;

-- Utiliza a Tabela Criada para Criação das Tabelas
USE sistema_trocas;

-- Deleta as tabelas antigas caso existam:
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS interesses;

-- Tabela usuários 
CREATE TABLE usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255),
    telefone VARCHAR(20),
    foto VARCHAR(255),
    perfil ENUM('administrador', 'ofertante', 'interessado')
);

-- Tabela Produtos
CREATE TABLE produtos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao text, 
    preco DECIMAL(10,2),
    condicao ENUM('novo', 'usado') DEFAULT 'usado', 
    foto VARCHAR(255),
    is_publico BOOLEAN DEFAULT TRUE,
    status_troca BOOLEAN DEFAULT FALSE,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Interesses
CREATE TABLE interesses(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    id_interessado INT,
    data_interesse DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Referência de Chaves Estrangeiras
    FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_interessado) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- insert de Usuarios
-- ADM
INSERT INTO usuarios(nome, email, senha, telefone, perfil)
VALUES('Admin Greg', 'greg@gmail.com', '$2a$10$bnVggkOhZQJP9ipjXWe01eztcGAB/T3ptXbA36MzwiAyAn6EkYaca', '2740028922', 'administrador');
-- Ofertante 	
INSERT INTO usuarios(nome, email, senha, telefone, perfil)
VALUES('João Ofertante', 'ofertante@gmail.com', '$2a$10$bnVggkOhZQJP9ipjXWe01eztcGAB/T3ptXbA36MzwiAyAn6EkYaca', '2740028922', 'ofertante');
-- Interessado
INSERT INTO usuarios(nome, email, senha, telefone, perfil)
VALUES('Bruce Interessado', 'interessado@gmail.com', '$2a$10$bnVggkOhZQJP9ipjXWe01eztcGAB/T3ptXbA36MzwiAyAn6EkYaca', '2740028922', 'interessado');