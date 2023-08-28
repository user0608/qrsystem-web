import classNames from 'classnames'
import React, { useCallback, useEffect, useRef } from 'react'
export const ModalWrapperContext = React.createContext(() => {})
type Props = {
  modalState?: { show: boolean; closeModal: () => void }
  title?: string
  allowOutside?: boolean
  titleOff?: boolean
  widthContent?: boolean
  zIndex?: number
}
export const ModalWrapper: React.FC<Props> = ({
  children,
  modalState = { show: false, closeModal: () => {} },
  title = 'Modal Title',
  titleOff,
  allowOutside,
  widthContent,
  zIndex = 50,
}) => {
  const refDiv = useRef<HTMLDivElement>(null)

  const listener = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (refDiv.current && refDiv.current.contains(target)) return
      modalState.closeModal()
    },
    [refDiv.current]
  )

  const handlerClose = React.useCallback(() => {
    modalState.closeModal()
  }, [modalState.closeModal, listener])

  useEffect(() => {
    if (modalState.show && !allowOutside) {
      document.addEventListener('click', listener)
    }
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [modalState.show, allowOutside, listener])

  if (!modalState.show) return <></>

  return (
    <div
      style={{ zIndex }}
      className='p-2 md:p-6 w-screen h-screen inset-0 fixed left-0 top-0 bg-[#888B93]/20 flex flex-col items-center select-none'
    >
      <div
        ref={refDiv}
        className={classNames(' bg-white overflow-auto rounded-md  mt-2 md:mt-6', {
          'w-full max-w-2xl': !widthContent,
        })}
      >
        <div
          className={classNames('flex justify-between items-start ', {
            'p-4  border-b': !titleOff,
          })}
        >
          {!titleOff && <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>}
          <button
            type='button'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
            onClick={handlerClose}
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <ModalWrapperContext.Provider value={modalState.closeModal}>{children}</ModalWrapperContext.Provider>
      </div>
    </div>
  )
}
