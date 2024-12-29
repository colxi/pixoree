import {
  useCallback,
  useRef,
  useState,
  useInsertionEffect,
  useEffect,
} from 'react'

// The useEvent API has not yet been added to React,
// so this is a temporary shim to make this work.
export function useEvent<T extends (...args: any[]) => void>(fn: T): T {
  const ref = useRef(fn)
  useInsertionEffect(() => {
    ref.current = fn
  }, [fn])
  return useCallback((...args: any[]) => {
    const f = ref.current
    return f(...args)
  }, []) as T
}

export const useLocalContext = <T extends Record<string, any>>(data: T): T => {
  const [ctx] = useState<T>(data)
  for (const key in data) ctx[key] = data[key]
  return ctx
}

/**
 *
 * A hook that forces a component to re-render.
 *
 */
export const useForceUpdate = () => {
  const [forceUpdateCount, setForceUpdateCount] = useState<number>(0)
  const afterUpdateCallback = useRef<(() => void) | null>(null)

  const afterForceUpdate = (callback: () => void) => {
    afterUpdateCallback.current = callback
  }

  const forceUpdate = useEvent(() => {
    const newValue = forceUpdateCount > 1000 ? 0 : forceUpdateCount + 1
    setForceUpdateCount(newValue)
  })

  useEffect(() => {
    if (!afterUpdateCallback.current) return
    afterUpdateCallback.current()
  }, [forceUpdateCount])

  return {
    forceUpdate,
    afterForceUpdate,
  }
}
