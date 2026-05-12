SELECT status, COUNT(*) AS quantidade
FROM tarefa
GROUP BY status;

SELECT 
    t.id_tarefa,
    t.titulo,
    t.prazo,
    t.prioridade,
    a.nome AS responsavel,
    s.nome_secao
FROM tarefa t
JOIN adulto a ON t.id_responsavel = a.id_adulto
JOIN secao s ON t.id_secao = s.id_secao
WHERE t.status = 'Pendente'
ORDER BY t.prazo ASC;

SELECT 
    t.id_tarefa,
    t.titulo,
    t.status,
    t.prazo,
    a.nome AS responsavel
FROM tarefa t
JOIN adulto a ON t.id_responsavel = a.id_adulto
WHERE t.status = 'Impedida';

SELECT 
    t.titulo,
    h.status_anterior,
    h.status_novo,
    h.data_alteracao,
    h.observacao
FROM historico_status h
JOIN tarefa t ON h.id_tarefa = t.id_tarefa
ORDER BY h.data_alteracao DESC;

SELECT 
    t.titulo AS tarefa,
    td.titulo AS depende_de,
    td.status AS status_dependencia
FROM dependencia_tarefa d
JOIN tarefa t ON d.id_tarefa = t.id_tarefa
JOIN tarefa td ON d.id_tarefa_dependente = td.id_tarefa;
