# DevTrack — projeto final

## Problema e objetivo

Reunir projetos pessoais e tarefas em uma interface que mostre prazos, status e progresso. Demonstrar os conhecimentos dos seis módulos por meio de uma aplicação executável e documentação coerente.

## MVP

| ID | Requisito | Critério de aceitação |
|---|---|---|
| RF01 | Cadastrar e editar projeto | Exigir título; permitir descrição e prazo; recusar prazo inválido. |
| RF02 | Cadastrar e editar tarefa | Exigir título e vínculo com projeto existente. |
| RF03 | Atualizar status | Aceitar pendente, em andamento e concluída; atualizar os indicadores. |
| RF04 | Filtrar tarefas | Combinar projeto, status e busca por título. |
| RF05 | Excluir registros | Pedir confirmação; explicar que excluir projeto também exclui suas tarefas. |
| RF06 | Calcular progresso | Concluídas / total × 100; projeto sem tarefas apresenta 0%. |
| RF07 | Persistir dados localmente | Recarregar a página preserva projetos e tarefas neste navegador. |
| RF08 | Exportar e importar JSON | Exportar versão e dados; validar formato e referências antes de importar. |

## Requisitos de qualidade

- HTML semântico, labels e navegação por teclado.
- Layout sem rolagem horizontal em celular e desktop.
- Mensagens de validação claras e estados vazios explicativos.
- Texto fornecido pelo usuário renderizado como texto, sem interpretação de HTML.
- Funções de cálculo e validação independentes da renderização.
- IDs estáveis; dados importados verificados antes de substituir os atuais.
- Sem login, colaboração ou sincronização de dispositivos no MVP local.

## Telas

1. Visão geral: quantidade de projetos, tarefas e percentual concluído.
2. Lista de projetos: busca, novo projeto, edição e acesso às tarefas.
3. Detalhe do projeto: tarefas, filtros e resumo de progresso.
4. Formulário de tarefa: título, descrição, prioridade, prazo e status.
5. Dados: exportação, importação e explicação sobre armazenamento local.

## Arquitetura proposta

`src/index.html`, `src/css/styles.css`, `src/js/app.js`, `src/js/storage.js`, `src/js/validation.js`, `src/js/metrics.js`.

HTML + CSS + JavaScript puro. Persistência com IndexedDB. A especificação SQL em `database` é um exercício separado: o navegador não se conecta diretamente a um servidor de banco de dados. Um backend e autenticação poderão ser acrescentados em uma etapa posterior.

## Dados e UML

- Projeto: id, título, descrição, prazo, criado_em.
- Tarefa: id, projeto_id, título, descrição, prioridade, prazo, status, criado_em.
- Relacionamento: um projeto possui zero ou muitas tarefas; uma tarefa pertence a exatamente um projeto.
- Entregar DER, dicionário, dependências funcionais e justificativa da normalização.
- Entregar casos de uso, classes e atividade do cadastro de uma tarefa.

## Demonstração e conclusão

- [ ] Criar um projeto e duas tarefas.
- [ ] Concluir uma tarefa e demonstrar progresso de 50%.
- [ ] Recarregar a página e demonstrar persistência.
- [ ] Demonstrar validação e estado vazio.
- [ ] Demonstrar exportação e importação de JSON.
- [ ] Verificar exclusão de projeto e integridade das tarefas.
- [ ] Revisar teclado, layout, textos e referências.
- [ ] Entregar README, capturas, demonstração curta e limitações.

## Execução

Abra um terminal na raiz do repositório e inicie um servidor estático, por exemplo `python3 -m http.server 8000`. Acesse `http://localhost:8000/projeto-final/src/`. O navegador deve oferecer IndexedDB e suporte a módulos ES.

Os dados são locais a este navegador. Exporte regularmente um JSON para backup; importar substitui os dados atuais após validar o arquivo e pedir confirmação. Não há sincronização entre dispositivos nem backend.

## Verificações

Execute os testes das funções independentes com `node --test projeto-final/tests/core.test.mjs`. A matriz de fluxos manuais, incluindo persistência, layout e importação/exportação, está em `evidencias/VERIFICACAO.md`.

**Status:** MVP implementado; testes automatizados de lógica disponíveis e verificação manual de interface pendente.
