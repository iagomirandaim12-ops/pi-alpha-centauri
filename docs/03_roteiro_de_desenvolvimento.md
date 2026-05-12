# Roteiro de Desenvolvimento

## Etapa 1 — Preparar o repositório

1. Criar repositório no GitHub.
2. Subir esta estrutura inicial.
3. Fazer o primeiro commit.

Commit sugerido:

```bash
git commit -m "feat: criar estrutura inicial do projeto"
```

## Etapa 2 — Validar banco de dados

1. Executar `database/01_schema.sql`.
2. Executar `database/02_dados_exemplo.sql`.
3. Testar consultas do arquivo `database/03_consultas_dashboard.sql`.

## Etapa 3 — Rodar backend

```bash
cd backend
npm install
npm run dev
```

## Etapa 4 — Rodar frontend

```bash
cd frontend
npm install
npm run dev
```

## Etapa 5 — Evoluir funcionalidades

Prioridade:

1. Dashboard.
2. Lista de tarefas.
3. Cadastro de tarefa.
4. Alteração de status.
5. Histórico da tarefa.
6. Relatórios.

## Etapa 6 — Preparar entrega final

Adicionar ao relatório:

- prints do sistema;
- DER;
- scripts SQL;
- link do GitHub;
- explicação dos commits;
- testes realizados;
- conclusão com os ganhos obtidos.
