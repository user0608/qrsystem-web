import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AlertModalProvider } from '../components/modal/AlertaWrapper'
import { NotifyWrapper } from '../components/notification/Notify'
import { SessionContext } from '../contexts/SessionContext'
import { Account } from '../models/account'
import { HomePage } from '../pages/Home/HomePage'
import LoginPage from '../pages/LoginPage'
import { PrivateRoutes } from './PrivateRoutes'

const initStoredSession = (): Account | null => {
  const account = localStorage.getItem('account')
  if (account) {
    return JSON.parse(account) as Account
  }
  return null
}
export const App = () => {
  const [account, setAccount] = React.useState(initStoredSession)
  const query = useQueryClient()
  const closeSession = React.useCallback(() => {
    localStorage.removeItem('account')
    localStorage.removeItem('token')
    setAccount(null)
    query.clear()
  }, [setAccount])
  return (
    <SessionContext.Provider value={{ account, setAccount, closeSession }}>
      <NotifyWrapper>
        <AlertModalProvider>
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<PrivateRoutes />} />
          </Routes>
        </AlertModalProvider>
      </NotifyWrapper>
    </SessionContext.Provider>
  )
}
