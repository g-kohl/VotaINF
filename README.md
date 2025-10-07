# VotaINF

Sistema de gerenciamento de votações do colegiado do Departamento de Informática Aplicada do INF-UFRGS

Stack:
- Front-end: Angular (Typescript, modo standalone)
- Back-end: NestJS
- Banco de dados: ainda não configurado

# Frameworks necessários

## Versão do Node.js

A versão do Node.js necessária para o NestJS é 20+.
Confira com:

```
node -v
```

## Angular e NestJS

Certifique-se que tenha instalado o npm antes de prosseguir.
Instale o Angular Client:

```
npm install -g @angular/cli
```

Instale o NestJS client:

```
npm install -g @nestjs/cli
```

# Rodar o projeto

## Repositório

Clone o repositório:

```
git clone https://github.com/g-kohl/VotaINF.git
cd VotaINF
```

## Dependências

Para instalar as dependências do back-end, rode:

```
cd backend
npm install
```

E para o front-end:

```
cd ../frontend
npm install
```

## Executar

Para rodar o back-end, vá até o diretório correspondente e rode:

```
npm run start
```

O servidor rodará em: `http://localhost:3000/`.

Para rodar o front-end, vá até o diretório correspondente e rode:

```
ng serve
```

O site rodará em: `http://localhost:4200/`.