const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
  const resumoStatus = `
    SELECT status, COUNT(*) AS quantidade
    FROM tarefa
    GROUP BY status
  `;

  const proximas = `
    SELECT t.titulo, t.prazo, t.prioridade, t.status, a.nome AS responsavel
    FROM tarefa t
    JOIN adulto a ON t.id_responsavel = a.id_adulto
    WHERE t.status <> 'Concluída'
    ORDER BY t.prazo ASC
    LIMIT 5
  `;

  db.all(resumoStatus, [], (error, statusRows) => {
    if (error) return res.status(500).json({ erro: error.message });

    db.all(proximas, [], (error2, proximasRows) => {
      if (error2) return res.status(500).json({ erro: error2.message });

      res.json({
        resumoPorStatus: statusRows,
        proximasTarefas: proximasRows
      });
    });
  });
});

module.exports = router;
