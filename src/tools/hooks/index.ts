import {
  useCallback,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from 'react'

/**
 *
 * The code inside useEvent sees the props/state values at the time of the.
 * Very handy for event listeners callbacks, as by default the have access to the state/props
 * value, at the time of the event listener creation.
 * This hook is inspired by this RFC: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 *
 */
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

/**
 *
 * A hook that forces a component to re-render. by calling"forceUpdate"
 * A callback to be executed after the component forced is re-rendered, can be passed with "afterForceUpdate"
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
    /**
     * Forces the component to re-render
     */
    forceUpdate,
    /**
     * Set a callback that is executed after the component is forced to re-render
     */
    afterForceUpdate,
  }
}
