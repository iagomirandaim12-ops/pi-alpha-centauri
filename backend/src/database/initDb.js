const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'app.db');
const schemaPath = path.join(__dirname, '../../../database/01_schema.sql');
const seedPath = path.join(__dirname, '../../../database/02_dados_exemplo.sql');

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');
const seed = fs.readFileSync(seedPath, 'utf8');

db.exec(schema, (schemaError) => {
  if (schemaError) {
    console.error('Erro ao criar schema:', schemaError.message);
    return;
  }

  db.exec(seed, (seedError) => {
    if (seedError) {
      console.error('Erro ao inserir dados:', seedError.message);
      return;
    }

    console.log('Banco criado e populado com sucesso.');
    db.close();
  });
});
