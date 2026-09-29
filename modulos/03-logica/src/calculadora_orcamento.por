programa
{
    funcao real calcular_orcamento(real horas, real valor_hora, real desconto)
    {
        retorne horas * valor_hora * (1 - desconto / 100)
    }

    funcao inicio()
    {
        real horas, valor_hora, desconto, total

        escreva("Horas estimadas: ")
        leia(horas)
        escreva("Valor por hora: R$ ")
        leia(valor_hora)
        escreva("Desconto percentual (0 a 100): ")
        leia(desconto)

        se (horas <= 0 ou valor_hora <= 0 ou desconto < 0 ou desconto > 100)
        {
            escreva("Entrada invalida. Use horas e valor positivos e desconto entre 0 e 100.\n")
        }
        senao
        {
            total = calcular_orcamento(horas, valor_hora, desconto)
            escreva("Orcamento: R$ ", total, "\n")
        }
    }
}