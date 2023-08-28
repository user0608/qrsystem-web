import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { ModalWrapperContext } from '../../../components/modal/ModalWrapper'
import { collectionTemplateCacheKey, singleCollectionCacheKey } from '../../../keys'
import { Collection, TemplateDetails } from '../../../models/collection'
import { probarDocumentoService } from '../../../services/collection_download_service'
import { saveCollectionTemplate } from '../../../services/conllection_services'
import { transformMeasure as tfm } from '../../../utils/utils'
const NUMTYPE = 'Ingrese un número'
const NUM_REQUIRED = 'Este campo no puede quedar vacío'
const MIN_WIDTH = 'El ancho mínimo es de 10mm'
const MAX_WIDTH = 'El ancho maximo es de 200mm'
type Proporcion = {
  origen: number
  destino: number
}
const schema = yup.object().shape({
  item_width: yup.number().min(10, MIN_WIDTH).max(200, MAX_WIDTH).typeError(NUMTYPE).required(NUM_REQUIRED),
  qr_size: yup.number().typeError(NUMTYPE).required(),
  qr_x: yup.number().typeError(NUMTYPE).required(),
  qr_y: yup.number().typeError(NUMTYPE).required(),
})
const RESIZE_IMAGE = 920
type Response = { url: string; blob: Blob }
export const useRegisterTemplateView = (collectionuuid: string, templateDetails: string) => {
  const closemodal = useContext(ModalWrapperContext)
  const [testing, setTestingDocument] = useState(false)
  const [saving, setGuardarTemplateSate] = useState(false)
  const [imagen, setImage] = React.useState<Blob | null>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const imgBaseMeasure = React.useRef<Proporcion>({ destino: 1, origen: 1 })
  const query = useQueryClient()
  useEffect(() => {
    if (imageRef.current) {
      const data = query.getQueryData<Response>([collectionTemplateCacheKey, collectionuuid])
      if (!data) return
      imageRef.current.src = data.url
    }
  }, [imageRef.current])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<TemplateDetails, any>({
    resolver: yupResolver(schema),
  })

  const loadMeasures = (details: string) => {
    if (details) {
      const td = JSON.parse(details) as TemplateDetails
      setValue('item_width', td.item_width)
      setValue('qr_size', td.qr_size)
      setValue('qr_x', td.qr_x)
      setValue('qr_y', td.qr_y)
    }
  }

  useEffect(() => loadMeasures(templateDetails), [])
  const onLoadImage = async () => {
    if (!imageRef.current) return
    let resizeWidth: number | undefined
    let resizeHeight: number | undefined

    if (imageRef.current.clientWidth > imageRef.current.clientHeight) resizeWidth = 920
    else resizeHeight = 920
    const { width, height } = await createImageBitmap(imageRef.current)
    const bitmap = await createImageBitmap(imageRef.current, { resizeWidth, resizeHeight, resizeQuality: 'high' })
    if (resizeWidth) imgBaseMeasure.current = { origen: width, destino: imageRef.current.clientWidth }
    if (resizeHeight) imgBaseMeasure.current = { origen: height, destino: imageRef.current.clientHeight }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('bitmaprenderer')
    ctx?.transferFromImageBitmap(bitmap)
    canvas.toBlob(
      blob => {
        setImage(blob)
      },
      'image/jpeg',
      1
    )
  }
  const imageStyles = (): React.CSSProperties => {
    return {
      position: 'absolute',
      width: `${tfm(imgBaseMeasure.current.origen, imgBaseMeasure.current.destino, watch('qr_size', 40))}px`,
      height: `${tfm(imgBaseMeasure.current.origen, imgBaseMeasure.current.destino, watch('qr_size', 40))}px`,
      left: `${tfm(imgBaseMeasure.current.origen, imgBaseMeasure.current.destino, watch('qr_x', 0))}px`,
      top: `${tfm(imgBaseMeasure.current.origen, imgBaseMeasure.current.destino, watch('qr_y', 0))}px`,
    }
  }
  const restarqrlocation = (width: number) => {
    setValue('item_width', 90)
    setValue('qr_size', width ? width * 0.3 : 10)
    setValue('qr_x', width ? width * 0.1 : 5)
    setValue('qr_y', width ? width * 0.1 : 5)
  }
  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      if (imageRef.current) {
        const url = URL.createObjectURL(files[0])
        const { width } = await createImageBitmap(files[0])
        imageRef.current.src = url
        restarqrlocation(width)
      }
    }
  }
  const detailsResizedImage = () => {
    watch()
    return {
      item_width: getValues('item_width'),
      qr_size: tfm(imgBaseMeasure.current.origen, RESIZE_IMAGE, getValues('qr_size')),
      qr_x: tfm(imgBaseMeasure.current.origen, RESIZE_IMAGE, getValues('qr_x')),
      qr_y: tfm(imgBaseMeasure.current.origen, RESIZE_IMAGE, getValues('qr_y')),
    }
  }
  const handleTestDocument = async () => {
    const valid = await trigger()
    if (!valid || !imagen) {
      return
    }
    const toastID = toast.loading('Procesando...', { icon: '📥' })
    setTestingDocument(true)
    try {
      await probarDocumentoService(imagen, detailsResizedImage())
      toast.success('Prueba generada', { id: toastID })
    } catch (error) {
      toast.error((error as Error).message, { id: toastID })
    } finally {
      setTestingDocument(false)
    }
  }

  const { mutate } = useMutation<any, Error, { collectionuuid: string; blob: Blob; tdetails: TemplateDetails }>(
    saveCollectionTemplate
  )
  const handleFormSubmit = async () => {
    if (!imagen) return
    const tdetails = detailsResizedImage()
    const toastID = toast.loading('Guardando Template...')
    setGuardarTemplateSate(true)
    mutate(
      { collectionuuid, blob: imagen, tdetails },
      {
        onSuccess: () => {
          query.setQueryData<Response>([collectionTemplateCacheKey, collectionuuid], _ => ({
            url: URL.createObjectURL(imagen),
            blob: imagen,
          }))
          query.setQueryData<Collection>([singleCollectionCacheKey, collectionuuid], old => {
            if (!old) return
            const dt = { ...tdetails }
            dt.qr_size = Math.round(dt.qr_size)
            dt.qr_x = Math.round(dt.qr_x)
            dt.qr_y = Math.round(dt.qr_y)
            return { ...old, template_details: JSON.stringify(dt) }
          })
          toast.success('Template Guardado', { id: toastID })
          closemodal()
        },
        onError: error => toast.error(error.message, { id: toastID }),
        onSettled: () => setGuardarTemplateSate(false),
      }
    )
  }

  return {
    form: {
      register,
      handleSubmit,
      watch,
      setValue,
      getValues,
      trigger,
      errors,
    },
    imageStyles,
    handleFormSubmit,
    image: { onChange: onImageChange, imagebox: { imageref: imageRef, onLoad: onLoadImage } },
    imageblob: imagen,
    handleTestDocument,
    testing,
    saving,
    closemodal,
  }
}
