import http from 'http'
import { json } from './middleware/json.js'

// CommonJS => require
// ESModules => import/export

//Stateful - As informações da aplicação serão armazenadas de forma local, sendo assim, quando derrubada a aplicação se perde as informações
//Stateless - Armazena informações em um ambiente externas, sendo assim, quando derrubada a aplicação não se perde as informações

//JSON - JavaScript Object Notation

//Cabeçalhos de requisição/resposta => Metadados

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
  if (method === 'GET' && url === '/users') {

      return res
      .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {
    const {name, email} = req.body
    users.push({
      id: 1,
      name,
      email
    })
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3333)