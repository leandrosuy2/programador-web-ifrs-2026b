# Módulo 5: Banco de Dados

**Projeto proposto:** Modelagem relacional do DevTrack  
**Status:** modelo e SQL inicial implementados; revisão didática pendente
**Materiais de referência:** 5.1–5.23

## Enunciado

Conceitos, usuários e SGBD; abstração; modelos hierárquico, rede, objeto e relacional; relacionamentos; atributos e chaves; integridade referencial; mapeamento; dependência funcional e normalização.

## Entregáveis

- Código próprio na pasta `src`.
- README com objetivo, instruções de execução e decisões tomadas.
- Evidências em `evidencias`: telas ou saída, testes e reflexão sobre dificuldades.
- Registro de horas reais e links dos commits em `docs/DESEMPENHO.md`.

## Critérios de aceitação

Desenhar DER; justificar cardinalidades; descrever 1FN, 2FN e 3FN; adicionar dicionário de dados. SQL executável é extensão prática proposta.

## Lista de verificação

- [x] Criar DER, cardinalidades, dicionário e justificativa de normalização em `src/modelo.md`.
- [x] Criar esquema SQL executável e dados de exemplo em `../../projeto-final/database/schema.sql`.
- [ ] Executar o SQL e validar restrições e integridade referencial.
- [x] Incluir matriz de verificação em `evidencias/VERIFICACAO.md`.
- [ ] Registrar horas e reflexão pessoal em `docs/DESEMPENHO.md`.

## Execução

Abra `src/modelo.md` para o DER e o dicionário. O arquivo SQL usa SQLite e pode ser executado com `sqlite3 devtrack.db < ../../projeto-final/database/schema.sql`.
