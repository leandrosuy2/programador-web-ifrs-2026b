programa
{
    funcao inicio()
    {
        real horas[3][5], total_semana, total_dia
        inteiro semana, dia

        para (semana = 0; semana < 3; semana++)
        {
            total_semana = 0
            escreva("Semana ", semana + 1, "\n")
            para (dia = 0; dia < 5; dia++)
            {
                escreva("Horas no dia ", dia + 1, " (0 a 24): ")
                leia(horas[semana][dia])
                enquanto (horas[semana][dia] < 0 ou horas[semana][dia] > 24)
                {
                    escreva("Valor invalido. Informe de 0 a 24: ")
                    leia(horas[semana][dia])
                }
                total_semana = total_semana + horas[semana][dia]
            }
            escreva("Total da semana: ", total_semana, " horas\n")
        }

        escreva("Totais por dia nas tres semanas:\n")
        para (dia = 0; dia < 5; dia++)
        {
            total_dia = 0
            para (semana = 0; semana < 3; semana++)
            {
                total_dia = total_dia + horas[semana][dia]
            }
            escreva("Dia ", dia + 1, ": ", total_dia, " horas\n")
        }
    }
}