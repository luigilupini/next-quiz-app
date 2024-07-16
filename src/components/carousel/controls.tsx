"use client"

import { Button } from "@/components/ui/button"
import useQuizStore from "@/state/zustand/quiz-store"

type Props = {
  questionNumber?: number
  toggle: (dir: number) => void
}

export function Idle({ toggle }: Props) {
  const { nextQuestion } = useQuizStore((state) => ({
    nextQuestion: state.nextQuestion,
  }))

  const handleStart = () => {
    toggle(1)
    nextQuestion()
  }
  return (
    <Button variant="outline" onClick={handleStart}>
      Start
    </Button>
  )
}

export function Progress({ questionNumber = 0, toggle }: Props) {
  const { nextQuestion, previousQuestion, questions, reviewAnswers } =
    useQuizStore((state) => ({
      questions: state.questions,
      nextQuestion: state.nextQuestion,
      previousQuestion: state.previousQuestion,
      reviewAnswers: state.reviewAnswers,
    }))
  return (
    <>
      <Button
        variant="outline"
        disabled={questionNumber === 0}
        onClick={() => {
          if (questionNumber === 0) return
          toggle(-1)
          previousQuestion()
        }}
      >
        Back
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (questionNumber < questions.length - 1) {
            toggle(1)
            nextQuestion()
          } else {
            reviewAnswers()
          }
        }}
      >
        {questionNumber < questions.length - 1 ? "Next" : "Review"}
      </Button>
    </>
  )
}

export function Review({ toggle }: Props) {
  const { questions, nextQuestion, submitQuiz, loadQuestions } = useQuizStore(
    (state) => ({
      questions: state.questions,
      nextQuestion: state.nextQuestion,
      submitQuiz: state.submitQuiz,
      loadQuestions: state.loadQuestions,
    }),
  )
  const handleRestart = () => {
    toggle(1)
    nextQuestion()
    loadQuestions(questions)
  }
  return (
    <>
      <Button variant="outline" onClick={handleRestart}>
        Restart
      </Button>
      <Button variant="outline" onClick={() => submitQuiz()}>
        Submit
      </Button>
    </>
  )
}

export function Complete() {
  const { resetQuiz } = useQuizStore((state) => ({
    resetQuiz: state.resetQuiz,
  }))
  return (
    <Button variant="outline" onClick={() => resetQuiz()}>
      Reset
    </Button>
  )
}
