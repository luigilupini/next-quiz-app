import useQuizStore from "@/state/zustand/quiz-store"
import { useMemo } from "react"
import { MultipleChoice, RadioChoice } from "../question"

export default function QuestionSlot() {
  const { questions, currentQuestionIndex, answerQuestion } = useQuizStore()

  const currentQuestion = questions[currentQuestionIndex]

  const answers = useMemo(() => {
    if (!currentQuestion) return []
    return [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort()
  }, [currentQuestion])

  const handleAnswer = (answer: string) => answerQuestion(answer)

  if (!currentQuestion) return null

  if (currentQuestion.type === "multiple") {
    return (
      <MultipleChoice
        currentQuestion={currentQuestionIndex + 1}
        question={currentQuestion.question}
        answers={answers}
        onAnswer={handleAnswer}
        userAnswer={currentQuestion.user_answer}
      />
    )
  }

  return (
    <RadioChoice
      currentQuestion={currentQuestionIndex + 1}
      question={currentQuestion.question}
      onAnswer={handleAnswer}
      userAnswer={currentQuestion.user_answer}
    />
  )
}
