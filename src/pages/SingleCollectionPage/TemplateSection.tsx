import React from 'react'
import { ProcessWrapper } from '../../components/loading/ProcessWrapper'
import { useTemplateSecction } from './hooks/useTemplateSecction'

type Props = {
  collectionuuid: string
  templateuuid: string
}
export const TemplateSection: React.FC<Props> = ({ collectionuuid, templateuuid }) => {
  const { template, templateProcess } = useTemplateSecction(collectionuuid, templateuuid)
  return (
    <ProcessWrapper centerSpinner {...templateProcess}>
      {templateProcess.loading && (
        <div className='w-full h-[200px] md:h-[300px] flex flex-col justify-center items-center text-white shadow-md' />
      )}
      <img className='w-full' src={template?.url} />
    </ProcessWrapper>
  )
}

export const NoTemplate = () => {
  return (
    <div className='w-full h-[200px] md:h-[300px] flex flex-col justify-center items-center text-white shadow-md'>
      <p className='text-2xl font-bold'>No hay Imagen</p>
      <p className='text-center'>
        Inicie subiendo una imagen, con el diseño para su ticket y configure la posición del código QR y podrá generar
        el documento PDF con todos los tickets.
      </p>
    </div>
  )
}
