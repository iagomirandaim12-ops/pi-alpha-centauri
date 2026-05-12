const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
  db.all('SELECT * FROM secao ORDER BY nome_secao ASC', [], (error, rows) => {
    if (error) return res.status(500).json({ erro: error.message });
    res.json(rows);
  });
});

module.exports = router;
