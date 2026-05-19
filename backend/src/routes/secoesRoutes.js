const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todas as seções
router.get('/', (req, res) => {
  const sql = `
    SELECT *
    FROM secao
    ORDER BY nome_secao ASC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json(rows);
  });
});

// Cadastrar nova seção
router.post('/', (req, res) => {
  const { nome_secao } = req.body;

  if (!nome_secao) {
    return res.status(400).json({ erro: 'O nome da seção é obrigatório.' });
  }

  const sql = `
    INSERT INTO secao (nome_secao)
    VALUES (?)
  `;

  db.run(sql, [nome_secao], function (error) {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.status(201).json({
      mensagem: 'Seção cadastrada com sucesso.',
      id_secao: this.lastID,
      nome_secao
    });
  });
});

// Atualizar seção
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome_secao } = req.body;

  if (!nome_secao) {
    return res.status(400).json({ erro: 'O nome da seção é obrigatório.' });
  }

  const sql = `
    UPDATE secao
    SET nome_secao = ?
    WHERE id_secao = ?
  `;

  db.run(sql, [nome_secao, id], function (error) {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Seção não encontrada.' });
    }

    res.json({
      mensagem: 'Seção atualizada com sucesso.',
      id_secao: Number(id),
      nome_secao
    });
  });
});

// Excluir seção
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM secao
    WHERE id_secao = ?
  `;

  db.run(sql, [id], function (error) {
    if (error) {
      return res.status(500).json({
        erro: 'Não foi possível excluir a seção. Verifique se existem adultos ou tarefas vinculados a ela.',
        detalhe: error.message
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Seção não encontrada.' });
    }

    res.json({ mensagem: 'Seção excluída com sucesso.' });
  });
});

module.exports = router;
