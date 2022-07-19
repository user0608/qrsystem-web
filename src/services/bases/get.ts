import { API_URL } from '../../envs'
import { joinurl } from '../../utils/utils'

import { managerError, managerResponse, ServiceResult } from './menager'
export const get = async (path: string): Promise<ServiceResult> => {
  try {
    const result = await fetch(joinurl(API_URL, path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return managerResponse(result)
  } catch (e) {
    return managerError(e as Error)
  }
}
