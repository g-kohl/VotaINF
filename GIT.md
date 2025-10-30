# Utilizando Git em um projeto colaborativo

## 🏁 1. Preparando o ambiente

Antes de tudo, verifique se você tem o **Git** configurado:

```bash
git --version
```

Configure seu ambiente Git

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```

---

## 🌿 2. Criando uma branch para uma nova funcionalidade

Trabalhar diretamente na `main` (ou `master`) **não é recomendado**.
Crie uma branch para cada funcionalidade ou correção:

```bash
git checkout main
git pull origin main
git checkout -b feat/nome-da-funcionalidade
```

> 💡 Use um nome descritivo, por exemplo:
> `feat/adicionar-login` ou `fix/corrigir-bug-no-cadastro`.

---

## 💾 3. Fazendo commits na sua branch

Durante o desenvolvimento, adicione e confirme suas alterações com mensagens claras:

```bash
git add .
git commit -m "feat: adiciona tela de login"
```

Siga o padrão **Conventional Commits** para facilitar o histórico:

* `feat:` → nova funcionalidade
* `fix:` → correção de bug
* `docs:` → documentação
* `refactor:` → refatoração de código
* `test:` → testes
* `chore:` → manutenção geral

Exemplo:

```bash
git commit -m "fix: corrige erro de validação no formulário de cadastro"
```

---

## 🔄 4. Fazendo rebase antes de enviar o código

Antes de enviar suas alterações para o GitHub, **atualize sua branch com a main** (isso evita conflitos e facilita o merge):

```bash
git fetch origin
git rebase origin/main
```

Se houver conflitos, o Git vai indicar quais arquivos precisam ser resolvidos.
Depois de resolver (ver passo sobre conflitos abaixo 👇):

```bash
git add .
git rebase --continue
```

---

## 🚀 5. Fazendo push da branch

Após o rebase estar limpo:

```bash
git push origin feat/nome-da-funcionalidade
```

Se for o **primeiro push** da branch, adicione o parâmetro `-u`:

```bash
git push -u origin feat/nome-da-funcionalidade
```

---

## 🧩 6. Criando e abrindo uma Pull Request (PR)

Vá até o repositório no **GitHub**, e você verá uma sugestão de abrir uma Pull Request para a branch recém enviada.

1. Clique em **Compare & pull request**
2. Preencha o título e descrição da PR:

   * O que a PR faz
   * Como testar
   * Screenshots ou contexto se necessário
3. Defina **revisores** (pessoas que devem avaliar seu código)
4. Escolha o destino do merge (geralmente `main`)

> 💡 **Dica:** Use um modelo de PR (template) com seções “O que foi feito”, “Como testar”, “Checklist”.

---

## 👀 7. Pedindo revisão da PR

No GitHub:

* Vá até a aba “Reviewers” da sua PR
* Selecione colegas responsáveis por revisar (por exemplo, 2 devs)
* Pode também marcar pessoas com `@` nos comentários, se quiser feedback direto.

---

## 🔍 8. Revisando PRs de outras pessoas

Para revisar o código de um colega:

### ✅ A. Clonar e testar localmente

Baixe a branch do autor:

```bash
git fetch origin nome-da-branch
git checkout nome-da-branch
```

Rode o projeto localmente, execute testes e confira se o comportamento é o esperado.

### 🗒️ B. Deixar comentários e sugestões

No GitHub:

* Vá até a aba **Files changed**
* Clique na linha desejada e adicione comentários ou sugestões diretas:

```suggestion
return response.status(400).json({ message: "Usuário não encontrado" });
```

### 🟢 C. Aprovar ou reprovar

Ao concluir a revisão, clique em **Review changes** e escolha:

* **Approve** → se estiver tudo certo
* **Request changes** → se precisar de ajustes
* **Comment** → se quiser apenas dar feedback

---

## 🔄 9. Fazendo merge da PR

Quando a PR estiver **aprovada** e os **checks (testes)** passarem:

1. Clique em **Merge pull request**
2. Escolha o tipo de merge:

   * **Squash and merge** → junta todos os commits em um só (recomendado)
   * **Rebase and merge** → mantém commits individuais, mas lineariza o histórico

Depois de fazer o merge:

```bash
git checkout main
git pull origin main
```

E **delete a branch** local e remota:

```bash
git branch -d feat/nome-da-funcionalidade
git push origin --delete feat/nome-da-funcionalidade
```

---

## ⚔️ 10. Resolvendo conflitos no VSCode

Se, durante o `rebase` ou o `merge`, houver conflitos, o VSCode mostrará algo assim:

```text
<<<<<<< HEAD
console.log("Versão da main");
=======
console.log("Versão da minha branch");
>>>>>>> feat/nova-feature
```

### Passos para resolver:

1. No VSCode, clique em:

   * **“Accept Current Change”** (mantém o que está na sua branch)
   * **“Accept Incoming Change”** (mantém o que veio da main)
   * **“Accept Both Changes”** (mantém ambos)
   * **“Compare Changes”** (ver diffs)
2. Após resolver todos os conflitos:

   ```bash
   git add .
   git rebase --continue
   ```
3. Teste novamente o código antes de continuar.

---

## 🧹 11. Boas práticas adicionais

* Faça commits pequenos e significativos.
* Sempre atualize sua branch antes de iniciar o dia de trabalho:

  ```bash
  git fetch origin
  git rebase origin/main
  ```
* Não suba código quebrado nem com `console.log` desnecessário.
* Nomeie PRs e commits com clareza e padrão.
* Mantenha o histórico limpo: use `rebase` em vez de `merge` localmente.

---

## 🧭 Resumo do fluxo ideal

```text
main ────► criar branch ────► commits ────► rebase ────► push ────► PR
                                                   │
                                               revisão
                                                   │
                                                merge ───► main
```

---

Quer que eu gere **um PDF ou guia visual ilustrado (com diagramas e comandos)** desse tutorial, para compartilhar com sua equipe? Posso formatar ele em formato de **manual interno** ou **guia de onboarding**.
