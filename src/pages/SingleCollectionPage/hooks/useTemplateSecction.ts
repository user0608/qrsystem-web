import { useQuery } from '@tanstack/react-query'
import { collectionTemplateCacheKey } from '../../../keys'
import { findTemplateImageService } from '../../../services/collection_download_service'
interface ImageTemplate {
  url: string
  blob: Blob
}
export const useTemplateSecction = (collectionuuid: string, templateuuid: string) => {
  const {
    data: template,
    error,
    isError,
    isLoading,
  } = useQuery<ImageTemplate, Error>(
    [collectionTemplateCacheKey, collectionuuid],
    () => findTemplateImageService(templateuuid),
    { cacheTime: 60000 * 10, keepPreviousData: true }
  )
  return {
    template,
    templateProcess: {
      error: isError,
      message: error?.message,
      loading: isLoading,
    },
  }
}
