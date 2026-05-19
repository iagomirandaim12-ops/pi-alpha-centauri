# Deploy e publicação da aplicação

Este documento apresenta uma proposta de publicação futura da aplicação PI Alpha Centauri em um servidor web, permitindo que o sistema seja acessado pela internet.

## Situação atual

Durante o desenvolvimento do Projeto Integrador, a aplicação foi executada em ambiente local, com o frontend, o backend e o banco de dados funcionando no computador dos desenvolvedores.

Essa abordagem foi adequada para a etapa de prototipação, testes e validação das funcionalidades principais do sistema.

## Estrutura da aplicação

O projeto está organizado em três partes principais:

- Frontend: interface desenvolvida com React e Vite.
- Backend: API desenvolvida com Node.js e Express.
- Banco de dados: SQLite, utilizado para armazenar seções, adultos voluntários, tarefas, dependências e histórico de status.

## Possibilidade de publicação

Para disponibilizar a aplicação em ambiente público, seria possível utilizar serviços de hospedagem como Render, Railway, Vercel, Netlify ou Heroku.

Uma possibilidade seria:

- Publicar o frontend em uma plataforma como Vercel ou Netlify.
- Publicar o backend em uma plataforma como Render, Railway ou Heroku.
- Configurar o endereço da API no frontend para que ele se comunique com o backend publicado.
- Avaliar a substituição do banco SQLite por uma solução mais adequada para produção, como PostgreSQL, caso o sistema seja utilizado por múltiplos usuários.

## Etapas previstas para deploy

As etapas gerais para publicação seriam:

1. Preparar as variáveis de ambiente da aplicação.
2. Configurar o backend para aceitar requisições do endereço público do frontend.
3. Publicar o backend em uma plataforma de hospedagem.
4. Publicar o frontend em uma plataforma de hospedagem.
5. Ajustar a URL da API consumida pelo frontend.
6. Testar as funcionalidades principais no ambiente publicado.
7. Verificar se os dados estão sendo gravados e consultados corretamente.

## Considerações sobre o banco de dados

O SQLite atende bem à proposta acadêmica e ao desenvolvimento local do protótipo, pois é simples, leve e permite demonstrar conceitos de banco de dados relacional e SQL.

Para uma versão em produção, com acesso simultâneo de vários usuários, seria recomendável avaliar o uso de um banco de dados mais robusto, como PostgreSQL ou MySQL.

## Conclusão

Embora o projeto tenha sido executado localmente durante o desenvolvimento, sua estrutura permite evolução para publicação em ambiente web. A separação entre frontend, backend e banco de dados facilita uma futura implantação em servidor público, atendendo ao conceito de disponibilização de aplicações web trabalhado no Projeto Integrador.
