import React from 'react'
import { Account } from '../models/account'

type values = {
  account: Account | null
  setAccount: (account: Account | null) => void
}
export const SessionContext = React.createContext<values>({ account: null, setAccount: () => {} })
