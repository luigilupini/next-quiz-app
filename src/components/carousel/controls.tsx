import { Button } from "@/components/ui/button"
import useQuizStore from "@/state/zustand/quiz-store"

type ControlProps = {
  setDirection: (direction: number) => void
}

export default function Controls({ setDirection }: ControlProps) {
  const { status } = useQuizStore((state) => ({
    status: state.status,
  }))
  if (status === "progress") return <ProgressCtl setDirection={setDirection} />
  if (status === "complete") return <CompleteCtl />
  return null
}

export const ProgressCtl = ({ setDirection }: ControlProps) => {
  const {
    currentQuestionIndex,
    nextQuestion,
    previousQuestion,
    questions,
    reviewAnswers,
  } = useQuizStore((state) => ({
    currentQuestionIndex: state.currentQuestionIndex,
    nextQuestion: state.nextQuestion,
    previousQuestion: state.previousQuestion,
    questions: state.questions,
    reviewAnswers: state.reviewAnswers,
  }))

  return (
    <>
      <Button
        variant="outline"
        disabled={currentQuestionIndex === 0}
        onClick={() => {
          if (currentQuestionIndex === 0) return
          setDirection(-1)
          previousQuestion()
        }}
      >
        Back
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (currentQuestionIndex < questions.length - 1) {
            setDirection(1)
            nextQuestion()
          } else {
            reviewAnswers()
          }
        }}
      >
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Review"}
      </Button>
    </>
  )
}

export const ReviewCtl = () => {
  const { submitQuiz } = useQuizStore((state) => ({
    submitQuiz: state.submitQuiz,
  }))
  return (
    <>
      <Button variant="outline" onClick={() => submitQuiz()}>
        Submit Results
      </Button>
    </>
  )
}

export const CompleteCtl = () => {
  const { resetQuiz } = useQuizStore((state) => ({
    resetQuiz: state.resetQuiz,
  }))
  return (
    <>
      <Button variant="outline" onClick={() => resetQuiz()}>
        End Quiz
      </Button>
    </>
  )
}
