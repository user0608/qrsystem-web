import { API_URL } from '../../envs'
import { joinurl } from '../../utils/utils'
import { ApiError, InternetError, SyntaxJsonError } from './errores'

export const getBlob = async (path: string) => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    if (!response.ok) {
      const decoded = await response.json()
      throw new ApiError(decoded.message)
    }
    return await response.blob()
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}

export const download = async (path: string, controller: (progress: number) => void) => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
    })
    if (!response.ok) {
      const decoded = await response.json()
      throw new ApiError(decoded.message)
    }
    const body = response.body
    if (!body) throw new ApiError('Archivo no encontrado')
    const reader = body.getReader()
    const contentLength = parseInt(response.headers.get('Content-Length') ?? '')
    let receivedLength = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value: chunk } = await reader.read()
      if (done) break
      chunks.push(chunk)
      receivedLength += chunk.length
      controller(Math.round((receivedLength / contentLength) * 100))
    }
    return new Blob(chunks)
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}

export const postFormBlob = async (path: string, data: FormData) => {
  try {
    const response = await fetch(joinurl(API_URL, path), {
      method: 'POST',
      body: data,
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    if (!response.ok) {
      const decoded = await response.json()
      throw new ApiError(decoded.message)
    }
    return await response.blob()
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError()
    if (e instanceof TypeError) throw new InternetError()
    throw e
  }
}
