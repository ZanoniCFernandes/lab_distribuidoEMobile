const express = require('express');
const consign = require('consign');

const app = express();
const portNumber = 3000;

consign().include('controllers').into(app);

app.listen(portNumber, () =>
    console.log(`Servidor rodando na porta ${portNumber}`));

app.get('/', (req, res) =>
    res.send(`Servidor rodando, tudo ok!`));


