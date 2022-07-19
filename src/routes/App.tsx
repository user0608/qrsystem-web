import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotifyWraper } from '../components/notification/Notify'
import { SessionContext } from '../contexts/SessionContext'
import { Account } from '../models/account'
import { LoginPage } from '../pages/LoginPage'
import { PrivateRoutes } from './PrivateRoutes'

const initStoredSession = (): Account | null => {
  const account = localStorage.getItem('account')
  if (account) {
    return JSON.parse(account) as Account
  }
  return null
}
export const App = () => {
  const [account, setAccount] = useState(initStoredSession)
  return (
    <SessionContext.Provider value={{ account, setAccount }}>
      <NotifyWraper>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<PrivateRoutes />} />
        </Routes>
      </NotifyWraper>
    </SessionContext.Provider>
  )
}
