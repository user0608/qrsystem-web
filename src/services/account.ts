import { ServiceResult } from './bases/menager'
import { post } from './bases/post'

export const loginService = async (username: string, password: string): Promise<ServiceResult> => {
  const login = { username, password }
  return post('/login', login)
}
