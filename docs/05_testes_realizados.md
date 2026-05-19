# Testes realizados

Este documento apresenta os testes manuais realizados no sistema PI Alpha Centauri, com o objetivo de validar as principais funcionalidades da aplicação web.

## Objetivo dos testes

Verificar se o sistema permite o gerenciamento e acompanhamento das tarefas dos adultos voluntários do Grupo Escoteiro Alpha Centauri, garantindo que as informações sejam cadastradas, exibidas, atualizadas e removidas corretamente.

## Ambiente de teste

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de dados: SQLite
- Navegador utilizado: Google Chrome ou Microsoft Edge
- Execução: ambiente local de desenvolvimento

## Teste 1 — Inicialização do backend

**Procedimento:**

1. Acessar a pasta `backend`.
2. Executar o comando `npm install`, caso as dependências ainda não estejam instaladas.
3. Executar o comando `npm run dev` ou `npm start`.

**Resultado esperado:**

O servidor deve iniciar corretamente e disponibilizar as rotas da API.

**Status:** Aprovado.

---

## Teste 2 — Inicialização do frontend

**Procedimento:**

1. Acessar a pasta `frontend`.
2. Executar o comando `npm install`, caso as dependências ainda não estejam instaladas.
3. Executar o comando `npm run dev`.
4. Abrir o endereço indicado pelo Vite no navegador.

**Resultado esperado:**

A interface do sistema deve ser carregada corretamente no navegador.

**Status:** Aprovado.

---

## Teste 3 — Listagem de tarefas

**Procedimento:**

1. Abrir a tela principal do sistema.
2. Verificar se as tarefas cadastradas aparecem na listagem.

**Resultado esperado:**

O sistema deve exibir as tarefas existentes, apresentando informações como título, responsável, seção, prazo, prioridade e status.

**Status:** Aprovado.

---

## Teste 4 — Cadastro de tarefa

**Procedimento:**

1. Preencher o formulário de cadastro de tarefa.
2. Informar título, descrição, responsável, seção, prazo, prioridade e tipo.
3. Clicar no botão de cadastro.

**Resultado esperado:**

A nova tarefa deve ser cadastrada no banco de dados e exibida na listagem de tarefas.

**Status:** Aprovado.

---

## Teste 5 — Validação dos campos obrigatórios

**Procedimento:**

1. Tentar cadastrar uma tarefa sem preencher todos os campos obrigatórios.
2. Observar o comportamento do sistema.

**Resultado esperado:**

O sistema deve impedir o cadastro incompleto ou retornar uma mensagem de erro adequada.

**Status:** Aprovado.

---

## Teste 6 — Alteração de status da tarefa

**Procedimento:**

1. Selecionar uma tarefa existente.
2. Alterar seu status, por exemplo, de "pendente" para "em andamento" ou "concluída".

**Resultado esperado:**

O status da tarefa deve ser atualizado corretamente, e a alteração deve ser registrada no histórico de status.

**Status:** Aprovado.

---

## Teste 7 — Exclusão de tarefa

**Procedimento:**

1. Selecionar uma tarefa cadastrada.
2. Acionar a opção de exclusão.
3. Confirmar a remoção.

**Resultado esperado:**

A tarefa deve ser removida da listagem e excluída do banco de dados.

**Status:** Aprovado.

---

## Teste 8 — Dashboard de acompanhamento

**Procedimento:**

1. Acessar a área de dashboard do sistema.
2. Verificar os indicadores apresentados.

**Resultado esperado:**

O dashboard deve apresentar informações resumidas sobre as tarefas, como quantidade por status e próximas tarefas pendentes ou em andamento.

**Status:** Aprovado.

---

## Teste 9 — Integração entre frontend e backend

**Procedimento:**

1. Realizar operações no frontend.
2. Verificar se as informações são enviadas corretamente para o backend.
3. Confirmar se os dados são persistidos no banco de dados.

**Resultado esperado:**

As ações realizadas na interface devem refletir corretamente nas rotas da API e no banco de dados.

**Status:** Aprovado.

---

## Teste 10 — Consistência dos dados

**Procedimento:**

1. Cadastrar tarefas vinculadas a responsáveis e seções existentes.
2. Verificar se os dados aparecem corretamente na listagem.

**Resultado esperado:**

As tarefas devem ser exibidas com o nome do responsável e da seção correspondente, demonstrando o relacionamento entre as tabelas.

**Status:** Aprovado.

---

## Conclusão dos testes

Os testes manuais demonstraram que o sistema atende às principais funcionalidades previstas para o Projeto Integrador, permitindo o cadastro, acompanhamento, atualização e exclusão de tarefas.

A aplicação apresenta integração entre frontend, backend e banco de dados, demonstrando os conceitos de aplicação web, arquitetura cliente-servidor, banco de dados relacional, SQL e operações CRUD.
