import React, { useState } from 'react'
const recoverState = <T,>(key: string) => {
  const data = localStorage.getItem(key) || ''
  if (!data) return undefined
  return JSON.parse(data) as T
}
export const useStoredState = <T,>(key: string, init: T): [T, (value: React.SetStateAction<T>) => void] => {
  const [state, setState] = useState<T>(recoverState(key) || init)
  const setStoredState = (value: React.SetStateAction<T>): void => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }
  return [state, setStoredState]
}
