"use client"

import useQuizStore from "@/state/zustand/quiz-store"
import { Clock } from "lucide-react"
import MorphText from "./morph-text"

export default function Timer() {
  const { timeLeft } = useQuizStore((state) => ({
    timeLeft: state.timeLeft,
  }))
  const counter = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
  return (
    <div className="center gap-2">
      <Clock size={17} />
      <div className="center gap-[2px]">
        <MorphText uniqueKey="counter" text={counter} />
      </div>
    </div>
  )
}
