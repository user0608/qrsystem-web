import { TemplateDetails } from '../models/collection'
import { download, getBlob, postFormBlob } from './base2/htt_download'

export const findTemplateImageService = async (collectionID: string) => {
  const blob = await getBlob('collection/template/' + collectionID)
  const url = URL.createObjectURL(blob)
  return { url, blob }
}

export const downloadDocumentService = async (docuuid: string, controller: (n: number) => void) => {
  const blob = await download('collection/document/' + docuuid, controller)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${Date.now()}_${docuuid}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

export const probarDocumentoService = async (b: Blob, s: TemplateDetails) => {
  const form = new FormData()
  form.append('item_width', Math.round(s.item_width).toString())
  form.append('qr_size', Math.round(s.qr_size).toString())
  form.append('qr_x', Math.round(s.qr_x).toString())
  form.append('qr_y', Math.round(s.qr_y).toString())
  form.append('template', b)
  const blob = await postFormBlob('collection/document/test', form)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${Date.now()}_prueba.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
