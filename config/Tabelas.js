const conexao = require('./conexao');

const ClienteDao = require('../dao/ClienteDao');
const Cliente = require('../models/Cliente');

class Tabelas {

    init() {
        conexao.serialize(() => {
            conexao.run('CREATE TABLE IF NOT EXISTS clientes(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, senha VARCHAR(255) NOT NULL)');
            conexao.run('CREATE TABLE IF NOT EXISTS estoques(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(255) NOT NULL, valor REAL NOT NULL, quantidade INTEGER NOT NULL)');
            conexao.run('CREATE TABLE IF NOT EXISTS vendas(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_cliente INTEGER NOT NULL, id_estoque INTEGER NOT NULL, valor_total REAL NOT NULL, quantidade INTEGER NOT NULL, FOREIGN KEY (id_cliente) REFERENCES cliente(id), FOREIGN KEY(id_estoque) REFERENCES estoque(id))');
        });
    };

    seed() {
        ClienteDao.total((err, total) => {
            if(total === 0) {
                ClienteDao.adicionar(new Cliente('Cliente 1', 'cliente1@teste.com', '123456'));
                ClienteDao.adicionar(new Cliente('Cliente 2', 'cliente2@teste.com', '123456'));
                ClienteDao.adicionar(new Cliente('Cliente 3', 'cliente3@teste.com', '123456'));
                ClienteDao.adicionar(new Cliente('Cliente 4', 'cliente4@teste.com', '123456'));
                ClienteDao.adicionar(new Cliente('Cliente 5', 'cliente5@teste.com', '123456'));
            }
        });
    };
}

module.exports = new Tabelas;

