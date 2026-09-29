# Publicar no GitHub

O remoto `origin` está configurado para `https://github.com/leandrosuy2/programador-web-ifrs-2026b.git`. Na última consulta, ele não apresentou refs; confirme no GitHub se o repositório existe e está vazio antes do primeiro envio.

As mudanças desta preparação estão no diretório de trabalho, ainda sem commit e sem push. Revise os arquivos, confira a autoria das alterações e registre horas/reflexões pessoais somente com dados reais. Não é necessário executar `git init` nem adicionar outro remoto.

```bash
git status
git diff --check
node --test projeto-final/tests/core.test.mjs
git add README.md docs modulos projeto-final
git diff --cached
git commit -m "feat: implementar projetos dos modulos e DevTrack"
git push -u origin main
```

Se o repositório já contiver commits diferentes no GitHub, sincronize e revise o histórico antes de enviar; não use `--force` para substituir o conteúdo remoto. O endereço remoto está em HTTPS e o GitHub poderá pedir autenticação no terminal.
