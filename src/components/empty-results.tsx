"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Bird } from "lucide-react"

export default function EmptyResult({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={cn("center size-full flex-col gap-1", className)}
    >
      <Bird size={64} />
      <p className="center flex-col">
        <span className="font-medium opacity-80">No results found</span>
        <span className="text-center text-sm opacity-60">
          Please try again with different settings
        </span>
      </p>
    </motion.div>
  )
}
