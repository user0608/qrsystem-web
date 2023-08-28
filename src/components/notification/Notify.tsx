import classNames from 'classnames'
import { useState, FC, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type NotifyModel = {
  type: 'error' | 'info' | 'success'
  message: string
}

type NotiyItem = {
  id: string
} & NotifyModel

export const NotifyContext = createContext<(item: NotifyModel) => void>(() => {})

export const NotifyWrapper: FC<{ time?: 1000 | 2000 | 3000 | 4000 }> = ({ children, time = 3000 }) => {
  const [notifications, setNotifications] = useState<NotiyItem[]>([])

  const notifier = (item: NotifyModel) => {
    const id = uuidv4()
    setNotifications(items => [{ id, ...item }, ...items])
    setTimeout(() => {
      setNotifications(items => items.filter(it => it.id !== id))
    }, time)
  }
  const removeItem = (id: string) => {
    setNotifications(items => items.filter(it => it.id !== id))
  }
  return (
    <>
      <div className='absolute right-4 top-3 select-none z-[100]'>
        {notifications.map(n => (
          <Toast key={n.id} notify={n} onClose={() => removeItem(n.id)} />
        ))}
      </div>
      <NotifyContext.Provider value={notifier}>{children}</NotifyContext.Provider>
    </>
  )
}
const Toast = ({ notify, onClose }: { notify: NotiyItem; onClose?: () => void }) => {
  const Icon = ({ type }: { type: 'error' | 'info' | 'success' }) => {
    if (type === 'success')
      return (
        <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      )
    if (type === 'error')
      return (
        <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      )
    return (
      <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
          clipRule='evenodd'
        ></path>
      </svg>
    )
  }
  return (
    <div
      className='flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 rounded-lg shadow-md bg-white z-[100]'
      role='alert'
    >
      <div
        className={classNames('inline-flex flex-shrink-0 justify-center items-center w-8 h-8  rounded-lg ', {
          'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200': notify.type === 'success',
          'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200': notify.type === 'error',
          'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200': notify.type === 'info',
        })}
      >
        <Icon type={notify.type} />
      </div>
      <div className='ml-3 text-sm font-normal'>{notify.message}</div>
      <button
        onClick={onClose}
        type='button'
        className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800'
        data-dismiss-target='#toast-success'
        aria-label='Close'
      >
        <svg
          aria-hidden='true'
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      </button>
    </div>
  )
}
