"use client"

import { MotionConfig, motion } from "framer-motion"
import { PropsWithChildren } from "react"
import useMeasure from "react-use-measure"

export default function MeasureWrapper({ children }: PropsWithChildren) {
  const [ref, { height }] = useMeasure()

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0 }}>
      <motion.div
        animate={{ height }}
        className="relative w-[480px] overflow-hidden"
      >
        <div className="p-6" ref={ref}>
          {children}
        </div>
      </motion.div>
    </MotionConfig>
  )
}
