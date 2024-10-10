const express = require('express');
const consign = require('consign');
const Tabelas = require('./config/Tabelas');

Tabelas.init();
Tabelas.seed();

const app = express();
app.use(express.json());
let portNumber;
portNumber = 8080;

consign().include('controllers').into(app);

app.listen(portNumber, () =>
    console.log(`Servidor rodando na porta ${portNumber}`));

app.get('/', (req, res) =>
    res.status(200).send(`Servidor rodando, tudo ok!`));


