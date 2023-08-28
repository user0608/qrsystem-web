import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ModalWrapperContext } from '../../../components/modal/ModalWrapper'
import { TemplateDetails } from '../../../models/collection'

const NUMTYPE = 'Ingrese un número'
const NUM_REQUIRED = 'Este campo no puede quedar vacío'
const MIN_WIDTH = 'El ancho mínimo es de 10mm'
const MAX_WIDTH = 'El ancho maximo es de 200mm'
const schema = yup.object().shape({
  item_width: yup.number().min(10, MIN_WIDTH).max(200, MAX_WIDTH).typeError(NUMTYPE).required(NUM_REQUIRED),
  qr_size: yup.number().typeError(NUMTYPE).required(),
  qr_x: yup.number().typeError(NUMTYPE).required(),
  qr_y: yup.number().typeError(NUMTYPE).required(),
})
const RESIZE_IMAGE = 920
export const useCollectionTemplateView = () => {
  const closemodal = useContext(ModalWrapperContext)
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
  return {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    errors,
    closemodal,
  }
}
