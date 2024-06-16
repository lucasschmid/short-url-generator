# short-url-generator
Um serviço de encurtamento de URLs simples e eficiente, desenvolvido com Node.js, Express, MySQL e Sequelize. Esta aplicação permite aos usuários encurtar URLs longas em links mais gerenciáveis e rastrear o número de cliques para cada URL encurtada.

## Configurando o Ambiente de Desenvolvimento

Primeiramente é necessário ter instalado ou configurado o banco de dados MySQL.

1. Clone o repositório short-url-generator
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` com as variáveis de ambiente necessárias:
    PORT=<Porta que o servidor deve rodar>
    DB_HOST=<Host de conexão ao database>
    DB_PORT=<Porta de conexão ao database>
    DB_USER=<Usuário de conexão ao database>
    DB_PASS=<Senha de conexão ao database>
    DB_NAME=<Nome de conexão ao database>
    JWT_SECRET=<Chave secreta do JWT>
    BASE_URL=<URL base do sistema>
4. Inicie o servidor de desenvolvimento com `npm run dev`

## Postman Collection

Para facilitar o teste da API, foi incluído uma coleção do Postman no projeto. Siga as instruções abaixo para importar e usar a coleção.

### Importar a Coleção no Postman

1. Abra o Postman.
2. Clique em "Import" no canto superior esquerdo.
3. Selecione o arquivo `URL-SHORTENER.postman_collection.json` localizado na pasta `postman` no diretório raiz do projeto.
4. A coleção "URL Shortener API" aparecerá na barra lateral do Postman, contendo todas as requisições organizadas.

### Estrutura da Coleção

A coleção está organizada em três seções principais:

- **User**: Contém as requisições para registrar e autenticar usuários.
- **URL**: Contém as requisições para encurtar URLs e redirecionar para URLs originais.
- **Authenticated**: Contém as requisições que requerem autenticação para listar, atualizar e excluir URLs encurtadas pelo usuário autenticado.

### Variáveis de Ambiente Postman

Certifique-se de configurar as variáveis de ambiente no Postman para armazenar o token JWT após a autenticação e a URL base, que é utilizada nas requisições . Isso garantirá que as requisições autenticadas funcionem corretamente.

### Exemplos de Requisições

- **Register User**: Registra um novo usuário.
- **Login**: Autentica um usuário e obtém um token JWT.
- **Shorten URL**: Encurta uma URL.
- **Redirect to Short URL**: Redireciona para a URL original usando o identificador curto.
- **List URLs**: Lista todas as URLs encurtadas pelo usuário autenticado.
- **Update URL**: Atualiza a URL original de uma URL encurtada.
- **Delete URL**: Exclui logicamente uma URL encurtada.

Para mais detalhes, consulte a descrição das requisições dentro do Postman após importar a coleção.

