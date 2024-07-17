"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  className?: string
}>

export default function OpacityWrapper({ children, className }: Props) {
  return (
    <Card className={cn(className)}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.section>
    </Card>
  )
}
