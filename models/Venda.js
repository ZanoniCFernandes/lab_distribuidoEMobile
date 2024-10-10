module.exports = class Venda {

    constructor(id_cliente, id_estoque, valor_total, quantidade) {
        this.id_cliente = id_cliente;
        this.id_estoque = id_estoque;
        this.valor_total = valor_total;
        this.quantidade = quantidade;
    };

}