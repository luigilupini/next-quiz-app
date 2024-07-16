import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type MessageProps = {
  icon: LucideIcon
  title: string
  type?: "success" | "error" | "warning"
}

export default function Message({ icon: Icon, title, type }: MessageProps) {
  return (
    <motion.div
      layout
      className={cn(
        "center h-6 w-fit gap-1 rounded-md border px-2 text-[11px] font-normal",
        {
          "bg-success/5 border-success text-success": type === "success",
          "border-destructive bg-destructive/5 text-destructive":
            type === "error",
          "border-warning bg-warning/5 text-warning": type === "warning",
        },
      )}
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 5 }}
    >
      <Icon size={13} />
      <span>{title}</span>
    </motion.div>
  )
}
