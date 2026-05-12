const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
  const sql = `
    SELECT 
      a.*,
      s.nome_secao
    FROM adulto a
    LEFT JOIN secao s ON a.id_secao = s.id_secao
    ORDER BY a.nome ASC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) return res.status(500).json({ erro: error.message });
    res.json(rows);
  });
});

module.exports = router;
