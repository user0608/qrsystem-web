import { useCallback, useState } from 'react'

export const useModal = (): [{ show: boolean; closeModal: () => void }, () => void] => {
  const [show, setState] = useState(false)
  const closeModal = useCallback(() => setState(false), [useState])
  const openModal = useCallback(() => setState(true), [useState])
  return [{ show, closeModal }, openModal]
}
