import moment from 'moment'
import { Collection, Tag, TemplateDetails } from '../models/collection'
import { del, get, post, postForm, update } from './base2/http_methods'

export const findCollectionsService = (): Promise<Collection[]> => {
  return get('/collection')
}

export const insertCollectionService = (c: Collection) => {
  if (!c.not_before) c.not_before = moment().toJSON()
  return post('/collection', {
    id: c.id,
    name: c.name,
    description: c.description,
    not_before: moment(c.not_before).toJSON(),
    time_out: moment(c.time_out).toJSON(),
    num_tickets: c.num_tickets,
  })
}

export const updateCollectionService = (c: Collection) => {
  return update('/collection', {
    id: c.id,
    name: c.name,
    description: c.description,
    not_before: moment(c.not_before).toJSON(),
    time_out: moment(c.time_out).toJSON(),
  })
}

export const deleteCollectionService = (colectionUuid: string) => {
  return del(`/collection/${colectionUuid}`)
}

///

export const findCollectionService = async (collectionID: string): Promise<Collection> => {
  return get('/collection/' + collectionID)
}

export const generateDocumentService = async (collectionID: string) => {
  return get('/collection/document/generate/' + collectionID)
}

///
export const findCollectionTags = async (collectionID: string) => {
  return get('/collection/tags/' + collectionID)
}

export const registerTagService = async (collectionID: string, tag: Tag) => {
  return post('/collection/tags/' + collectionID, {
    id: tag.id,
    name: tag.name,
    value: tag.value,
  })
}
export const deleteTagService = async (tagID: string) => {
  return del('/collection/tag/' + tagID)
}

export const saveCollectionTemplate = async ({
  collectionuuid,
  blob,
  tdetails,
}: {
  collectionuuid: string
  blob: Blob
  tdetails: TemplateDetails
}) => {
  const form = new FormData()
  form.append('item_width', Math.round(tdetails.item_width).toString())
  form.append('qr_size', Math.round(tdetails.qr_size).toString())
  form.append('qr_x', Math.round(tdetails.qr_x).toString())
  form.append('qr_y', Math.round(tdetails.qr_y).toString())
  form.append('template', blob)
  return postForm(`collection/template/${collectionuuid}`, form)
}
