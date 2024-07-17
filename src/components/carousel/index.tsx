"use client"

import useQuizStore from "@/state/zustand/quiz-store"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import MeasureWrapper from "@/components/wrapper/measure"
import OpacityWrapper from "@/components/wrapper/opacity"

import Controls from "./controls"
import CompleteSlot from "./slot/complete"
import EmptySlot from "./slot/empty"
import QuestionSlot from "./slot/questions"
import ReviewSlot from "./slot/review"

const variants = {
  initial: (direction: number) => ({ x: `${110 * direction}%`, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${-110 * direction}%`, opacity: 0 }),
}

export default function Carousel() {
  const [direction, setDirection] = useState<number>(0)

  const { currentQuestionIndex, status } = useQuizStore((state) => ({
    currentQuestionIndex: state.currentQuestionIndex,
    status: state.status,
  }))

  if (status === "idle") return <EmptySlot />
  if (status === "review") return <ReviewSlot />
  if (status === "complete") return <CompleteSlot />

  return (
    <OpacityWrapper>
      <MeasureWrapper>
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentQuestionIndex}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            <QuestionSlot />
          </motion.div>
        </AnimatePresence>

        <motion.div layout className="between mt-9">
          <Controls setDirection={setDirection} />
        </motion.div>
      </MeasureWrapper>
    </OpacityWrapper>
  )
}
