import { useCallback, useContext } from 'react'
import { AlertModalContext } from '../components/modal/AlertaWrapper'
export const useAlerta = () => {
  const confirmalert = useContext(AlertModalContext)
  const wrapf = useCallback((message: string, buttons?: { [x: string]: () => void }) => {
    if (buttons) {
      if (!buttons.Cancelar) {
        buttons = { Cancelar: () => {}, ...buttons }
      }
      confirmalert(message, buttons)
    } else {
      confirmalert(message, { OK: () => {} })
    }
  }, [])
  return wrapf
}
