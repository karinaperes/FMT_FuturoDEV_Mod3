# API Escola
		
### Projeto para prática dos exercícios do curso FuturoDEV FMT
		
Api desenvolvida com node.js, JWT, bcrypt, express, sequelize e postgresql.
O projeto tem como objetivo administrar cadastros de uma escola.
Utilizamos o CRUD para, criar, consultar, alterar e excluir os cadastros, 
no banco de dados postgresql e o JWT para autenticação das rotas privadas,
aplicado como middleware.
Além disso, criamos os arquivos controllers para as routes, modularizando 
as partes, para melhor compreensão e facilitando a manutenção do código.
		

		📦 Será necessário instalar:
		Node.js (https://nodejs.org)
		PostgrSQL (https://www.postgresql.org)		

		🐑🐑 Clone o repositório		

		🔧 Instale as dependências pelo terminal
		npm install		

		🗃️ Crie o banco de dados no PostgSQL, exemplo: db_escola		

		📝🔗 Preencha as informações do arquivo .env conforme dados locais		

		📤 No terminal faça a migração das tabelas
		sequelize db:migrate		

		🔌Rodar o servidor
		node index.js		

		Agradeço aos professores,
		👨🏻‍🏫 douglas-cavalcante,
		👨🏻‍🏫 Hawangledt
		e ao Floripa Mais Tec
