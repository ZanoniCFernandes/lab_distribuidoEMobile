const VendaDao = require('../dao/VendaDao');

module.exports = app => {

    app.get('/vendas', (req, res) => {
        VendaDao.all((err, vendas) => {
            res.header("Access-Control-Allow-Origin", "*");

            if(err == null) {
                res.status(200).send(vendas);
            } else {
                res.status(400).send(`Not found`);
            }
        });
    });

    app.post('/vendas', (req, res) => {
        const newVenda = req.body;

        if(!newVenda.id_cliente || !newVenda.id_estoque || !newVenda.valor_total || !newVenda.quantidade) {
            res.status(400).send(`Erro: id do cliente, id do estoque, valor total e quantidade são obrigatórios para cada cadastro de venda`);
        } else if (newVenda.valor_total < 0 || newVenda.quantidade < 0) {
            res.status(400).send(`Erro: valor total e quantidade não podem ser negativos`);
        } else {
            res.status(200).send(`Venda atualizada com sucesso!
                                    id do cliente = ${newVenda.id_cliente},
                                    id do estoque = ${newVenda.id_estoque},
                                    valor total = ${newVenda.valor_total},
                                    quantidade = ${newVenda.quantidade}`);
            VendaDao.adicionar(newVenda);
        }
    });
}