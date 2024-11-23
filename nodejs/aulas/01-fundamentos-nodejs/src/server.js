import http from 'http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'


// CommonJS => require
// ESModules => import/export

//Stateful - As informações da aplicação serão armazenadas de forma local, sendo assim, quando derrubada a aplicação se perde as informações
//Stateless - Armazena informações em um ambiente externas, sendo assim, quando derrubada a aplicação não se perde as informações

//JSON - JavaScript Object Notation

//Cabeçalhos de requisição/resposta => Metadados

// UUID UNIQUE UNIVERSAL ID




const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if(route) {//Se existir uma solicitação na rota
    return route.handler(req, res)//enviar para o handler a requisição e a resposta.
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3333)