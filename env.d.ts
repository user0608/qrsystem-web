interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_STORAGE_SERVER_URL: string
}

// eslint-disable-next-line
interface ImportMeta {
  readonly env: ImportMetaEnv
}
