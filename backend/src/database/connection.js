const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'app.db');

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erro ao conectar no banco:', error.message);
    return;
  }
  console.log('Banco SQLite conectado.');
});

db.run('PRAGMA foreign_keys = ON;');

module.exports = db;
