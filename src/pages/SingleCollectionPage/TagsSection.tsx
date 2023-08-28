import { ChevronDoubleRightIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React from 'react'
import { ProcessWrapper } from '../../components/loading/ProcessWrapper'
import { useFirstClick } from '../../hooks/useFirstClick'
import { useTagsSection } from './hooks/useTagsSection'
type Props = {
  collectionUuid: string
  closeBox?: () => void
}
export const TagsSection: React.FC<Props> = ({ collectionUuid, closeBox }) => {
  const [tagclose, flushclosetag] = useFirstClick('tagx')
  const { tags, process, register, wrappSubmit, errors, registrarTag, saving, deletetag } =
    useTagsSection(collectionUuid)
  return (
    <>
      <div className={classNames('flex flex-col h-full')}>
        <div className='bg-primary flex justify-between text-white text-lg px-2 h-[28px] shadow rounded-t-md'>
          <span>Tags</span>
          <div
            className={classNames('px-1', { 'animate-bounce pt-2': tagclose })}
            onClick={() => {
              closeBox && closeBox()
              flushclosetag()
            }}
          >
            <ChevronDoubleRightIcon className='w-6 active:translate-x-1' />
          </div>
        </div>
        <div className='basis-full flex flex-col overflow-auto bg-gray-100'>
          <ProcessWrapper {...process}>
            <table className='text-xs md:text-sm bg-gray-50 font-sans font-normal text-left relative w-full'>
              <thead className='sticky top-0 bg-gray-50 h-[24px] shadow-md'>
                <tr className='mb-1'>
                  <th scope='col' className='w-[30%] px-1'>
                    Nombre
                  </th>
                  <th scope='col' className='w-[55%]  px-1'>
                    Valor de la etiqueta
                  </th>
                  <th scope='col' className='w-[15%]  px-1 text-center text-gray-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags?.map(t => (
                  <tr key={t.id} className='border-b'>
                    <td className='py-1 px-1'>{t.name}</td>
                    <td className='py-1 px-1'>{t.value}</td>
                    <td className='py-1 px-1'>
                      <button className='select-none text-rose-500 hover:underline' onClick={() => deletetag(t.id)}>
                        eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ProcessWrapper>
        </div>
        <form className='basis-16 flex gap-2 flex-wrap p-1 shadow-md' onSubmit={wrappSubmit(registrarTag)}>
          <div className='flex flex-col  w-[160px]'>
            <label className='mb-1 text-xs font-medium text-gray-900 px-1'>Nombre</label>
            <input
              autoComplete='off'
              {...register('name')}
              type='text'
              className='px-2 text-sm py-[1px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
            <small className='pl-1 text-rose-500'>{errors.name?.message}</small>
          </div>
          <div className='flex flex-col flex-1'>
            <label className='mb-1 text-xs font-medium text-gray-900 px-1'>Valor</label>
            <input
              autoComplete='off'
              {...register('value')}
              type='text'
              className='px-2 text-sm py-[1px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
            <small className='pl-1 text-rose-500'>{errors.value?.message}</small>
          </div>
          <div className='flex justify-end w-full gap-4 items-center'>
            <button className='btn-primary-sm disabled:bg-gray-400' disabled={saving}>
              Registrar Tag
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
