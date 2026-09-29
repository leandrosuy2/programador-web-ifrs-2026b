programa
{
    funcao inicio()
    {
        inteiro quantidade, concluidas, em_andamento, pendentes, indice, status
        real percentual

        escreva("Quantidade de tarefas: ")
        leia(quantidade)
        enquanto (quantidade < 0)
        {
            escreva("Use zero ou um inteiro positivo: ")
            leia(quantidade)
        }

        concluidas = 0
        em_andamento = 0
        pendentes = 0
        para (indice = 1; indice <= quantidade; indice++)
        {
            escreva("Tarefa ", indice, " (1 pendente, 2 em andamento, 3 concluida): ")
            leia(status)
            enquanto (status < 1 ou status > 3)
            {
                escreva("Status invalido. Informe 1, 2 ou 3: ")
                leia(status)
            }
            se (status == 1) { pendentes = pendentes + 1 }
            senao se (status == 2) { em_andamento = em_andamento + 1 }
            senao { concluidas = concluidas + 1 }
        }

        se (quantidade == 0) { percentual = 0 }
        senao { percentual = concluidas * 100.0 / quantidade }
        escreva("Pendentes: ", pendentes, " | Em andamento: ", em_andamento)
        escreva(" | Concluidas: ", concluidas, " | Progresso: ", percentual, "%\n")
    }
}