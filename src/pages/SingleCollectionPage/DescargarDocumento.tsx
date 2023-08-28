import React from 'react'
import { PDF_ICON } from '../../assets'
import { ProcessInAction } from '../../components/loading/ProcessInAction'
import { useDounloadDocument } from './hooks/useDounloadDocument'

type Props = {
  docuuid: string
  docstate: '' | 'error' | 'processing' | 'processed'
}
export const DescargarDocumento: React.FC<Props> = ({ docstate, docuuid }) => {
  if (docstate === '') return <></>
  if (docstate === 'processing') {
    return (
      <div className='flex gap-3'>
        <p>Procesando documento</p>
        <img className='animate-pulse' src={PDF_ICON} />
      </div>
    )
  }
  const { downloading, handleDowloadPDF, progress } = useDounloadDocument()
  return (
    <div>
      <div className='flex gap-3 h-6'>
        <button
          className='underline text-gray-800 hover:text-blue-600 disabled:text-gray-800'
          disabled={downloading}
          onClick={() => handleDowloadPDF(docuuid)}
        >
          Descargar Documento
        </button>
        <img src={PDF_ICON} />
      </div>
      <div className='flex gap-2 justify-center items-center'>
        <ProcessInAction loading={downloading} />
        {progress !== 0 && <p className='text-sm font-medium'>{progress}%</p>}
      </div>
    </div>
  )
}
