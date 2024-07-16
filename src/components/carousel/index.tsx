"use client"

import { Card } from "@/components/ui/card"
import useQuizStore from "@/state/zustand/quiz-store"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { useState } from "react"
import useMeasure from "react-use-measure"
import { renderQuestionnaire } from "./configuration"
import { Complete, Idle, Progress, Review } from "./controls"

const variants = {
  initial: (direction: number) => ({ x: `${110 * direction}%`, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${-110 * direction}%`, opacity: 0 }),
}

export default function Carousel() {
  const {
    questions,
    currentQuestionIndex,
    score,
    status,
    answerQuestion,
    resetQuiz,
  } = useQuizStore()

  const [direction, toggle] = useState<number>(0)
  const [ref, { height }] = useMeasure()

  const currentQuestion = questions[currentQuestionIndex]
  const handleAnswer = (answer: string) => answerQuestion(answer)
  const answers = currentQuestion?.incorrect_answers
    .concat(currentQuestion.correct_answer)
    .sort()

  const state = useQuizStore()
  console.log(state.questions)
  console.log(state.status)

  return (
    <Card>
      <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0 }}>
        <motion.div
          animate={{ height }}
          className="relative w-[480px] overflow-hidden"
        >
          <div className="p-6" ref={ref}>
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={currentQuestionIndex}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
              >
                {renderQuestionnaire({
                  status,
                  questions,
                  currentQuestionIndex,
                  handleAnswer,
                  answers,
                  score,
                  resetQuiz,
                })}
              </motion.div>
            </AnimatePresence>

            <motion.div layout className="between mt-9">
              {status === "idle" && <Idle toggle={toggle} />}
              {status === "progress" && (
                <Progress
                  questionNumber={currentQuestionIndex}
                  toggle={toggle}
                />
              )}
              {status === "review" && <Review toggle={toggle} />}
              {status === "complete" && <Complete />}
            </motion.div>
          </div>
        </motion.div>
      </MotionConfig>
    </Card>
  )
}
