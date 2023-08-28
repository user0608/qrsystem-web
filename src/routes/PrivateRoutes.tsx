import { useContext } from 'react'
import { SSEProvider } from 'react-hooks-sse'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { DropDown } from '../components/dropdown/DropDown'
import { CollectionRoutes } from './CollectionRoutes'
import { joinurl } from '../utils/utils'
import { API_URL, GetToken } from '../envs'
import { useNotifyEvent } from '../events/useNotifyEvent'
export const PrivateRoutes = () => {
  const { account } = useContext(SessionContext)
  if (!account) return <Navigate to='/login' replace />
  return (
    <SSEProvider endpoint={`${joinurl(API_URL, '/events')}?token=${GetToken()}`}>
      <AppRoutes />
    </SSEProvider>
  )
}
const AppRoutes = () => {
  const { closeSession } = useContext(SessionContext)
  useNotifyEvent()
  return (
    <div>
      <PrivateHeader closeSession={closeSession} />
      <Routes>
        <Route path='/collections/*' element={<CollectionRoutes />} />
      </Routes>
    </div>
  )
}
const PrivateHeader = ({ closeSession }: { closeSession: () => void }) => {
  const handlerOption = (item: string) => {
    if (item === 'Cerrar Sesión') closeSession()
  }
  return (
    <div className='h-10 shadow px-2 md:px-8 relative bg-primary text-white select-none'>
      <div className='h-full flex items-baseline gap-4'>
        <Link to={'/collections'} className='md:basis-[150px] pt-1 font-bold text-lg md:text-xl'>
          QueGano
        </Link>
        <div className='flex basis-full gap-3 md:gap-5 md:px-8 overflow-auto'>
          <p>Collections</p>
          <p>Usuarios</p>
          <p>Ayuda</p>
        </div>
      </div>
      <div className='absolute h-full w-8 top-0 right-0 flex justify-center items-center'>
        <DropDown options={['Cerrar Sesión']} onSelect={handlerOption}>
          <DotsVerticalIcon className='w-6' />
        </DropDown>
      </div>
    </div>
  )
}
