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

## Tecnologias utilizadas

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de dados: SQLite
- Versionamento: Git/GitHub

## Documentação do projeto

A documentação complementar do projeto está organizada na pasta `docs`:

- [DER conceitual](docs/01_der_conceitual.md): apresenta a modelagem conceitual do banco de dados.
- [Regras de negócio](docs/02_regras_negocio.md): descreve as principais regras do sistema.
- [Roteiro de desenvolvimento](docs/03_roteiro_de_desenvolvimento.md): organiza as etapas previstas para construção do projeto.
- [Texto base para o relatório final](docs/04_texto_para_relatorio.md): contém uma base textual para elaboração do relatório acadêmico.
- [Testes realizados](docs/05_testes_realizados.md): registra os testes manuais feitos durante o desenvolvimento.
- [Deploy e publicação](docs/06_deploy_publicacao.md): apresenta uma proposta de publicação futura da aplicação.

## Aderência aos conceitos do Projeto Integrador

Este projeto está alinhado aos principais conceitos trabalhados no Projeto Integrador da UNIVESP, pois desenvolve uma aplicação web com separação entre frontend, backend e banco de dados.

### Aplicação web e arquitetura cliente-servidor

O sistema utiliza uma arquitetura cliente-servidor. O frontend, desenvolvido com React e Vite, é responsável pela interface utilizada pelo usuário. O backend, desenvolvido com Node.js e Express, disponibiliza rotas de API para que o frontend possa consultar, cadastrar, atualizar e excluir informações.

Essa separação demonstra o funcionamento básico de aplicações web modernas, em que o navegador atua como cliente e o servidor processa as requisições, acessa o banco de dados e devolve respostas.

### Frontend

O frontend foi desenvolvido com React, HTML, CSS e JavaScript, permitindo a construção de uma interface dinâmica para cadastro, listagem e acompanhamento das tarefas dos adultos voluntários do grupo escoteiro.

### Backend

O backend foi desenvolvido com Node.js e Express, sendo responsável por organizar as regras de acesso aos dados e disponibilizar as rotas da aplicação, como tarefas, adultos voluntários, seções e dashboard.

### Banco de dados relacional

O projeto utiliza banco de dados relacional SQLite. Foram criadas tabelas para armazenar seções, adultos voluntários, tarefas, dependências entre tarefas e histórico de alterações de status.

O uso de chaves primárias, chaves estrangeiras e restrições de validação demonstra a aplicação de conceitos de modelagem de dados relacional e SQL.

### Operações CRUD

O sistema contempla operações de cadastro, consulta, atualização e exclusão de informações, especialmente relacionadas às tarefas. Essas operações representam o conceito de CRUD, fundamental no desenvolvimento de sistemas web com banco de dados.

### Rastreabilidade

A rastreabilidade é um dos pontos centrais do sistema. Cada tarefa possui responsável, seção, prazo, prioridade, status e tipo de tarefa. Além disso, as alterações de status são registradas em uma tabela de histórico, permitindo acompanhar a evolução das atividades.

### Controle de versão

O projeto está versionado com Git e armazenado no GitHub, permitindo o acompanhamento da evolução do código, a organização dos arquivos e o compartilhamento com os integrantes do grupo.

### Testes e validação

A validação do sistema foi realizada por meio de testes manuais, verificando o cadastro de tarefas, listagem, alteração de status, exclusão, funcionamento do dashboard e consistência das informações armazenadas no banco de dados.

Os testes realizados foram documentados na pasta `docs`, permitindo demonstrar a validação das funcionalidades implementadas.

### Possibilidade de deploy

O projeto foi estruturado para execução local durante o desenvolvimento e pode ser futuramente publicado em um servidor web, permitindo o acesso por outros usuários pela internet.

A documentação de deploy apresenta uma proposta de publicação futura da aplicação, considerando a separação entre frontend, backend e banco de dados.

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

## Status do projeto

Versão inicial pronta para desenvolvimento e demonstração acadêmica.
