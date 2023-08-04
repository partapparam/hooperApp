import { debounce } from "lodash"
import { useRef, useEffect, useMemo } from "react"

export const useDebounce = (callback) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = callback
  }, [callback])

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current()
    }
    return debounce(func, 500)
  }, [])

  return debouncedCallback
}
