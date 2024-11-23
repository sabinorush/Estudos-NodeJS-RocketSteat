// /users/:id

export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g//Buscar e verificar se existe parâmetro dinâmico
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}`)


  return pathRegex
}