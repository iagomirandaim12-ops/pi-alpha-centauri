# DER Conceitual

## Entidades

### Seção
Representa uma seção do grupo escoteiro.

Atributos:
- id_secao
- nome_secao

### Adulto
Representa um adulto voluntário.

Atributos:
- id_adulto
- nome
- email
- telefone
- tipo_funcao
- id_secao

### Tarefa
Representa uma tarefa cadastrada no sistema.

Atributos:
- id_tarefa
- titulo
- descricao
- prazo
- prioridade
- status
- tipo_tarefa
- id_responsavel
- id_secao
- data_criacao

### Dependência de Tarefa
Representa a relação entre uma tarefa e outra tarefa predecessora.

Atributos:
- id_dependencia
- id_tarefa
- id_tarefa_dependente

### Histórico de Status
Registra as mudanças de status das tarefas.

Atributos:
- id_historico
- id_tarefa
- status_anterior
- status_novo
- data_alteracao
- observacao

## Relacionamentos

- Uma seção possui muitos adultos.
- Uma seção possui muitas tarefas.
- Um adulto pode ser responsável por muitas tarefas.
- Uma tarefa pode ter muitos registros de histórico.
- Uma tarefa pode depender de outras tarefas.
