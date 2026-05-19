INSERT INTO secao (nome_secao) VALUES
('Alcateia'),
('Tropa Escoteira'),
('Tropa Sênior'),
('Clã Pioneiro'),
('Diretoria');

INSERT INTO adulto (nome, email, telefone, tipo_funcao, id_secao) VALUES
('Iago Miranda', 'iago@email.com', '11999999999', 'Diretoria', 5),
('Igor Santos', 'igor@email.com', '11988888888', 'Chefe de Seção', 2),
('Isabela Romeu', 'isabela@email.com', '11977777777', 'Diretoria', 5);

INSERT INTO tarefa 
(titulo, descricao, prazo, prioridade, status, tipo_tarefa, id_responsavel, id_secao)
VALUES
('Comprar alimentos do acampamento', 'Comprar os alimentos antes da atividade.', '2026-05-10', 'Alta', 'Pendente', 'Pontual', 1, 5),
('Organizar cozinha do acampamento', 'Organizar equipe e materiais da cozinha.', '2026-05-12', 'Alta', 'Impedida', 'Pontual', 2, 2),
('Relatório mensal de tarefas', 'Gerar relatório de execução das tarefas do mês.', '2026-05-30', 'Média', 'Pendente', 'Recorrente', 3, 5),
('Planejar atividade de campo', 'Definir roteiro e materiais da atividade.', '2026-05-20', 'Alta', 'Em andamento', 'Pontual', 2, 2),
('Registrar conclusão da atividade', 'Gerar histórico e relatório final.', '2026-05-25', 'Baixa', 'Pendente', 'Pontual', 1, 5);

VALUES
(2, 1);

