PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS historico_status;
DROP TABLE IF EXISTS dependencia_tarefa;
DROP TABLE IF EXISTS tarefa;
DROP TABLE IF EXISTS adulto;
DROP TABLE IF EXISTS secao;

CREATE TABLE secao (
    id_secao INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_secao VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE adulto (
    id_adulto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefone VARCHAR(20),
    tipo_funcao VARCHAR(50) NOT NULL,
    id_secao INTEGER,
    FOREIGN KEY (id_secao) REFERENCES secao(id_secao)
);

CREATE TABLE tarefa (
    id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    prazo DATE NOT NULL,
    prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('Baixa', 'Média', 'Alta', 'Crítica')),
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente'
        CHECK (status IN ('Pendente', 'Em andamento', 'Impedida', 'Concluída')),
    tipo_tarefa VARCHAR(30) NOT NULL DEFAULT 'Pontual'
        CHECK (tipo_tarefa IN ('Pontual', 'Recorrente', 'Emergencial')),
    id_responsavel INTEGER NOT NULL,
    id_secao INTEGER NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_responsavel) REFERENCES adulto(id_adulto),
    FOREIGN KEY (id_secao) REFERENCES secao(id_secao)
);

CREATE TABLE dependencia_tarefa (
    id_dependencia INTEGER PRIMARY KEY AUTOINCREMENT,
    id_tarefa INTEGER NOT NULL,
    id_tarefa_dependente INTEGER NOT NULL,
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id_tarefa),
    FOREIGN KEY (id_tarefa_dependente) REFERENCES tarefa(id_tarefa),
    UNIQUE (id_tarefa, id_tarefa_dependente),
    CHECK (id_tarefa <> id_tarefa_dependente)
);

CREATE TABLE historico_status (
    id_historico INTEGER PRIMARY KEY AUTOINCREMENT,
    id_tarefa INTEGER NOT NULL,
    status_anterior VARCHAR(30),
    status_novo VARCHAR(30) NOT NULL,
    data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id_tarefa)
);
