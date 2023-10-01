import React, { useRef } from "react"
import { useInView } from "framer-motion"

export const TextScroll = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
      ></motion.div>
    </div>
  )
}
