import React, { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, easeIn } from "framer-motion"

/**
 * Prop Types
 * children: JSX.Element
 * width?: "fit-content" | '100%'
 */

export const Reveal = ({ children, width }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    console.log(isInView)
    if (isInView) {
      //   fire the anitmation
      slideControls.start("visible")

      mainControls.start("visible")
    }
  }, [isInView])

  return (
    <div ref={ref} className={`${width} relative overflow-hidden `}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-4 bottom-4 left-0 right-0 bg-green-400 z-20"
      />
    </div>
  )
}
