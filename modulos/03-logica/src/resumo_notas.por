programa
{
    funcao inicio()
    {
        real notas[4], soma, media, maior, menor
        inteiro indice

        soma = 0
        para (indice = 0; indice < 4; indice++)
        {
            escreva("Nota ", indice + 1, " (0 a 10): ")
            leia(notas[indice])
            enquanto (notas[indice] < 0 ou notas[indice] > 10)
            {
                escreva("Nota invalida. Informe um valor entre 0 e 10: ")
                leia(notas[indice])
            }
            soma = soma + notas[indice]
        }

        maior = notas[0]
        menor = notas[0]
        para (indice = 1; indice < 4; indice++)
        {
            se (notas[indice] > maior) { maior = notas[indice] }
            se (notas[indice] < menor) { menor = notas[indice] }
        }
        media = soma / 4
        escreva("Media: ", media, " | Maior: ", maior, " | Menor: ", menor, "\n")
    }
}