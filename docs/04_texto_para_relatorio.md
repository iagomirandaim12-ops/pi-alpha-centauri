# Texto Base para o Relatório Final

## Implementação do Sistema

A etapa de implementação consistiu na criação de uma aplicação web voltada à gestão e rastreabilidade de tarefas dos adultos voluntários do 453º Grupo Escoteiro Alpha Centauri. O sistema foi estruturado com separação entre frontend, backend e banco de dados, permitindo maior organização, manutenção e evolução do projeto.

O backend foi desenvolvido com Node.js e Express, sendo responsável por disponibilizar rotas para consulta, cadastro, atualização e exclusão de informações. Foram implementadas rotas para tarefas, adultos voluntários, seções e dashboard.

O frontend foi desenvolvido com React, HTML, CSS e JavaScript, priorizando uma interface simples e objetiva para cadastro, listagem e acompanhamento dos dados. A interface permite cadastrar seções, cadastrar adultos voluntários, cadastrar tarefas, alterar status de tarefas, excluir registros e acompanhar o resumo das atividades pelo dashboard.

O banco de dados relacional foi modelado para contemplar seções, adultos voluntários, tarefas, dependências entre tarefas e histórico de alterações de status. Essa estrutura permite relacionar tarefas aos responsáveis e às seções, além de registrar a evolução das atividades ao longo do tempo.

A estrutura adotada permite demonstrar conceitos importantes de aplicações web, como arquitetura cliente-servidor, uso de rotas, comunicação entre interface e servidor, persistência de dados e organização das informações em tabelas relacionadas.

## Rastreabilidade

A rastreabilidade é garantida por meio do registro de responsáveis, seções, prazos, prioridades, status e histórico de alterações. Dessa forma, a Diretoria de Métodos Educativos pode acompanhar a evolução das tarefas e identificar pendências, atrasos e impedimentos.

O histórico de alterações de status contribui para o acompanhamento das atividades, permitindo verificar a evolução das tarefas ao longo do tempo e apoiar a tomada de decisão da equipe responsável.

## Controle de versão e GitHub

O projeto foi armazenado em um repositório público no GitHub, permitindo a organização dos arquivos, o acompanhamento das alterações realizadas e o compartilhamento do código com os integrantes do grupo.

Durante o desenvolvimento, parte da implementação e dos testes foi realizada em ambiente local. Em seguida, os arquivos foram enviados ao GitHub e passaram a ser organizados por meio de commits de documentação, ajustes conceituais e melhorias no projeto.

O uso do GitHub contribuiu para a prática de controle de versão, facilitando a continuidade do desenvolvimento e a consulta às versões registradas no repositório.

## Testes e validação

A validação do sistema foi realizada por meio de testes manuais durante o desenvolvimento local da aplicação, antes e depois do envio dos arquivos ao GitHub.

Foram verificados os principais fluxos do sistema, como inicialização do backend, inicialização do frontend, listagem de tarefas, cadastro de tarefas, alteração de status, exclusão de tarefas, funcionamento do dashboard e integração entre frontend, backend e banco de dados.

Também foram testadas as funcionalidades de cadastro e listagem de seções e adultos voluntários pela interface, além das rotas de cadastro, consulta, atualização e exclusão no backend.

Esses testes permitiram identificar e corrigir problemas durante o desenvolvimento, garantindo que a aplicação estivesse funcional e coerente com os objetivos do Projeto Integrador.

Após a publicação no GitHub, os testes realizados também foram registrados na documentação do projeto, permitindo demonstrar a validação das funcionalidades implementadas.

## Resultado

Como resultado, obteve-se um protótipo funcional capaz de demonstrar o cadastro, a listagem, a atualização e o acompanhamento de tarefas, adultos voluntários e seções, contribuindo para a organização administrativa do grupo escoteiro.

O sistema atende ao objetivo proposto ao permitir maior controle sobre responsáveis, seções, prazos, prioridades, status e histórico das atividades, favorecendo a rastreabilidade e a tomada de decisão pela Diretoria de Métodos Educativos.

Além disso, o projeto demonstra a aplicação prática de conceitos estudados ao longo do curso, como desenvolvimento web, banco de dados relacional, operações CRUD, arquitetura cliente-servidor, integração entre frontend e backend, controle de versão e documentação técnica.
