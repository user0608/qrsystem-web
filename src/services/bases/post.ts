import { API_URL } from '../../envs'
import { joinurl } from '../../utils/utils'
import { managerError, managerResponse, ServiceResult } from './menager'
export const post = async (path: string, data: any): Promise<ServiceResult> => {
  try {
    const result = await fetch(joinurl(API_URL, path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
      body: JSON.stringify(data),
    })
    return managerResponse(result)
  } catch (e) {
    return managerError(e as Error)
  }
}
