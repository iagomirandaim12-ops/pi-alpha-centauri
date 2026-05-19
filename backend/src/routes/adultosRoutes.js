const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Listar todos os adultos voluntários
router.get('/', (req, res) => {
  const sql = `
    SELECT
      a.id_adulto,
      a.nome,
      a.email,
      a.telefone,
      a.tipo_funcao,
      a.id_secao,
      s.nome_secao
    FROM adulto a
    LEFT JOIN secao s ON a.id_secao = s.id_secao
    ORDER BY a.nome ASC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json(rows);
  });
});

// Cadastrar adulto voluntário
router.post('/', (req, res) => {
  const { nome, email, telefone, tipo_funcao, id_secao } = req.body;

  if (!nome || !tipo_funcao) {
    return res.status(400).json({
      erro: 'Nome e tipo de função são obrigatórios.'
    });
  }

  const sql = `
    INSERT INTO adulto (nome, email, telefone, tipo_funcao, id_secao)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [nome, email || null, telefone || null, tipo_funcao, id_secao || null],
    function (error) {
      if (error) {
        return res.status(500).json({ erro: error.message });
      }

      res.status(201).json({
        mensagem: 'Adulto voluntário cadastrado com sucesso.',
        id_adulto: this.lastID,
        nome,
        email,
        telefone,
        tipo_funcao,
        id_secao
      });
    }
  );
});

// Atualizar adulto voluntário
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, tipo_funcao, id_secao } = req.body;

  if (!nome || !tipo_funcao) {
    return res.status(400).json({
      erro: 'Nome e tipo de função são obrigatórios.'
    });
  }

  const sql = `
    UPDATE adulto
    SET
      nome = ?,
      email = ?,
      telefone = ?,
      tipo_funcao = ?,
      id_secao = ?
    WHERE id_adulto = ?
  `;

  db.run(
    sql,
    [nome, email || null, telefone || null, tipo_funcao, id_secao || null, id],
    function (error) {
      if (error) {
        return res.status(500).json({ erro: error.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ erro: 'Adulto voluntário não encontrado.' });
      }

      res.json({
        mensagem: 'Adulto voluntário atualizado com sucesso.',
        id_adulto: Number(id),
        nome,
        email,
        telefone,
        tipo_funcao,
        id_secao
      });
    }
  );
});

// Excluir adulto voluntário
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM adulto
    WHERE id_adulto = ?
  `;

  db.run(sql, [id], function (error) {
    if (error) {
      return res.status(500).json({
        erro: 'Não foi possível excluir o adulto voluntário. Verifique se existem tarefas vinculadas a ele.',
        detalhe: error.message
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Adulto voluntário não encontrado.' });
    }

    res.json({ mensagem: 'Adulto voluntário excluído com sucesso.' });
  });
});

module.exports = router;
