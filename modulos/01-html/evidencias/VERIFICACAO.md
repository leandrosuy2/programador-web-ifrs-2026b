# Verificação do módulo HTML

## Casos previstos

| Caso | Resultado esperado | Estado |
|---|---|---|
| Abrir `src/index.html` | Conteúdo, tabela e navegação visíveis | Verificado no navegador |
| Navegar entre páginas | Links relativos abrem Sobre e Contato | Verificado no navegador |
| Percorrer com Tab e Shift+Tab | Foco segue ordem do documento e permanece visível | Teste manual pendente |
| Informar e-mail malformado | Navegador rejeita o valor | Verificado no navegador |
| Carregar áudio e vídeo | Controles nativos permitem reprodução | Verificação pendente; mídia é externa e a miniatura foi bloqueada |

Validação formal com serviço HTML ainda pendente.

## Evidências visuais

- [Portal inicial](portal-inicial.png): registra a estrutura semântica, navegação, tabela e conteúdo implementado. A captura ajuda a revisar a hierarquia da página e comprova a primeira versão no navegador.
- [Formulário de contato](formulario-contato.png): registra rótulos, agrupamento e campos nativos. Foi capturado para documentar a entrega de formulários e apoiar a revisão de acessibilidade.

As capturas não comprovam execução das mídias externas; essa verificação segue pendente.