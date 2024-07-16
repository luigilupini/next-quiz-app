"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type IconProps = {
  icon: LucideIcon
  className?: string
}

export default function Icon({ icon: Icon, className }: IconProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: "easeInOut", duration: 0.05 }}
      className={cn(
        "z-50 flex size-7 cursor-pointer items-center justify-center rounded-full border transition-all delay-75 duration-150 ease-in-out hover:bg-muted hover:text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-[1rem] animate-spin animate-normal animate-fill-both animate-once animate-ease-out" />
    </motion.div>
  )
}
