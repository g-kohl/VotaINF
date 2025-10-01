# VotaINF
Sistema de gerenciamento de votações do colegiado do Departamento de Informática Aplicada do INF-UFRGS

# Instalação do projeto

## Versão do Java

Certifique-se que a versão do Java no seu sistema é a 17:

```
java --version
```

## Live Server

Por enquanto ainda não está sendo usado nenhum framework para front-end.
Então, para rodar a interface do site num servidor simples de teste, instale a extensão do Live Server no VS Code.
Após, clique com o botão direito no arquivo [`src/index.html`](./frontend/index.html) e selecione "Open with Live Server".

O front-end ficará disponível em algo como: `http://127.0.0.1:5500/frontend/index.html`

## Rodar o back-end

Entre na pasta [`backend`](./backend/) e execute o Spring Boot.

No Linux:
```
./mvnw spring-boot:run
```

No Windows:
```
mvnw spring-boot:run
```

O back-end ficará disponível em: `http://localhost:8080`

# Testar integração

Na página do front-end, clique em "Testar API".
Se tudo estiver certo, aparecerá uma mensagem dizendo "Olá do Back-end com Spring Boot!".