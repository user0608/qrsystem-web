import { useSSEListener } from '../hooks/useSSAEvent'
import { toast } from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Collection } from '../models/collection'
import { singleCollectionCacheKey } from '../keys'
export const useNotifyEvent = () => {
  const query = useQueryClient()
  useSSEListener<{ collection_id: string }>('document_processing', data => {
    query.setQueryData<Collection>([singleCollectionCacheKey, data.collection_id], collection => {
      if (!collection) return collection
      return { ...collection, document_process: 'processing' }
    })
  })
  useSSEListener<{ collection_id: string; doc_uuid: string; error: string }>('document_processed', data => {
    if (data.error !== '') {
      query.setQueryData<Collection>([singleCollectionCacheKey, data.collection_id], collection => {
        if (!collection) return collection
        return { ...collection, document_process: 'error', process_result: data.error }
      })
      toast.error(data.error, { icon: '🥺' })
      return
    }
    query.setQueryData<Collection>([singleCollectionCacheKey, data.collection_id], collection => {
      if (!collection) return collection
      return { ...collection, document_process: 'processed', documento_uuid: data.doc_uuid }
    })
    toast.success('Su PDF esta listo!', { icon: '😀' })
  })
}
