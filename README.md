# Projeto Full Stack NextJS + TypeScript e Java + SpringBoot
Aplicação full stack em Java usando ferramentas e conceitos como:
- Rest e RestFull
- Migrations
- Lombok
- SpringBoot(JPA, Data, Validations, Secutiry...)
- JWToken
- Swagger
- Eureka Netflix
- Spring Cloud
- NextJS
- TypeScript
- RadixUI

## Pré-requisitos
- Node 18 ou mais.
- Java SDK 21
- Docker
- DBeaver
- Intellij
- VSCode

## 1 - Criando banco de dados postgresSQL com docker

```sh
  docker run -dti --name post-full -p 5432:5432 -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres postgres
```

## 2 - Subindo as aplicações Back-End(Em Desenvolvimento)

- 1 - Abra o Intellij e selecione a pasta service do projeto
- 2 - Após subir a aplicação, veremos que o nosso serviço de descoberta Eureka estará online no link: http://localhost:5050.
- 3 - Agora subiremos a aplicação gateway, novamente com o Intellij selecionaremos na pasta a aplicação gateway
- 4 - Verificando nosso serviço de descoberta no link fornecido veremos que a aplicação gateway se registrou no servidor.
- 5 - Subindo a aplicação goroh, novamente com o Intellij selecionaremos a aplicação goroh, responsável pelo cadastro de novos usuários, login e gerenciamento de usuários
- 6 - Aplicação gorohBebidas(Em desenvolvimento)


## 3 - Iniciando a aplicação Front-End(Em Desenvolvimento)

- Abra o VSCode e selecione dentro da pasta telaGoroh a pasta goroh-web, em seguida realize o comanxo abaixo:
 
```sh
  npm install
```

- Após a instalação das dependências, realizar o comando para inicializar a aplicação Front-End:

```sh
    npm run dev
```

- Após a inicialização acessa aplicação pelo navegador pelo link: http://localhost:3000

## Documentação online Swagger(Em Desenvolvimento)

- Link para acessar o swagger: http://localhost:8080/swagger-ui/index.html#/
