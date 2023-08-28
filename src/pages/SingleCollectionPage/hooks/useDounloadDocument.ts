import { useState } from 'react'
import { downloadDocumentService } from '../../../services/collection_download_service'
import { toast } from 'react-hot-toast'

export const useDounloadDocument = () => {
  const [progress, setProgress] = useState(0)
  const [downloading, setDownloading] = useState(false)
  const handleDowloadPDF = async (uuid: string) => {
    toast('Inciando descarga', { icon: '📥' })
    try {
      setDownloading(true)
      await downloadDocumentService(uuid, n => setProgress(n))
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setProgress(0)
      setDownloading(false)
    }
  }
  return { handleDowloadPDF, progress, downloading }
}
