const sqlite = require('sqlite3');
const db = new sqlite.Database('vendas.db');

module.exports = db;
