import { useQuery } from '@tanstack/react-query'
import { singleCollectionCacheKey } from '../../../keys'
import { Collection } from '../../../models/collection'
import { findCollectionService } from '../../../services/conllection_services'

export const useSingleCollectionPage = (collectionID: string) => {
  const { data, error, isError, isLoading } = useQuery<Collection, Error>(
    [singleCollectionCacheKey, collectionID],
    () => findCollectionService(collectionID),
    { retry: false }
  )
  return {
    collection: data,
    process: {
      error: isError,
      message: error?.message,
      loading: isLoading,
    },
  }
}
