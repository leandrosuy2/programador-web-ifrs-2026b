PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS projeto (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL CHECK (length(trim(titulo)) > 0),
    descricao TEXT NOT NULL DEFAULT '',
    prazo TEXT,
    criado_em TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tarefa (
    id TEXT PRIMARY KEY,
    projeto_id TEXT NOT NULL,
    titulo TEXT NOT NULL CHECK (length(trim(titulo)) > 0),
    descricao TEXT NOT NULL DEFAULT '',
    prioridade TEXT NOT NULL DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta')),
    prazo TEXT,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em andamento', 'concluida')),
    criado_em TEXT NOT NULL,
    FOREIGN KEY (projeto_id) REFERENCES projeto(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tarefa_projeto_status ON tarefa (projeto_id, status);

INSERT INTO projeto (id, titulo, descricao, prazo, criado_em)
VALUES ('exemplo-projeto', 'Revisar portfólio', 'Organizar entregas do curso', NULL, '2026-09-29T12:00:00Z');

INSERT INTO tarefa (id, projeto_id, titulo, prioridade, status, criado_em)
VALUES ('exemplo-tarefa', 'exemplo-projeto', 'Revisar navegação', 'alta', 'pendente', '2026-09-29T12:05:00Z');