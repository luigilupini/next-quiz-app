import { Button } from "@/components/ui/button"
import { Question } from "@/state/zustand/quiz-store"
import { MultipleChoice, RadioChoice, Review } from "./questionnaire"

type RenderQuestionnaireProps = {
  status: string
  questions: Question[]
  currentQuestionIndex: number
  handleAnswer: (answer: string) => void
  answers?: string[]
  score: number
  resetQuiz: () => void
}

export const renderQuestionnaire = ({
  status,
  questions,
  currentQuestionIndex,
  handleAnswer,
  answers,
  score,
  resetQuiz,
}: RenderQuestionnaireProps) => {
  const currentQuestion = questions[currentQuestionIndex]
  switch (status) {
    case "complete":
      return (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score: {score}</p>
          <Button onClick={resetQuiz}>Start New Quiz</Button>
        </div>
      )

    case "review":
      return questions.map((question, index) => (
        <Review
          key={index}
          question={question.question}
          userAnswer={question.user_answer || []}
          correctAnswer={[question.correct_answer]}
        />
      ))

    case "progress":
      if (currentQuestion) {
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
        } else {
          return (
            <RadioChoice
              currentQuestion={currentQuestionIndex + 1}
              question={currentQuestion.question}
              onAnswer={handleAnswer}
              userAnswer={currentQuestion.user_answer}
            />
          )
        }
      }
      return null
    default:
      return null
  }
}
