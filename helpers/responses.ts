export function badRequest (error: any): any  {
  return {
    statusCode: 400,
    body: error
  }
}

export function unauthorized (): any {
  return {
    statusCode: 401,
    body: 'Senha ou usuário inválidos'
  }
}
