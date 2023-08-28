import moment from 'moment'
import React from 'react'
import { Collection } from '../../models/collection'
import { useCollectionRegister } from './hooks/useCollectionRegister'
type Props = {
  collection?: Collection
}
export const CollectionRegisterView: React.FC<Props> = ({ collection }) => {
  const { register, closemodal, wrapFormHandler, errors, saveCollection, loading } = useCollectionRegister(collection)

  return (
    <div>
      <form className='px-4 md:px-8 py-4' onSubmit={wrapFormHandler(saveCollection)}>
        <div className='md:flex md:gap-3'>
          <div className='flex flex-col mb-5 w-full'>
            <label className='mb-2 text-sm font-medium text-gray-900'>Nombre</label>
            <input
              {...register('name')}
              type='text'
              autoComplete='off'
              className='px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
            <small className='pl-3 text-rose-500'>{errors.name?.message}</small>
          </div>
          <div className='flex flex-col  mb-5'>
            <label className='mb-2 text-sm font-medium text-gray-900'>Numero de tickets</label>
            <input
              {...register('num_tickets')}
              disabled={!!collection}
              type='number'
              autoComplete='off'
              className='px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
            <small className='pl-3 text-rose-500'>{errors.num_tickets?.message}</small>
          </div>
        </div>
        <div className='flex flex-col  mb-5'>
          <label className='mb-2 text-sm font-medium text-gray-900'>
            Descripción <small>(opcional)</small>
          </label>
          <textarea
            {...register('description')}
            maxLength={480}
            id='message'
            rows={3}
            className='px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
          ></textarea>
        </div>
        <div className='md:flex md:gap-4'>
          <div className='flex flex-col mb-5 w-full'>
            <label className='mb-2 text-sm font-medium text-gray-900'>
              Válido Desde <small>(opcional)</small>
            </label>
            <input
              {...register('not_before')}
              min={
                collection && collection.not_before
                  ? moment(collection.not_before).format('YYYY-MM-DDTHH:SS')
                  : moment().subtract(1, 'd').format('YYYY-MM-DDTHH:SS')
              }
              type='datetime-local'
              className='px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
          </div>
          <div className='flex flex-col mb-5 w-full'>
            <label className='mb-2 text-sm font-medium text-gray-900'>
              Hasta <small>(opcional)</small>
            </label>
            <input
              {...register('time_out')}
              min={moment().format('YYYY-MM-DDTHH:SS')}
              type='datetime-local'
              className='px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
            />
          </div>
        </div>
        <div className='flex justify-end gap-8 mb-4'>
          <button
            type='button'
            className='bg-rose-500 active:bg-rose-500  hover:bg-rose-700 text-white py-1 px-2 rounded-md'
            onClick={() => closemodal()}
          >
            {loading ? 'Cerrar' : 'Cancel'}
          </button>
          <button
            type='submit'
            disabled={loading}
            className='bg-[#0052CC] active:bg-[#0052CC] hover:bg-[#0065FF] text-white py-1 px-2 rounded-md disabled:bg-gray-200'
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
