import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useAlerta } from '../../../hooks/useAlerta'
import { Collection } from '../../../models/collection'
import { findCollectionsService, deleteCollectionService } from '../../../services/conllection_services'
import { toast } from 'react-hot-toast'
import { collectionsCacheKey } from '../../../keys'

export const useCollectionPage = () => {
  const alerta = useAlerta()
  const { data, error, isError, isLoading } = useQuery<Collection[], Error>(
    [collectionsCacheKey],
    findCollectionsService
  )
  const { mutate } = useMutation<any, Error, string>(deleteCollectionService)
  const query = useQueryClient()
  const handlerDelete = useCallback((collectionID: string) => {
    alerta('Al eliminar la colección, es posible que se pierda toda la información', {
      Confirm: async () => {
        const toastID = toast.loading('Eliminando...')
        mutate(collectionID, {
          onSuccess: () => {
            toast.success('Colección eliminada', { id: toastID })
            query.setQueryData<Collection[]>([collectionsCacheKey], collections =>
              collections?.filter(c => c.id !== collectionID)
            )
          },
          onError: error => {
            toast.error(error.message, { id: toastID })
          },
        })
      },
    })
  }, [])

  return {
    collections: data,
    process: {
      error: isError,
      message: error?.message,
      loading: isLoading,
    },
    handlerDelete,
  }
}
