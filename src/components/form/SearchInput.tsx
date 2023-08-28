import { SearchIcon, XIcon } from '@heroicons/react/outline'
import { ChangeEvent, FormEvent, useState } from 'react'

export const SearchInput = ({ onSubmit }: { onSubmit?: (value: string) => void }) => {
  const [value, setValue] = useState('')
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }
  const handleSubmin = (e: FormEvent) => {
    e.preventDefault()
    if (onSubmit && value) onSubmit(value)
  }
  return (
    <form onSubmit={handleSubmin}>
      <div className='relative inline-block text-sm'>
        <input
          onChange={handlerChange}
          value={value}
          className='inline-block pl-2 pr-6 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
        />
        {value === '' ? (
          <SearchIcon className='w-4 inline-block absolute h-full right-1' />
        ) : (
          <XIcon className='w-4 inline-block absolute h-full right-1' onClick={() => setValue('')} />
        )}
      </div>
    </form>
  )
}
