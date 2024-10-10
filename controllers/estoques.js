const ProdutoDao = require('../dao/ProdutoDao');

module.exports = app => {

    app.get('/estoques', (req, res) => {
        ProdutoDao.all((err, produtos) => {
            res.header("Access-Control-Allow-Origin", "*");

            if(err == null) {
                res.status(200).send(produtos);
            } else {
                res.status(404).send(`Not found`);
            }
        });
    });

    app.post('/estoques', (req, res) => {
        const newProduto = req.body;

        if(!newProduto.nome || !newProduto.valor || !newProduto.quantidade) {
            res.status(400).send(`Erro: nome, valor e quantidade são obrigatórios para cadastro de produto`);
        } else if(newProduto.valor < 0 || newProduto.quantidade < 0) {
            res.status(400).send(`Erro: valor e quantidade não podem ser negativos`);
        } else {
            res.status(200).send(`Produto atualizado com sucesso!
                                    nome:  ${newProduto.nome.trim()},
                                    valor: ${newProduto.valor},
                                    quantidade: ${newProduto.quantidade}`);
            ProdutoDao.adicionar(newProduto);
        }
    })
}