import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })

export const playAudio = (filePath: string) => {
  const audio = new Audio(filePath)
  audio.play()
}
