import classNames from 'classnames'
import React, { useCallback } from 'react'
import { ModalWrapper, ModalWrapperContext } from './ModalWrapper'

type Props = {
  message: string
  buttons: { [x: string]: () => void }
}
const AlertaModalContent = ({ message, buttons }: Props) => {
  const closemodal = React.useContext(ModalWrapperContext)
  return (
    <div className='px-6 py-2 pt-0 text-center select-none min-w-[250px]'>
      <svg
        className='mx-auto mb-1 w-8 text-gray-400 dark:text-gray-200'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        ></path>
      </svg>
      <p className='mb-3 text-lg font-normal text-gray-500 dark:text-gray-500 max-w-[300px]'>{message}</p>
      {Object.keys(buttons).map(btn => (
        <button
          key={btn}
          data-modal-toggle='popup-modal'
          onClick={() => {
            buttons[btn]()
            closemodal()
          }}
          type='button'
          className={classNames(
            'focus:ring-4 focus:outline-none text-center font-normal text-sm min-w-[90px] px-2 py-2 mx-2 my-1',
            {
              'text-white bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800 rounded-lg':
                btn.toLowerCase() === 'cancelar',
              'text-white bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800 rounded-lg':
                btn.toLowerCase() !== 'cancelar',
            }
          )}
        >
          {btn}
        </button>
      ))}
    </div>
  )
}
export const AlertModalContext = React.createContext<(message: string, buttons: { [x: string]: () => void }) => void>(
  (message: string, buttons: { [x: string]: () => void }) => {}
)

export const AlertModalProvider: React.FC = ({ children }) => {
  const [showconfirmmodal, setShowconfirmmodal] = React.useState({ show: false, message: '', buttons: {} })

  const handlerOpenModal = useCallback(
    (message: string, buttons: { [x: string]: () => void }) => {
      setShowconfirmmodal(laststate => {
        if (!laststate.show) return { ...laststate, message, show: true, buttons: { ...buttons } }
        return laststate
      })
    },
    [setShowconfirmmodal]
  )

  const handlerClose = React.useCallback(() => {
    setShowconfirmmodal({ show: false, message: '', buttons: {} })
  }, [setShowconfirmmodal])

  return (
    <>
      <ModalWrapper
        modalState={{ show: showconfirmmodal.show, closeModal: handlerClose }}
        allowOutside
        titleOff
        widthContent
        zIndex={55}
      >
        <AlertaModalContent message={showconfirmmodal.message} buttons={showconfirmmodal.buttons} />
      </ModalWrapper>
      <AlertModalContext.Provider value={handlerOpenModal}>{children}</AlertModalContext.Provider>
    </>
  )
}
