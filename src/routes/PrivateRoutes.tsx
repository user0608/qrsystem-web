import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { HomePage } from '../pages/HomePage'

export const PrivateRoutes = () => {
  const { account } = useContext(SessionContext)
  if (!account) return <Navigate to='/login' replace />
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}
