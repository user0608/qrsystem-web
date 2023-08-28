import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { loginService } from '../../../services/account_service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { SessionContext } from '../../../contexts/SessionContext'
import { toast } from 'react-hot-toast'
type login = {
  username: string
  password: string
}
export interface Account {
  username: string
  first_name: string
  last_name: string
  email: string
  created_at: string
}
export interface LoginResponse {
  account: Account
  token: string
}

const scheme = yup.object().shape({
  username: yup.string().required('username no puede quedar vacio'),
  password: yup.string().required('password no puede quedar vacio'),
})
export const useLoginPage = () => {
  const { setAccount } = useContext(SessionContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login, any>({ resolver: yupResolver(scheme) })
  const { mutate, isError, error, isLoading } = useMutation<LoginResponse, Error, login>(loginService)

  const handlerLogin = handleSubmit(({ username, password }: login) => {
    mutate(
      { username, password },
      {
        onSuccess: data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('account', JSON.stringify(data.account))
          setAccount(data.account)
        },
        onError: error => toast.error(error.message),
      }
    )
  })

  return {
    register,
    handlerLogin,
    formErrors: errors,
    process: {
      loading: isLoading,
      error: isError,
      message: error?.message ?? '',
    },
  }
}
