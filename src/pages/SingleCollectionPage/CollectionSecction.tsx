import classNames from 'classnames'
import moment from 'moment'
import React from 'react'
import { ProcessInAction } from '../../components/loading/ProcessInAction'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { useModal } from '../../hooks/useModal'
import { Collection } from '../../models/collection'
import { DescargarDocumento } from './DescargarDocumento'
import { useCollectionSecction } from './hooks/useCollectionSecction'
import { RegisterTemplateView } from './RegisterTemplateView'
import { NoTemplate, TemplateSection } from './TemplateSection'
type Props = {
  collection: Collection
}
export const CollectionSecction: React.FC<Props> = ({ collection }) => {
  const [modalstate, openmodal] = useModal()
  const { generateCollectionDocument, documentProcessLoading } = useCollectionSecction(collection)
  return (
    <>
      <ModalWrapper modalState={modalstate} allowOutside>
        <RegisterTemplateView
          // uploadImagen={handleUploadtemplate}
          collectionID={collection.id}
          templateDetails={collection.template_details}
        />
      </ModalWrapper>
      <div className='flex flex-col md:flex-row md:gap-4'>
        <div className='flex-1'>
          <div className='flex justify-end mb-3'>
            <span className='text-xs font-thin text-slate-400 shadow-md bg-gray-100 px-2 rounded-md'>
              {collection?.id}
            </span>
          </div>
          <p className='text-gray-700 text-xl font-medium mb-2'>{collection?.name}</p>
          <p className='text-sm text-slate-500 mb-2'>{collection?.description}</p>
          <div className='mb-2'>
            <span className='text-xs text-slate-600 shadow-md bg-gray-100 px-2 rounded-md'>
              Creado en: {moment(collection?.created_at).format('LLL')}
            </span>
          </div>
          <hr className='mb-4' />
          <div className='md:mb-6'>
            <div className='bg-[#38A562] rounded-xl px-4 py-1 mb-4'>
              <p className='text-white select-none font-semibold'>Colección válida desde:</p>
              <p className='text-center text-xl font-medium text-white'>
                {moment(collection?.not_before).format('LLL')}
              </p>
            </div>
            <div
              className={classNames('bg-[#FF8B24] rounded-xl px-4 py-1 mb-4', {
                'bg-rose-600': !collection?.time_out,
              })}
            >
              <p className='text-white select-none font-semibold'>Vence en:</p>
              {collection?.time_out ? (
                <p className='text-center text-xl font-medium text-white '>
                  {moment(collection?.time_out).format('LLL')}
                </p>
              ) : (
                <p className='text-white text-center font-medium text-md'>No hay fecha de expiración definida</p>
              )}
            </div>
          </div>
          <div className='flex justify-center gap-2 items-center select-none cursor-pointer mb-4'>
            <DescargarDocumento docstate={collection.document_process} docuuid={collection.documento_uuid} />
          </div>
        </div>

        <div className='flex-1'>
          <div className='flex mb-4 md:pt-5 md:justify-start justify-end gap-4'>
            <button className='btn-sm' onClick={() => openmodal()}>
              {collection.template_uuid ? 'Ver Plantilla' : 'Subir Plantilla'}
            </button>
            {collection.template_uuid && (
              <div className='flex gap-2'>
                <button
                  className='btn-primary-sm disabled:bg-gray-300'
                  disabled={collection.document_process === 'processing' || documentProcessLoading}
                  onClick={() => generateCollectionDocument(collection.id)}
                >
                  Generar PDF
                </button>
                <ProcessInAction loading={collection.document_process === 'processing'} size='xs' />
              </div>
            )}
          </div>

          <div className='bg-blue-500 w-full max-h-[200px] md:max-h-[340px] overflow-auto shadow-md rounded-md'>
            {collection.template_uuid ? (
              <TemplateSection collectionuuid={collection.id} templateuuid={collection.template_uuid} />
            ) : (
              <NoTemplate />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
