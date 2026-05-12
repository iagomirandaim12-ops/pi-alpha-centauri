# Regras de Negócio

## RN01 — Cadastro de tarefas
Toda tarefa deve conter título, prazo, prioridade, status, responsável e seção.

## RN02 — Status permitidos
Os status permitidos são:

- Pendente
- Em andamento
- Impedida
- Concluída

## RN03 — Prioridades permitidas
As prioridades permitidas são:

- Baixa
- Média
- Alta
- Crítica

## RN04 — Dependência entre tarefas
Uma tarefa pode depender da conclusão de outra.

Exemplo:

A tarefa "Organizar cozinha do acampamento" depende da tarefa "Comprar alimentos do acampamento".

## RN05 — Tarefa impedida
Caso uma tarefa predecessora não esteja concluída, a tarefa dependente pode ser marcada como "Impedida".

## RN06 — Histórico
Toda alteração de status deve gerar registro no histórico.

## RN07 — Rastreabilidade
O sistema deve permitir saber:

- quem recebeu a tarefa;
- quando foi criada;
- qual o prazo;
- qual o status atual;
- quais alterações ocorreram;
- quais tarefas estão impedidas.
