const db = require('../config/conexao');

class ClienteDao {

    adicionar(cliente){
        let sql;

        if(cliente.id !== undefined) {
            sql = `UPDATE clientes SET nome = '${cliente.nome.trim()}', email = '${cliente.email.trim().toLocaleLowerCase()}', senha = '${cliente.senha}' WHERE id = ${cliente.id}`;
        } else {
            sql = `INSERT INTO clientes(nome, email, senha) VALUES('${cliente.nome.trim()}', '${cliente.email.trim().toLocaleLowerCase()}', '${cliente.senha}')`;
        }

        db.run(sql);
    };

    get(id, callback) {
        db.get(`SELECT * FROM clientes WHERE id = ?`, [id], (err, cliente) => {
            if(err || cliente === undefined) {
                callback(`Not found`, null);
            } else {
                callback(null, cliente);
            }
        });
    };

    all(callback) {
        db.all(`SELECT * FROM clientes`, [], (err, clientes) => {
            if(err || clientes === undefined) {
                callback(`Not Found`, null);
            } else {
                callback(null, clientes);
            }
        });
    };

    total(callback) {
        db.get(`SELECT count(*) as count FROM clientes`, [], (err, total) => {
            if(err || total === undefined) {
                callback(`Not Found`, null);
            } else {
                callback(null, total.count);
            }
        });
    };

}

module.exports = new ClienteDao();
