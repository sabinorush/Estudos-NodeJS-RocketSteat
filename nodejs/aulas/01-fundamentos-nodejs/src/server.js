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

//Existem 3 formas de enviar informações para a API:
//Query Parameter: URL stateful - http://localhost:3333/users?userId=1 - geralmente utilizado para enviar informações não sensíveis(Filtrar informações, Paginação) e informações não obrigatórias
//Route Parameter: GET - http://localhost:3333/users/1 - Geralmente utilizado para identificar recursos. Também utilizado para enviar informações não sensíveis.
//Request Body:  Envio de informções de um formulário (HTTPs)





const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {//Se existir uma solicitação na rota
    const routeParams = req.url.match(route.path)

    console.log(routeParams)

    return route.handler(req, res)//enviar para o handler a requisição e a resposta.
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3333)