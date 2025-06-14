<h1>🚀 Projeto Full Stack NextJS + TypeScript & Java + Spring Boot</h1>

<p>Aplicação full stack utilizando tecnologias modernas tanto no <strong>Back-End</strong> quanto no <strong>Front-End</strong>, com foco em:</p>

<ul>
  <li>🌐 Rest e RestFull APIs</li>
  <li>📦 Migrations</li>
  <li>🔗 Lombok</li>
  <li>☕ Spring Boot (JPA, Data, Validations, Security...)</li>
  <li>🔑 JWT (JSON Web Token)</li>
  <li>📃 Swagger</li>
  <li>🧭 Eureka Netflix</li>
  <li>☁️ Spring Cloud</li>
  <li>⚛️ NextJS</li>
  <li>📝 TypeScript</li>
  <li>🎨 RadixUI</li>
</ul>

<hr>

<h2>📌 Pré-requisitos</h2>

<ul>
  <li>✅ Node.js v18 ou superior</li>
  <li>✅ Java SDK 21</li>
  <li>✅ Docker</li>
  <li>✅ DBeaver</li>
  <li>✅ IntelliJ IDEA</li>
  <li>✅ VS Code</li>
</ul>

<hr>

<h2>🛠️ 1 - Criando o Banco de Dados PostgreSQL com Docker</h2>

<pre>
<code>
docker run -dti --name post-full -p 5432:5432 -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres postgres
</code>
</pre>

<hr>

<h2>🚀 2 - Subindo as Aplicações Back-End (Em Desenvolvimento)</h2>

<details>
  <summary><strong>📌 Passo a Passo</strong></summary>
  <ol>
    <li>Abra o <strong>IntelliJ IDEA</strong> e selecione a pasta <code>service</code> do projeto.</li>
    <li>Inicie a aplicação principal. Verifique se o serviço de descoberta <strong>Eureka</strong> está online:  
      👉 <a href="http://localhost:5050" target="_blank">http://localhost:5050</a>
    </li>
    <li>Abra a aplicação <code>gateway</code> no IntelliJ e execute-a.</li>
    <li>Verifique no Eureka se a aplicação <strong>Gateway</strong> foi registrada.</li>
    <li>Abra a aplicação <code>goroh</code> (responsável por cadastro, login e gerenciamento de usuários) e execute-a.</li>
    <li>Aplicação <code>gorohBebidas</code>: <em>(Em desenvolvimento)</em></li>
  </ol>
</details>

<hr>

<h2>🌐 3 - Iniciando a Aplicação Front-End (Em Desenvolvimento)</h2>

<details>
  <summary><strong>📌 Passo a Passo</strong></summary>

  <ol>
    <li>
      Abra o <strong>VS Code</strong> e navegue até a pasta:<br><br>

      ```bash
      telaGoroh/goroh-web
      ```
    </li>

    <li>
      Instale as dependências:<br><br>

      ```bash
      npm install
      ```
    </li>

    <li>
      Inicie a aplicação:<br><br>

      ```bash
      npm run dev
      ```
    </li>

    <li>
      Acesse no navegador:<br><br>

      👉 [http://localhost:3000](http://localhost:3000)
    </li>
  </ol>

</details>


<hr>

<h2>📚 4 - Documentação Online Swagger (Em Desenvolvimento)</h2>

<ul>
  <li>Acesse a documentação da API via Swagger:  
  👉 <a href="http://localhost:8080/swagger-ui/index.html#/" target="_blank">http://localhost:8080/swagger-ui/index.html#/</a></li>
</ul>

<hr>

<p><strong>🛠️ Status Atual:</strong> Em desenvolvimento com foco na integração de microsserviços e autenticação JWT.</p>
