"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Bird } from "lucide-react"

export default function EmptySlot({ className }: { className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={cn("center mt-6 size-full flex-col gap-1", className)}
    >
      <Bird size={74} className="opacity-50" style={{ strokeWidth: 1 }} />
      <p className="center flex-col">
        <span className="font-medium">No active game found</span>
        <span className="text-center text-sm opacity-70">
          Please try again with different settings
        </span>
      </p>
    </motion.section>
  )
}
