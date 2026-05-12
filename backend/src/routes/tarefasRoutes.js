const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
  const sql = `
    SELECT 
      t.*,
      a.nome AS responsavel,
      s.nome_secao
    FROM tarefa t
    JOIN adulto a ON t.id_responsavel = a.id_adulto
    JOIN secao s ON t.id_secao = s.id_secao
    ORDER BY t.prazo ASC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) return res.status(500).json({ erro: error.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { titulo, descricao, prazo, prioridade, status, tipo_tarefa, id_responsavel, id_secao } = req.body;

  const sql = `
    INSERT INTO tarefa 
    (titulo, descricao, prazo, prioridade, status, tipo_tarefa, id_responsavel, id_secao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [titulo, descricao, prazo, prioridade, status || 'Pendente', tipo_tarefa || 'Pontual', id_responsavel, id_secao],
    function (error) {
      if (error) return res.status(500).json({ erro: error.message });
      res.status(201).json({ id_tarefa: this.lastID });
    }
  );
});

router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status_novo, observacao } = req.body;

  db.get('SELECT status FROM tarefa WHERE id_tarefa = ?', [id], (error, tarefa) => {
    if (error) return res.status(500).json({ erro: error.message });
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

    const status_anterior = tarefa.status;

    db.run('UPDATE tarefa SET status = ? WHERE id_tarefa = ?', [status_novo, id], (updateError) => {
      if (updateError) return res.status(500).json({ erro: updateError.message });

      db.run(
        `INSERT INTO historico_status (id_tarefa, status_anterior, status_novo, observacao)
         VALUES (?, ?, ?, ?)`,
        [id, status_anterior, status_novo, observacao || 'Alteração de status'],
        (historyError) => {
          if (historyError) return res.status(500).json({ erro: historyError.message });
          res.json({ mensagem: 'Status atualizado com sucesso.' });
        }
      );
    });
  });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT id_tarefa FROM tarefa WHERE id_tarefa = ?', [id], (error, tarefa) => {
    if (error) return res.status(500).json({ erro: error.message });

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    db.run('DELETE FROM historico_status WHERE id_tarefa = ?', [id], (historyError) => {
      if (historyError) return res.status(500).json({ erro: historyError.message });

      db.run('DELETE FROM tarefa WHERE id_tarefa = ?', [id], function (deleteError) {
        if (deleteError) return res.status(500).json({ erro: deleteError.message });

        res.json({ mensagem: 'Tarefa excluída com sucesso.' });
      });
    });
  });
});
module.exports = router;
