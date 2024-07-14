"use client"

import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

export default function Template({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="size-full"
    >
      {children}
    </motion.div>
  )
}
