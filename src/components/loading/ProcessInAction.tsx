import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
type Props = {
  loading?: boolean
  error?: boolean
  message?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showErrorOnly?: boolean
  showSpinnerOnly?: boolean
  omitErrorIfContains?: string
  endProcess?: () => void
}
export const ProcessInAction = ({
  loading,
  message,
  error,
  endProcess,
  showErrorOnly,
  omitErrorIfContains,
  showSpinnerOnly,
  size = 'sm',
}: Props) => {
  const [isloading, setState] = useState(false)
  const [showErrorContent, setShowError] = useState(false)
  useEffect(() => {
    if (loading) setShowError(true)
    if (!isloading && loading) setState(true)
    if (isloading && !loading) {
      setState(false)
      if (endProcess && !error) endProcess() // indica fin del processo, solo si no hay error
    }
  }, [loading])

  // showErrorOnly desabilita el contendio
  if (loading && !showErrorOnly) {
    return (
      <div className='flex justify-center my-1'>
        <svg
          role='status'
          className={classNames('text-gray-200 animate-spin dark:text-gray-600 fill-blue-600', {
            'w-5 h-5': size === 'xs',
            'w-6 h-6': size === 'sm',
            'w-8 h-8': size === 'md',
            'w-10 h-10': size === 'lg',
            'w-12 h-12': size === 'xl',
          })}
          viewBox='0 0 100 101'
          fill='none'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </div>
    )
  }
  const EmptyBox = () => {
    return (
      <div
        className={classNames('my-1', {
          'h-5': size === 'xs',
          'h-6': size === 'sm',
          'h-8': size === 'md',
          'h-10': size === 'lg',
          'h-12': size === 'xl',
        })}
      />
    )
  }
  if (showErrorContent && !loading && !showSpinnerOnly && error) {
    if (omitErrorIfContains && message?.toLowerCase().includes(omitErrorIfContains)) return <EmptyBox />
    return (
      <div
        className={classNames('flex gap-1 justify-center items-center my-1 text-red-500', {
          'h-5': size === 'xs',
          'h-6': size === 'sm',
          'h-8': size === 'md',
          'h-10': size === 'lg',
          'h-12': size === 'xl',
        })}
      >
        <div className='flex w-[95%] justify-center gap-2'>
          <ExclamationIcon className='w-6' />
          <p className='text-center'>{message}</p>
        </div>
        <XIcon className='w-5 pt-1 hover:text-red-800 hover:scale-110' onClick={() => setShowError(false)} />
      </div>
    )
  }
  return <EmptyBox />
}
