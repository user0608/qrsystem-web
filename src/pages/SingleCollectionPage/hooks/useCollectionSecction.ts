import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useAlerta } from '../../../hooks/useAlerta'
import { Collection } from '../../../models/collection'
import { generateDocumentService } from '../../../services/conllection_services'
import { toast } from 'react-hot-toast'
export const useCollectionSecction = (collection: Collection) => {
  const { mutate, isLoading, reset } = useMutation<any, Error, string>(generateDocumentService)
  const alerta = useAlerta()
  const generateCollectionDocument = React.useCallback((colectionUuid: string) => {
    const text = collection.documento_uuid === '' ? 'generar' : 'volver a generar'
    alerta(`Desea ${text} el documento`, {
      Si: () => {
        const toastID = toast.loading('Iniciando proceso')
        mutate(colectionUuid, {
          onError: error => toast.error(error.message, { id: toastID }),
          onSuccess: () => toast('Ya casi esta listo, espere', { id: toastID, icon: '👏' }),
          onSettled: () => reset(),
        })
      },
    })
  }, [])
  return { generateCollectionDocument, documentProcessLoading: isLoading }
}
