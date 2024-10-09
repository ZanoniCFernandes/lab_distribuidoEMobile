const ClienteDao = require('../dao/ClienteDao');

module.exports = app => {
    app.get('/clientes', (req, res) => {
        ClienteDao.all((err,clientes) => {
            res.header("Access-Control-Allow-Origin", "*");

            if(err == null) {
                res.send(clientes);
            } else {
                res.status(404).send(`Not Found`);
            }
        });
    });

    app.post('/clientes', (req, res) => {
        const newCliente = req.body;

        if(!newCliente.nome || !newCliente.email || !newCliente.senha) {
            res.status(400).send('Erro: nome, email e senha são obrigatórios');
        } else {
            ClienteDao.adicionar(newCliente);
            res.status(200).send(`Cliente Adicionado com sucesso!
                                    nome: ${newCliente.nome.trim()},
                                    email: ${newCliente.email.trim().toLocaleLowerCase()}`);
        }
    })
}