import http from 'http'
import { randomUUID } from 'node:crypto'
import { json } from './middleware/json.js'
import { Database } from './database.js'

// CommonJS => require
// ESModules => import/export

//Stateful - As informações da aplicação serão armazenadas de forma local, sendo assim, quando derrubada a aplicação se perde as informações
//Stateless - Armazena informações em um ambiente externas, sendo assim, quando derrubada a aplicação não se perde as informações

//JSON - JavaScript Object Notation

//Cabeçalhos de requisição/resposta => Metadados

// UUID UNIQUE UNIVERSAL ID


const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

      return res.end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {
    const {name, email} = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }
    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3333)