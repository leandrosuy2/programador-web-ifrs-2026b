# Testes de mesa: lógica

Valores esperados calculados manualmente. A execução no Portugol Studio ainda precisa ser registrada.

| Programa | Entrada | Resultado esperado |
|---|---|---|
| Orçamento | 10 h, R$ 50/h, 10% | R$ 450 |
| Orçamento, limite | 1 h, R$ 100/h, 100% | R$ 0 |
| Orçamento, inválida | 2 h, R$ 50/h, 101% | Mensagem de entrada inválida |
| Função `calcular_orcamento` | 10 h, R$ 50/h, 10% | Retorna 450; parâmetros determinam o resultado |
| Resumo de notas | 6, 8, 10, 4 | Média 7; maior 10; menor 4 |
| Estatísticas | 0 tarefas | Contagens 0; progresso 0% |
| Estatísticas | status 1, 2, 3 | Uma em cada estado; progresso 33,33% |
| Estatísticas, inválida | status 4 e depois 3 | Solicita novo status; conta uma concluída |
| Horas | 5 horas em cada dia por 3 semanas | 25 h por semana; 15 h por dia |
| Horas, limite | 0 h em todos os dias | Totais semanais e diários 0 |

## Evidências visuais

- [Código da calculadora de orçamento](algoritmo-orcamento.png): captura o arquivo Portugol versionado, incluindo função com parâmetros e validação. Foi registrada para mostrar a implementação entregue; não representa execução do programa.
- [Casos de mesa](casos-de-mesa.png): captura os cenários e resultados esperados para guiar a validação. Foi incluída para tornar explícito o que precisa ser conferido ao executar no Portugol Studio.

**Limite:** o Portugol Studio não está instalado neste ambiente. Os resultados são previsões calculadas manualmente e precisam ser executados e confirmados pelo estudante na ferramenta.