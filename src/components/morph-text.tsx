"use client"

import { AnimatePresence, motion } from "framer-motion"

type Props = {
  uniqueKey: string
  text: string | string[] | undefined
}

export default function MorphText({ uniqueKey, text }: Props) {
  const generateKeys = (text: string) => {
    if (typeof text !== "string" || text.length < 0) return []
    const charCount: { [key: string]: number } = {}
    return text.split("").map((char) => {
      if (!charCount[char]) charCount[char] = 0
      const key = `${char}-${charCount[char]}`
      charCount[char]++
      return { key, char }
    })
  }
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {generateKeys(text as string).map(({ key, char }) => (
        <motion.span
          key={`${uniqueKey}-${key}`}
          layoutId={`${uniqueKey}-${key}`}
          className="inline-block text-inherit"
          initial={{ opacity: 0.25, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.25,
            type: "spring",
            bounce: 0,
            opacity: { duration: 0.35, type: "spring", bounce: 0 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </AnimatePresence>
  )
}
