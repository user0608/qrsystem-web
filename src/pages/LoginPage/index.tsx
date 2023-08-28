import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ProcessInAction } from '../../components/loading/ProcessInAction'
import { SessionContext } from '../../contexts/SessionContext'
import { useLoginPage } from './hooks/useLoginPage'

const LoginPage = () => {
  const { account } = useContext(SessionContext)
  if (account) return <Navigate to='/collections' replace />
  const { process, handlerLogin, register, formErrors } = useLoginPage()
  return (
    <div
      className='w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-emerald-500 to-blue-800'
    >
      <Link to='/' className='btn-sm absolute top-5 left-5'>
        Regresar
      </Link>
      <form className='pt-10 px-10 pb-7 bg-white rounded-xl drop-shadow-lg space-y-4' onSubmit={handlerLogin}>
        <h1 className='text-center text-3xl'>QR System</h1>
        <div className='flex flex-col'>
          <label className='text-sm font-light mb-2'>Username</label>
          <input
            autoComplete='off'
            {...register('username')}
            className='w-72 px-3 py-2 rounded-md border border-slate-400'
            placeholder='Nombre de usuario'
          />
          <p className='text-xs text-red-500 pl-2 m-0'>{formErrors.username?.message}</p>
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-light mb-2'>Password</label>
          <input
            {...register('password')}
            className='w-72 px-3 py-2 rounded-md border border-slate-400'
            type='password'
            placeholder='Your Password'
          />
          <p className='text-xs text-red-500 pl-2 m-0'>{formErrors.password?.message}</p>
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

export default LoginPage
