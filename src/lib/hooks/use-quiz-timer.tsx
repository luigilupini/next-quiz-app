"use client"

import useQuizStore from "@/state/zustand/quiz-store"
import { useEffect } from "react"

const useQuizTimer = () => {
  const { status, decrementTimer } = useQuizStore((state) => ({
    status: state.status,
    decrementTimer: state.decrementTimer,
  }))

  useEffect(() => {
    if (status !== "progress") return
    const interval = setInterval(() => {
      decrementTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [status, decrementTimer])
}

export default useQuizTimer
