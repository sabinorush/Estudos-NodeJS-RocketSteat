import http from 'http'

// CommonJS => require
// ESModules => import/export

//Stateful - As informações da aplicação serão armazenadas de forma local, sendo assim, quando derrubada a aplicação se perde as informações
//Stateless - Armazena informações em um ambiente externas, sendo assim, quando derrubada a aplicação não se perde as informações

//JSON - JavaScript Object Notation

//Cabeçalhos de requisição/resposta => Metadados

const users = []

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === 'GET' && url === '/users') {
      return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }
  if(method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: "Gustavo Sabino",
      email: "gu.sabino@hotmail.com"
    })
    return response.writeHead(201).end()
  }

  return response.writeHead(404).end('Not found')
})

server.listen(3333)