export type TemplateDetails = {
  item_width: number
  qr_size: number
  qr_x: number
  qr_y: number
}
export type Tag = {
  id: string
  name: string
  value: string
}
export type Collection = {
  id: string
  name: string
  description?: string
  time_out?: string
  not_before: string
  created_at: string
  num_tickets: number
  template_uuid: string
  template_details?: string
  documento_uuid: string
  document_process: '' | 'processing' | 'processed' | 'error'
  process_result: string
  tags?: Tag[]
}
