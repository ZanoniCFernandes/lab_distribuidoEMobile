// noinspection SqlResolve

const db = require('../config/conexao');
const Middleware = require('../middlewares/general');

class ProdutoDao {

    adicionar(produto) {
        let sql;

        produto.valor = Middleware.toCents(produto.valor);

        if(produto.id !== undefined) {
            sql = `UPDATE estoques SET nome = '${produto.nome.trim()}', valor = ${produto.valor}, quantidade = ${produto.quantidade}`;
        } else {
            sql = `INSERT INTO estoques(nome, valor, quantidade) VALUES('${produto.nome.trim()}', ${produto.valor}, ${produto.quantidade})`;
        }

        db.run(sql);
    };

    get(id, callback) {
        db.get(`SELECT * FROM estoques WHERE id = ?`, [id], (err, produto) => {
            if(err || produto === undefined) {
                callback(`Not found`, null);
            } else {
                produto.valor = Middleware.toReal(produto.valor).toFixed(2);
                callback(null, produto);
            }
        });
    };

    all(callback) {
        db.all(`SELECT * FROM estoques`, [], (err, estoques) => {
            if(err || estoques === undefined) {
                callback(`Not found`, null);
            } else {
                estoques.forEach(produto => produto.valor = Middleware.toReal(produto.valor).toFixed(2));
                callback(null, estoques);
            }
        });
    };

    total(callback) {
        db.get(`SELECT count(*) as count FROM estoques`, [], (err, total) => {
            if(err || total === undefined) {
                callback(`Not found`, null);
            } else {
                callback(null, total.count);
            }
        });
    };

}

module.exports = new ProdutoDao();