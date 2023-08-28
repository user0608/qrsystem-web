export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export class InternetError extends Error {
  constructor() {
    super('No hay conexión a internet 😵')
    this.name = 'InternetError'
  }
}
export class SyntaxJsonError extends Error {
  constructor() {
    super('Error en la comunicacion con el servicio 😢')
    this.name = 'SyntaxJsonError'
  }
}
