import { useState } from 'react'

const existeKey = (key: string) => {
  const value = localStorage.getItem(key)
  if (value && value === '1') return true
  else return false
}
export const useFirstClick = (key: string): [boolean, () => void] => {
  const [state, setState] = useState(() => existeKey(key))
  const flush = () => {
    if (state) return
    localStorage.setItem(key, '1')
    setState(true)
  }
  return [!state, flush]
}
