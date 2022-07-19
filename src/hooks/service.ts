import { useContext, useState } from 'react'
import { NotifyContext } from '../components/notification/Notify'
import { ServiceResult } from '../services/bases/menager'

type middlewareProps = {
  notifySucess: boolean
  notifyError: boolean
}
export const useServiceMidleware = (): [
  (next: () => Promise<ServiceResult>, props?: middlewareProps) => Promise<[any, boolean, string, number]>,
  { loading: boolean; error: boolean; message: string }
] => {
  const notifier = useContext(NotifyContext)
  const [process, setProcess] = useState({ loading: false, error: false, message: '' })
  const middleware = async (
    next: () => Promise<ServiceResult>,
    props: middlewareProps = { notifyError: true, notifySucess: true }
  ): Promise<[any, boolean, string, number]> => {
    setProcess({ loading: true, error: false, message: '' })
    const [data, success, message, httpCode] = await next()
    if (!success) {
      if (props?.notifyError) notifier({ message, type: 'error' })
      setProcess({ loading: false, error: true, message: message })
      return [data, success, message, httpCode]
    }
    setProcess({ loading: false, error: false, message: '' })
    if (props?.notifySucess) notifier({ message: 'Operación realizada', type: 'success' })
    return [data, success, message, httpCode]
  }
  return [middleware, process]
}
