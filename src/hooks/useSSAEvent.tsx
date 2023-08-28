import { useContext, useEffect } from 'react'
import { Listener, SSEContext } from 'react-hooks-sse'

export function useSSEListener<T>(eventName: string, handle: (data: T) => void) {
  const source = useContext(SSEContext)
  if (!source) {
    throw new Error('Could not find an SSE context; You have to wrap useSSE() in a <SSEProvider>.')
  }
  useEffect(() => {
    const listener: Listener = event => {
      const data = JSON.parse(event.data)
      handle(data)
    }
    source.addEventListener(eventName, listener)
    return () => {
      source.removeEventListener(eventName, listener)
    }
  }, [])
}
