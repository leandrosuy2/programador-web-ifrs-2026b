# Verificação do módulo JavaScript

| Caso | Resultado esperado | Estado |
|---|---|---|
| Notas `7, 8, 9` | Média 8,00 | Verificado no navegador |
| Nota `11`, só espaços ou item vazio | Mensagem de validação | Verificado no navegador |
| Peso 70 kg e altura 1,75 m | IMC aproximado 22,9 | Verificado no navegador |
| Transformar `olá mundo` | Resultado `OLÁ MUNDO` | Verificado no navegador |
| Contar palavras, confirmar, entrada e mouse | Saída ou mensagem correspondente | Teste manual pendente |

`calculateAverage` e `calculateBmi` permanecem isoladas da renderização para facilitar testes adicionais.

## Evidência visual

- [Laboratório com resultados](laboratorio-resultados.png): mostra a média 8,00, o IMC 22,9 e o texto transformado. A captura foi feita após executar os controles para registrar comportamento, não apenas o layout.