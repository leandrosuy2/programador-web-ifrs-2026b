# Especificação do DevTrack

## Escopo

Aplicação local de acompanhamento de projetos e tarefas, sem login, colaboração ou sincronização. A fonte de verdade do MVP é IndexedDB neste navegador.

## Requisitos funcionais

| ID | Requisito | Critério de aceitação |
|---|---|---|
| RF01 | Criar e editar projeto | Título obrigatório; descrição e prazo opcionais; prazo inválido recusado |
| RF02 | Criar e editar tarefa | Título obrigatório; projeto existente obrigatório |
| RF03 | Atualizar status | Aceitar os três estados e recalcular indicadores |
| RF04 | Filtrar tarefas | Combinar projeto, status e trecho do título |
| RF05 | Excluir registros | Pedir confirmação; projeto exclui suas tarefas dependentes |
| RF06 | Calcular progresso | Concluídas / total; zero tarefas resulta em 0% |
| RF07 | Persistir localmente | Registros sobrevivem ao recarregamento no mesmo navegador |
| RF08 | Exportar/importar JSON | Validar versão, conteúdo e vínculos antes de substituir dados |

## Requisitos não funcionais

| ID | Requisito | Critério |
|---|---|---|
| RNF01 | Acessibilidade | HTML semântico, rótulos, teclado, foco visível e mensagens anunciadas |
| RNF02 | Responsividade | Sem rolagem horizontal em 360, 768 e 1280 px |
| RNF03 | Segurança de conteúdo | Texto do usuário exibido sem interpretação como HTML |
| RNF04 | Integridade | IDs estáveis, vínculo de tarefa validado e importação validada antes de gravar |
| RNF05 | Limites claros | Sem conta, API remota ou backup automático entre dispositivos |

## Casos de uso

- UC01 Gerenciar projetos: criar, editar, consultar e excluir um projeto.
- UC02 Gerenciar tarefas: criar, editar, mudar status, filtrar e excluir tarefas.
- UC03 Transferir dados: exportar arquivo de backup ou importar arquivo validado.
- UC04 Acompanhar progresso: consultar contagens e percentual concluído.

## Rastreabilidade

| Requisito | Tela/área | Caso de uso | Verificação |
|---|---|---|---|
| RF01 | Projetos e diálogo de projeto | UC01 | Criar, editar e recusar título vazio/data inválida |
| RF02 | Formulário de tarefa | UC02 | Criar tarefa em projeto; bloquear sem título/projeto |
| RF03 | Tabela de tarefas | UC02, UC04 | Mudar status e atualizar progresso |
| RF04 | Barra de filtros | UC02 | Combinar projeto, estado e busca |
| RF05 | Ações de projeto/tarefa | UC01, UC02 | Confirmar exclusão e cascata |
| RF06 | Resumo do projeto | UC04 | 0 tarefas = 0%; 1 de 2 = 50% |
| RF07 | Aplicação | UC01, UC02 | Recarregar e manter registros |
| RF08 | Área de dados | UC03 | Exportar, importar e rejeitar arquivo malformado |
| RNF01 | Todas as telas | Todos | Navegação por teclado e foco visível |
| RNF02 | Todas as telas | Todos | Inspeção em 360, 768 e 1280 px |
| RNF03 | Título/descrição | UC01, UC02 | Texto com marcação aparece literalmente |
| RNF04 | Armazenamento | UC01, UC02, UC03 | Referências válidas após mutações e importação |
| RNF05 | README | UC03 | Explicar armazenamento local e limitações |

## Metodologia e qualidade

Entrega incremental por requisito verificável, com revisão manual e testes de funções puras. As decisões privilegiam uma aplicação pequena, executável sem backend e coerente com os conteúdos estudados; a separação por armazenamento, validação e métricas reduz acoplamento.