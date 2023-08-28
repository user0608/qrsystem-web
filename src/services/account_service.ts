import { post } from './base2/http_methods'

export const loginService = async (login: { username: string; password: string }) => {
  return post('/login', login)
}
