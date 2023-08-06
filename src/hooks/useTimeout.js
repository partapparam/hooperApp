import React, { useEffect, useRef } from "react"

export const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    // Passed in Ref to callback. If new callback, it will be saved to savedCallback.
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
