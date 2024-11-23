//middleware => interceptador
//Dentro do node funciona como uma função que intercepta a requisição

export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) { //Buscando o chunk da requisição
    buffers.push(chunk) //Enviando o chunk para o array de buffers
  }

  //Verificar se existe retorno no corpo da requisição e transforma o retorno da requisição em um tipo primitivo javascript(Geralmente um objeto javascript)
  try{
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}