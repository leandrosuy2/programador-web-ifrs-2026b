# Verificação do DevTrack

## Testes automatizados

Execute `node --test projeto-final/tests/core.test.mjs` para validar títulos e datas, vínculos de tarefas, progresso e importação JSON.

## Fluxos manuais

| Fluxo | Resultado esperado | Estado |
|---|---|---|
| Criar projeto e duas tarefas; concluir uma | Indicador do projeto em 50% | Verificado no navegador: 2 tarefas, 1 concluída, 50% |
| Recarregar a página | Projetos, tarefas e status preservados em IndexedDB | Verificado no navegador: registros e 50% mantidos |
| Salvar título ou prazo inválido | Mensagem clara; registro não é salvo | Teste de navegador pendente |
| Filtrar por projeto, status e título | Filtros podem ser combinados | Verificados individualmente no navegador |
| Exportar e importar JSON válido | Dados são restaurados após confirmação | Teste de navegador pendente |
| Importar JSON malformado ou com vínculo inválido | Arquivo recusado sem substituir dados atuais | Teste de navegador pendente |
| Excluir projeto com tarefas | Confirmação explica cascata; registros são removidos | Teste de navegador pendente |
| Usar teclado e viewport 360/768/1280 px | Foco visível e layout sem rolagem horizontal | Viewports verificados sem overflow; foco por teclado pendente |

Os fluxos que ainda aparecem como pendentes precisam de execução e registro próprios; as capturas abaixo cobrem somente os estados indicados.

## Evidências visuais

- [Painel inicial vazio](devtrack-dashboard.png): registra o estado vazio e os controles antes do uso; ajuda a revisar a primeira experiência.
- [Fluxo com 50% de progresso](devtrack-fluxo-50-por-cento.png): captura um projeto de demonstração, duas tarefas e uma concluída. Foi feita após executar o fluxo no navegador para documentar o critério de progresso; os dados de demonstração foram removidos ao terminar.