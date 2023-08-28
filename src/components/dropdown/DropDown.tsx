import React, { useEffect, useRef, useState } from 'react'
type Props = {
  options?: (string | { id: string; value: string })[]
  onSelect?: (id: string) => void
  keepOpen?: boolean
}
export const DropDown: React.FC<Props> = ({ children, options, onSelect, keepOpen = false }) => {
  const [show, setState] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (keepOpen && dropRef.current && dropRef.current.contains(target)) {
        return
      }
      document.removeEventListener('click', listener)
      setState(false)
    }
    if (show) document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  }, [show])
  return (
    <div className='select-none relative inline-block'>
      <div onClick={() => setState(!show)} className=''>
        {children || <div className='w-10 h-5 rounded-md shadow border' />}
      </div>
      {show && (
        <div ref={dropRef} className='absolute shadow-md border bg-white top-[100%] right-0 mt-1 py-1 rounded-md z-10'>
          <div className='absolute top-[-11px] right-[0.6px] bg-transparent w-6 h-[11px] overflow-hidden pt-[3px] '>
            <div className='mx-auto w-4 h-4 bg-white border shadow-md rotate-[48deg] ' />
          </div>
          {options?.map(item => {
            let id = ''
            let value = ''
            switch (typeof item) {
              case 'string':
                id = item
                value = item
                break
              case 'object':
                id = item.id
                value = item.value
                break
            }
            return (
              <p
                key={id}
                onClick={() => {
                  if (onSelect) onSelect(id)
                }}
                className='whitespace-nowrap font-sans text-black px-5 py-[3px] hover:bg-gray-200 active:bg-[#B3D4FF]'
              >
                {value}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}
