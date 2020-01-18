[![Generic badge](https://img.shields.io/badge/node-12.X-lemon.svg)](https://nodejs.org/en/) &nbsp;&nbsp; [![Generic badge](https://img.shields.io/badge/npm%20-^6.13.6-green.svg)](https://nodejs.org/en/)

## Backend da aplicação _DevRadar_

### Antes de iniciar:

#### Banco de dados MongoDB

É necessário ter um banco de dados `MongoDB` sendo ele local ou através do serviço [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) criando gratuitamente um banco de dados na nuvem com até 500GB de capacidade.

#### Editando arquivo `.env`

Acessa a raiz da pasta `backend` e cria um arquivo `.env`.
Copie o conteúdo do arquivo `.env.example` para seu arquivo `.env` e edite conforme suas informações:

O arquivo `.env.example` é como no trecho abaixo:

```js
BASE_URL=http://localhost:3333
MONGODB_CONNECTION_STRING=mongodb_conection_string
```

#### Instalando dependências

Acesse a raiz do projeto e instale as dependências pelo _terminal_ usando o comando `yarn`, caso tenha o mesmo instalado ou `npm install` se não tiver o `yarn`;

### Subindo a aplicação

Acesse a raiz da backend e, pelo _terminal_, digite o comando `yarn dev`, caso tenha `yarn` instalado ou `npm run dev`.
