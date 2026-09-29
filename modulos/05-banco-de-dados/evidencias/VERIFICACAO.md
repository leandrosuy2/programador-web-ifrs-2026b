# Verificação do módulo Banco de Dados

| Caso | Resultado esperado | Estado |
|---|---|---|
| Criar tabela e inserir exemplos | Uma linha em projeto e uma tarefa | SQL executado em SQLite temporário |
| Inserir tarefa com projeto inexistente | Violação de chave estrangeira | Previsto; execução SQLite pendente |
| Inserir status fora do domínio | Violação de CHECK | Previsto; execução SQLite pendente |
| Excluir projeto com tarefa | Exclusão em cascata com FK habilitada | Previsto; execução SQLite pendente |
| Revisar normalização | Dependências até 3FN documentadas | Implementado; revisão acadêmica pendente |

## Evidências visuais

- [Modelo relacional](modelo-relacional.png): registra entidades, cardinalidade, dicionário e justificativa de normalização; facilita revisar a estrutura antes de evoluir o banco.
- [Esquema SQL](esquema-sql.png): registra tabelas, chaves, restrições e dados de exemplo; o SQL foi executado em SQLite temporário para confirmar sintaxe e criação.

Os testes específicos de FK, CHECK e cascata ainda precisam ser executados individualmente.