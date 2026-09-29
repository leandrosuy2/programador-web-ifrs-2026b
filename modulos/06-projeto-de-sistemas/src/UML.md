# UML do DevTrack

## Casos de uso

```mermaid
flowchart LR
    pessoa[Estudante]
    uc1((Gerenciar projetos))
    uc2((Gerenciar tarefas))
    uc3((Acompanhar progresso))
    uc4((Importar e exportar dados))
    pessoa --- uc1
    pessoa --- uc2
    pessoa --- uc3
    pessoa --- uc4
```

## Classes conceituais

```mermaid
classDiagram
    class Projeto {
      +String id
      +String titulo
      +String descricao
      +Date prazo
      +Date criadoEm
    }
    class Tarefa {
      +String id
      +String projetoId
      +String titulo
      +String descricao
      +String prioridade
      +Date prazo
      +Status status
    }
    class Status {
      <<enumeration>>
      pendente
      emAndamento
      concluida
    }
    Projeto "1" *-- "0..*" Tarefa : organiza
    Tarefa --> Status
```

## Atividade: cadastrar tarefa

```mermaid
flowchart TD
    inicio([Início]) --> abrir[Estudante abre formulário]
    abrir --> preencher[Informa título, projeto e detalhes]
    preencher --> validar{Título e projeto válidos?}
    validar -- Não --> erro[Exibe mensagem de validação]
    erro --> preencher
    validar -- Sim --> salvar[Persiste tarefa no IndexedDB]
    salvar --> atualizar[Atualiza lista e indicadores]
    atualizar --> fim([Fim])
```

## Ligação com a implementação

`Projeto` e `Tarefa` são registros persistidos em stores separados, relacionados por `projetoId`. O diagrama descreve o domínio; a implementação divide acesso a dados, validação e renderização em módulos JavaScript.