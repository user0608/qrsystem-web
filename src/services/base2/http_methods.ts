import { API_URL } from '../../envs'
import { joinurl } from '../../utils/utils'
import { ApiError, InternetError, SyntaxJsonError } from './errores'

export const get = async (path: string): Promise<any> => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const decoded = await response.json()
    if (!response.ok) {
      throw new ApiError(decoded.message)
    }
    return decoded.data
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}
export const post = async (path: string, data: any): Promise<any> => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const decoded = await response.json()
    if (!response.ok) {
      throw new ApiError(decoded.message)
    }
    return decoded.data
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}

export const postForm = async (path: string, data: FormData): Promise<any> => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'POST',
      body: data,
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const decoded = await response.json()
    if (!response.ok) {
      throw new ApiError(decoded.message)
    }
    return decoded.data
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}

export const update = async (path: string, data: any): Promise<any> => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const decoded = await response.json()
    if (!response.ok) {
      throw new ApiError(decoded.message)
    }
    return decoded.data
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}

export const del = async (path: string): Promise<any> => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const decoded = await response.json()
    if (!response.ok) {
      throw new ApiError(decoded.message)
    }
    return decoded.data
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}
