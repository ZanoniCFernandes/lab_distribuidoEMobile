module.exports = app => {
    app.get('/clientes', (req, res) => {
        res.send(`Rota de clientes`);
    });
}