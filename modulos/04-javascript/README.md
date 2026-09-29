# Módulo 4: JavaScript

**Projeto proposto:** Painel de produtividade no navegador  
**Status:** primeira versão implementada; testes no navegador pendentes
**Materiais de referência:** 4.1–4.23.4

## Enunciado

Operações e médias; confirmação; repetição; eventos de carregamento, clique, entrada e mouse; validação de formulário; calculadora de IMC; transformação de texto; estudo de bibliotecas.

## Entregáveis

- Código próprio na pasta `src`.
- README com objetivo, instruções de execução e decisões tomadas.
- Evidências em `evidencias`: telas ou saída, testes e reflexão sobre dificuldades.
- Registro de horas reais e links dos commits em `docs/DESEMPENHO.md`.

## Critérios de aceitação

Separar funções da interface; verificar formulário inválido, cálculo e renderização; documentar uma biblioteca estudada.

## Lista de verificação

- [x] Implementar cálculos, validação e eventos em `src`.
- [ ] Testar formulários válidos/inválidos e eventos no navegador.
- [ ] Corrigir problemas encontrados nos testes.
- [x] Incluir instruções e casos previstos em `evidencias/VERIFICACAO.md`.
- [ ] Registrar horas e reflexão pessoal em `docs/DESEMPENHO.md`.

## Execução

Sirva `src` em um servidor HTTP local e abra `index.html`. O script usa módulos ES nativos, `FormData` e APIs do navegador; não requer dependências.

## Decisões

As funções de cálculo são independentes da apresentação. O laboratório usa Chart.js como estudo de comparação, mas mantém a implementação sem biblioteca por não precisar de gráficos.
