import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProcessInAction } from '../components/loading/ProcessBox'
import { useServiceMidleware } from '../hooks/service'
import { loginService } from '../services/account'
type login = {
  username: string
  password: string
}
const scheme = yup.object().shape({
  username: yup.string().required('username no puede quedar vacio'),
  password: yup.string().required('password no puede quedar vacio'),
})
export const LoginPage = () => {
  const { account, setAccount } = useContext(SessionContext)
  if (account) return <Navigate to='/' replace />
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login, any>({ resolver: yupResolver(scheme) })
  const [serviceMiddl, process] = useServiceMidleware()
  const handleLogin = async ({ username, password }: login) => {
    const [{ data }, success] = await serviceMiddl(() => loginService(username, password), {
      notifyError: true,
      notifySucess: false,
    })
    if (success) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('account', JSON.stringify(data.account))
      setAccount(data.account)
    }
  }
  return (
    <div
      className='w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-emerald-600 to-blue-900'
    >
      <form
        className='pt-10 px-10 pb-7 bg-white rounded-xl drop-shadow-lg space-y-4'
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className='text-center text-3xl'>QR System</h1>
        <div className='flex flex-col'>
          <label className='text-sm font-light mb-2'>Username</label>
          <input
            autoComplete='off'
            {...register('username')}
            className='w-72 px-3 py-2 rounded-md border border-slate-400'
            placeholder='Nombre de usuario'
          />
          <p className='text-xs text-red-500 pl-2 m-0'>{errors.username?.message}</p>
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-light mb-2'>Password</label>
          <input
            {...register('password')}
            className='w-72 px-3 py-2 rounded-md border border-slate-400'
            type='password'
            placeholder='Your Password'
          />
          <p className='text-xs text-red-500 pl-2 m-0'>{errors.password?.message}</p>
        </div>
        <div className='pt-2'>
          <button
            className='w-full px-10 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in'
          >
            Sign In
          </button>
        </div>
        <ProcessInAction {...process} size='md' showSpinnerOnly />
      </form>
    </div>
  )
}
