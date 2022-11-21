<p id="voltar">
<a href="#sobre">Sobre</a> |
<a href="#tecnologias">Tecnologias</a> |
<a href="#documentação">Documentação</a> |
<a href="#requisitos">Requisitos</a> |
<a href="#local">Rodando o projeto local</a> |
<a href="#desenvolvedor">Desenvolvedor</a>
</p>

<img width="350xp" src="https://user-images.githubusercontent.com/99001809/203137039-4e27fdfd-7fe7-4fcc-844c-927e78a1a1ec.png" />

<h1 id="sobre">💰 Projeto NG-Cash 💸</h1>

Uma API desenvolvida para o processo seletivo da [NG.CASH](https://ng.cash/). O **back-end** é uma API REST desenvolvida em [Node.JS](https://nodejs.org/en/) com [TypeScript](https://www.typescriptlang.org/) como linguagem principal, [Postgres](https://www.postgresql.org/) como banco de dados, [Prisma](https://www.prisma.io/) como ORM e [Jest](https://jestjs.io/pt-BR/) para os testes unitários da aplicação, atualmente se encontra rodando localmente com o uso do [Docker](https://docs.docker.com/). a API funciona como um sistema bancário comum, onde é possível visualizar seu saldo e realizar transferências, ver todas as transações de saída e entrada, filtrar por data também, tudo isso o mais automatizado possível. Também foi feita o uso de bibliotecas [BcryptJs](https://www.npmjs.com/package/bcryptjs) para o rasheio de senhas, o [JWT](https://jwt.io/introduction) para a criptografia dos tokens, e [Uuid](https://www.npmjs.com/package/uuid) para a geração de IDs.

<h2 id="tecnologias">🛠 Tecnologias ⬇️</h2>

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/docs/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/pt-BR/docs/api)
- [Docker](https://docs.docker.com/)

<h2 id="documentação">📃 Documentação da API no Postman</h2>

- [Postman](https://documenter.getpostman.com/view/20351432/2s8YmUKyvL)

<h2 id="requisitos">Requisito atendidos ✔</h2>

- ✅ Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando username e password.
- ✅ Deve-se garantir que cada username seja único e composto por, pelo menos, 3 caracteres.
- ✅ Deve-se garantir que a password seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser hasheada ao ser armazenada no banco.
- ✅ Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela Accounts com um balance de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado,  a tabela Accounts não deverá ser afetada.
- ✅ Todo usuário deverá conseguir logar na aplicação informando username e password. Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
- ✅ Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio balance atual. Um usuário A não pode visualizar o balance de um usuário B, por exemplo.
- ✅ Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um cash-out informando o username do usuário que sofrerá o cash-in), caso apresente balance suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
- ✅ Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions. Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada.
- ✅ Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
- ✅ Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
    - Data de realização da transação e/ou
    - Transações de *cash-out;*
    - Transações de *cash-in.*


<h2 id="local"> 💻 Rodando o projeto na sua máquina</h2>

### Pré-Requisito
- Possuir [Docker](https://docs.docker.com/) instalado na sua máquina 
### Como instalar e rodar
* Para baixar o projeto, execute os seguintes comandos no seu terminal:
```
git clone https://github.com/efss7/seletivo-ng-cash.git
```
* Para instalar e rodar o server (obrigatório)

```
cd seletivo-ng-cash
docker compose up
```
* Para rodar os testes unitários (opcional)
```
npm run test
```
<h2 id="desenvolvedor">👨‍💻 Desenvolvedor</h2>


<table>
<td><a href="https://github.com/efss7"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/99001809?v=4" width="100px;" alt="Imagem profile Eric Silva desenvolvedor"/><br /><sub><b>Eric Silva </b></sub></a><br />
</table>

<a href="#voltar">Voltar para o topo ⬆️</a>
