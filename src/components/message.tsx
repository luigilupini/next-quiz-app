import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type MessageProps = {
  icon: LucideIcon
  title: string
}

export default function Message({ icon: Icon, title }: MessageProps) {
  return (
    <motion.div
      layout
      className="center h-6 gap-1 rounded-md border px-2 text-[11px] font-normal"
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 5 }}
    >
      <Icon size={14} />
      <span>{title}</span>
    </motion.div>
  )
}
