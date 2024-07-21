# Agrupador de pedidos por usuários

## Descrição
Este projeto é uma API para o gerenciamento de usuários e pedidos, incluindo a funcionalidade de upload e processamento de arquivos .txt para agrupar pedidos por usuários. A API está documentada utilizando Swagger e o MongoDB é utilizado como banco de dados.

## Pré-requisitos
- Node.js (v14 ou superior)
- Docker e Docker Compose

## Estrutura do Projeto
```bash
agrupador-de-pedidos
├── config
│   └── database.js
├── controllers
│   └── userController.js
├── dtos
│   └── PedidoDTO.js
├── models
│   └── user.js
├── routes
│   └── userRoutes.js
├── services
│   ├── fileService.js
│   └── userService.js
├── swagger.json
├── docker-compose.yml
├── package.json
└── server.js

```
## Instalação e Execução
### 1. Clonar o Repositório
Clone o repositório para a sua máquina local:

```bash
Copiar código
git clone https://github.com/fortunecapitalizacoes/desafio-tecnico-luizalabs.git
cd agrupador-de-pedidos
```
### 2. Instalar Dependências
Instale as dependências do projeto:

```bash
Copiar código
npm install
```
### 3. Configurar o Banco de Dados
Utilize Docker e Docker Compose para subir uma instância do MongoDB:

```bash
Copiar código
docker-compose up -d
```
### 4. Executar a Aplicação
Inicie a aplicação:

```bash
Copiar código
npm start
```
### A aplicação estará disponível em http://localhost:5000.

### 5. Acessar a Documentação da API

## A documentação Swagger da API estará disponível em http://localhost:5000/api-docs.

### Endpoints
Criação de Usuário
POST /users

Cria um novo usuário.

Obter Usuário pelo ID
GET /users/{userId}

Obtém um usuário pelo ID.

Obter Todos os Usuários
GET /users

Obtém uma lista de todos os usuários.

Atualizar Usuário
PUT /users/{userId}

Atualiza um usuário existente.

Deletar Usuário
DELETE /users/{userId}

Deleta um usuário pelo ID.

Obter Usuários pelo Nome
GET /users/name/{name}

Obtém usuários pelo nome.

Upload de Arquivo
POST /upload

## Faz upload de um arquivo .txt e processa os pedidos.

### Arquivo Swagger
A especificação OpenAPI para esta API está disponível no arquivo swagger.json.

### Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

### Licença
Este projeto está licenciado sob a licença MIT.

### Contato
Para mais informações, entre em contato com [Cleiton Silva, Hulk] via [hulk.silva.oficial@gmail.com].