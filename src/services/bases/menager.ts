import { ApiConnectError, OKMessageResponse } from './message'
export type ServiceResult = [any, boolean, string, number]
export const managerResponse = async (response: Response): Promise<ServiceResult> => {
  let status = false
  let res = null
  let message = 'Algo paso, no se pudo realizar la operación'
  const statusCode = response.status
  try {
    res = await response.json()
  } catch (e) {
    console.log(e)
    return [res, status, message, statusCode]
  }
  switch (statusCode) {
    case 200:
      message = OKMessageResponse
      status = true
      break
    default:
      message = res.message
      status = false
  }
  if (res?.message === 'el token es invalido') {
    alert('la sesión ha espirado')
    localStorage.removeItem('token')
    localStorage.removeItem('account')
    document.location.pathname = '/login'
    return [null, false, 'pro favor inicié sesión nuevamente', 203]
  }
  // TODO Logica
  return [res, status, message, statusCode]
}

export const managerError = async (err: Error): Promise<ServiceResult> => {
  let message = 'Algo paso'
  if (err?.message === 'Failed to fetch') {
    message = ApiConnectError
  }
  return [{}, false, message, 999]
}
