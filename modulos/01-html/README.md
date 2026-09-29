# Módulo 1: HTML

**Projeto proposto:** Portal pessoal em HTML  
**Status:** implementação e navegação básica verificadas; validação estrutural e de mídias pendente
**Materiais de referência:** 1.1–1.29

## Enunciado

Estrutura semântica; páginas inicial, sobre e contato; links e listas; imagens com texto alternativo; áudio e vídeo com controles; tabela com cabeçalhos; formulário com labels, agrupamento e seleção.

## Entregáveis

- Código próprio na pasta `src`.
- README com objetivo, instruções de execução e decisões tomadas.
- Evidências em `evidencias`: telas ou saída, testes e reflexão sobre dificuldades.
- Registro de horas reais e links dos commits em `docs/DESEMPENHO.md`.

## Critérios de aceitação

Validar HTML; navegar por teclado; conferir links relativos e mídias.

## Lista de verificação

- [x] Implementar primeira versão em `src`.
- [x] Abrir as páginas e verificar os links relativos e a validação nativa do e-mail.
- [ ] Validar HTML e testar navegação por teclado.
- [ ] Corrigir os problemas encontrados na validação.
- [x] Incluir instruções e uma matriz inicial de testes em `evidencias/VERIFICACAO.md`.
- [ ] Registrar horas, reflexão pessoal e revisão final em `docs/DESEMPENHO.md`.

## Execução

Abra `src/index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático. As mídias de demonstração usam arquivos públicos externos; a miniatura de vídeo foi bloqueada no ambiente de teste e precisa de uma fonte alternativa ou verificação em outra rede.

## Decisões

As páginas usam landmarks, títulos hierárquicos, links relativos, texto alternativo, tabela com cabeçalhos, controles nativos e formulário agrupado com rótulos explícitos. O formulário é apenas demonstrativo e não transmite dados.
