// noinspection SqlResolve

const db = require('../config/conexao');
const Middleware = require('../middlewares/general');

class VendaDao {

    adicionar(venda) {
        let sql;

        venda.valor_total = Middleware.toCents(venda.valor_total);

        if(venda.id !== undefined) {
            sql = `UPDATE vendas SET id_cliente = ${venda.id_cliente}, id_estoque =${venda.id_estoque}, valor_total = ${venda.valor_total}, quantidade = ${venda.quantidade}`;
        } else {
            sql = `INSERT INTO vendas(id_cliente, id_estoque, valor_total, quantidade) VALUES(${venda.id_cliente}, ${venda.id_estoque}, ${venda.valor_total}, ${venda.quantidade})`
        }

        db.run(sql);
    };

    get(id, callback) {
        db.get(`SELECT * FROM vendas WHERE id = ?`, [id], (err, venda) => {
            if(err || venda === undefined) {
                callback(`Not found`, null);
            } else {
                venda.valor_total = Middleware.toReal(venda.valor_total).toFixed(2);
                callback(null, venda);
            }
        });
    };

    all(callback) {
        db.all(`SELECT * FROM vendas`, [], (err, vendas) => {
            if(err || vendas === undefined) {
                callback(`Not found`, null);
            } else {
                vendas.forEach(venda => venda.valor_total = Middleware.toReal(venda.valor_total).toFixed(2));
                callback(null, vendas);
            }
        });
    };

    total(callback) {
        db.get(`SELECT count(*) as count FROM vendas`, [], (err, total) => {
            if(err || total === undefined) {
                callback(`Not found`, null);
            } else {

                callback(null, total.count);
            }
        });
    };

}

module.exports = new VendaDao();