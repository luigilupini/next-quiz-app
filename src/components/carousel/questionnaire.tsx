import { Badge } from "@/components/ui/badge"
import { CheckboxGroupWrapper } from "@/components/wrapper/checkbox"
import RadioGroupWrapper from "@/components/wrapper/radio"
import { PropsWithChildren } from "react"

type RadioProps = {
  currentQuestion: number
  question: string
  userAnswer?: string[]
  onAnswer: (answer: string) => void
}

const radioOptions = [
  { label: "True", value: "True" },
  { label: "False", value: "False" },
]

export function RadioChoice({
  currentQuestion,
  question,
  userAnswer = [],
  onAnswer,
}: RadioProps) {
  const selectedAnswer = userAnswer[0] || "none"

  return (
    <Container currentQuestion={currentQuestion} question={question}>
      <RadioGroupWrapper
        options={radioOptions}
        selectedValue={selectedAnswer}
        onChange={onAnswer}
      />
    </Container>
  )
}

type MultipleProps = {
  currentQuestion: number
  question: string
  answers?: string[]
  userAnswer?: string[]
  onAnswer: (answer: string) => void
}

export function MultipleChoice({
  currentQuestion,
  question,
  answers = [],
  userAnswer = [],
  onAnswer,
}: MultipleProps) {
  const selectedAnswers = Array.isArray(userAnswer) ? userAnswer : []

  return (
    <Container currentQuestion={currentQuestion} question={question}>
      <CheckboxGroupWrapper
        options={answers}
        selectedValues={selectedAnswers}
        onChange={onAnswer}
      />
    </Container>
  )
}

type ReviewProps = {
  question: string
  userAnswer: string[]
  correctAnswer: string[]
}

export function Review({ question, userAnswer, correctAnswer }: ReviewProps) {
  const displayUserAnswer = userAnswer.join(", ")
  return (
    <div className="ping">
      <h2>{question}</h2>
      <p>Your answer: {displayUserAnswer}</p>
    </div>
  )
}

type ContainerProps = PropsWithChildren<{
  currentQuestion: number
  question: string
}>

const Container = ({ currentQuestion, question, children }: ContainerProps) => {
  return (
    <div className="relative flex flex-col gap-3">
      <header>
        <Badge className="center mr-2 size-6 rounded-full">
          {currentQuestion}
        </Badge>
        <span className="font-medium">{question}</span>
      </header>
      <div className="center flex-col items-start gap-2">{children}</div>
    </div>
  )
}
