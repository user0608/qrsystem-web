import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ModalWrapperContext } from '../../../components/modal/ModalWrapper'
import { Collection } from '../../../models/collection'
import { uuid } from '../../../utils/uuid'
import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertCollectionService, updateCollectionService } from '../../../services/conllection_services'
import { collectionsCacheKey, singleCollectionCacheKey } from '../../../keys'

const scheme = yup.object().shape({
  name: yup.string().required('username no puede quedar vacio'),
  num_tickets: yup.number().typeError('ingrese un número').min(1).required('password no puede quedar vacio'),
})

export const useCollectionRegister = (collection?: Collection) => {
  const closemodal = React.useContext(ModalWrapperContext)
  const { mutate, isLoading: loadingInsert } = useMutation<any, Error, Collection>(insertCollectionService)
  const { mutate: mutateUpdate, isLoading: loadingUpdate } = useMutation<any, Error, Collection>(
    updateCollectionService
  )
  const query = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Collection, any>({ resolver: yupResolver(scheme) })

  React.useEffect(() => {
    if (collection) {
      setValue('id', collection.id)
      setValue('name', collection.name)
      setValue('description', collection.description)
      setValue('num_tickets', collection.num_tickets)
      if (collection.not_before) setValue('not_before', moment(collection.not_before).format('YYYY-MM-DDTHH:SS'))
      if (collection.time_out) setValue('time_out', moment(collection.time_out).format('YYYY-MM-DDTHH:SS'))
      return
    }
    setValue('id', uuid())
  }, [collection, setValue])

  const insertCollection = React.useCallback(
    (c: Collection) => {
      const toastID = toast.loading('Creando collecction...')
      mutate(c, {
        onSuccess: () => {
          query.setQueryData<Collection[]>([collectionsCacheKey], oldState => [c, ...(oldState ?? [])])
          toast.success('Colleccion creada', { id: toastID })
          closemodal()
        },
        onError: error => {
          toast.error(error.message, { id: toastID })
        },
      })
    },
    [mutate, closemodal]
  )

  const updateCollection = React.useCallback(
    (c: Collection) => {
      const toastID = toast.loading('Actualizando collection...')
      mutateUpdate(c, {
        onSuccess: () => {
          query.setQueriesData<Collection[]>([collectionsCacheKey], oldState => {
            if (!oldState) return oldState
            return oldState.map(item => {
              if (item.id === c.id) return c
              return item
            })
          })
          query.setQueriesData<Collection>([singleCollectionCacheKey], old => {
            if (!old) return old
            return {
              ...old,
              name: c.name,
              description: c.description,
              not_before: c.not_before,
              time_out: c.time_out,
            }
          })
          toast.success('Collection actualizada', { id: toastID })
          closemodal()
        },
        onError: error => {
          toast.error(error.message, { id: toastID })
        },
      })
    },
    [mutateUpdate, closemodal]
  )

  const saveCollection = React.useCallback((c: Collection) => {
    if (collection) updateCollection(c)
    else insertCollection(c)
  }, [])

  return {
    register,
    wrapFormHandler: handleSubmit,
    errors,
    saveCollection,
    closemodal,
    loading: loadingInsert || loadingUpdate,
  }
}
