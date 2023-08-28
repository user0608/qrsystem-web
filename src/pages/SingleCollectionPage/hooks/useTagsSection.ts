import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collectionTagsCacheKey } from '../../../keys'
import { Tag } from '../../../models/collection'
import * as yup from 'yup'
import { deleteTagService, findCollectionTags, registerTagService } from '../../../services/conllection_services'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { uuid } from '../../../utils/uuid'

const REQUIERED = 'Este campo es obligatorio'
const schema = yup.object().shape({
  name: yup.string().max(80, 'No puede exceder los 80 caracteres').required(REQUIERED),
  value: yup.string().max(480, 'No puede exceder los 480 caracteres').required(REQUIERED),
})
export const useTagsSection = (collectionUuid: string) => {
  const {
    register,
    handleSubmit: wrappSubmit,
    reset,
    formState: { errors },
  } = useForm<Tag, any>({ resolver: yupResolver(schema) })
  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useQuery<Tag[], Error>([collectionTagsCacheKey, collectionUuid], () => findCollectionTags(collectionUuid))
  const { mutate, isLoading: saving } = useMutation<any, Error, Tag>((tag: Tag) =>
    registerTagService(collectionUuid, tag)
  )
  const { mutate: deleteMutation, isLoading: deleting } = useMutation<any, Error, string>(deleteTagService)

  const query = useQueryClient()
  const registrarTag = (tag: Tag) => {
    tag.id = uuid()
    const toastID = toast.loading('Guardando Tag...')
    mutate(tag, {
      onSuccess: () => {
        query.setQueryData<Tag[]>([collectionTagsCacheKey, collectionUuid], last => [...(last ?? []), tag])
        toast.success('Tag guardada', { id: toastID })
        reset()
      },
      onError: error => toast.error(error.message, { id: toastID }),
    })
  }
  const deletetag = (taguuid: string) => {
    if (deleting) return
    const toastID = toast.loading('Eliminando Tag...')
    deleteMutation(taguuid, {
      onSuccess: () => {
        query.setQueryData<Tag[]>([collectionTagsCacheKey, collectionUuid], last =>
          (last ?? []).filter(t => t.id !== taguuid)
        )
        toast.success('Tag eliminada!', { id: toastID })
      },
      onError: error => toast.error(error.message, { id: toastID }),
    })
  }
  return {
    register,
    wrappSubmit,
    errors,
    tags,
    process: {
      error: isError,
      message: error?.message,
      loading: isLoading,
    },
    deletetag,
    registrarTag,
    saving,
  }
}
