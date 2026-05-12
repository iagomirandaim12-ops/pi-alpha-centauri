# PI Alpha Centauri — Gestão e Rastreabilidade de Tarefas

Sistema web desenvolvido para o Projeto Integrador da UNIVESP, com foco na gestão e rastreabilidade de tarefas de adultos voluntários do 453º Grupo Escoteiro Alpha Centauri.

## Objetivo

Desenvolver uma aplicação web para:

- cadastrar adultos voluntários;
- cadastrar seções;
- cadastrar tarefas;
- atribuir responsáveis;
- controlar prazos, prioridades e status;
- registrar histórico de alterações;
- controlar dependências entre tarefas;
- exibir dashboard de acompanhamento.

## Estrutura do repositório

```text
pi-alpha-centauri/
├── backend/       API em Node.js + Express
├── frontend/      Interface em React + Vite
├── database/      Scripts SQL
├── docs/          Documentação do projeto
└── README.md
```

## Tecnologias sugeridas

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de dados: SQLite
- Versionamento: Git/GitHub

## Como executar o projeto

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

A API será executada em:

```text
http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend será executado em:

```text
http://localhost:5173
```

## Scripts de banco

Os arquivos SQL estão na pasta `database`.

Execute primeiro:

```text
01_schema.sql
```

Depois:

```text
02_dados_exemplo.sql
```

## Sugestão de commits

```bash
git add .
git commit -m "feat: criar estrutura inicial do projeto"
git commit -m "feat: adicionar schema do banco de dados"
git commit -m "feat: implementar backend inicial"
git commit -m "feat: implementar frontend inicial"
git commit -m "docs: adicionar documentação do projeto"
```

## Status do projeto

Versão inicial pronta para desenvolvimento e demonstração acadêmica.
