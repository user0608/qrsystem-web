import { formaturl } from './utils/utils'
// export const API_URL_WS = formaturl(import.meta.env.VITE_API_URL)
//   .replace('http', 'ws')
//   .replace('https', 'wss')

export const API_URL = formaturl(import.meta.env.VITE_API_URL)

// export const STORAGE_SERVER_URL = formaturl(import.meta.env.VITE_STORAGE_SERVER_URL)

export const APITOKEN = localStorage.getItem('token')
