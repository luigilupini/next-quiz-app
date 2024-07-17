import { Badge } from "@/components/ui/badge"
import OpacityWrapper from "@/components/wrapper/opacity"
import { cn } from "@/lib/utils"
import useQuizStore from "@/state/zustand/quiz-store"
import { Check, Percent, X } from "lucide-react"
import { CompleteCtl } from "../controls"

export default function CompleteSlot() {
  const { questions, score } = useQuizStore((state) => ({
    questions: state.questions,
    score: state.score,
  }))

  const correctAnswersCount = questions.reduce((count, question) => {
    const userAnswer = question.user_answer?.join(", ")
    if (userAnswer === question.correct_answer) {
      return count + 1
    }
    return count
  }, 0)

  const percentage = ((correctAnswersCount / questions.length) * 100).toFixed()

  return (
    <OpacityWrapper className="flex flex-col gap-3 p-6">
      <header className="between mb-3">
        <h1 className="text-lg font-medium">Score</h1>
        <div className="center gap-2">
          <span>{score} points</span>
          <div className="center gap-1 rounded-md border px-2">
            {percentage} <Percent size={16} />
          </div>
        </div>
      </header>
      <div className="flex flex-wrap gap-1">
        {questions.map((question, index) => (
          <Complete
            key={index}
            question={question.question}
            userAnswer={question.user_answer || []}
            correctAnswer={question.correct_answer}
          />
        ))}
      </div>
      <nav className="between mt-6">
        <CompleteCtl />
      </nav>
    </OpacityWrapper>
  )
}

type CompleteProps = {
  question: string
  userAnswer: string[]
  correctAnswer: string
}

function Complete({ question, userAnswer, correctAnswer }: CompleteProps) {
  const displayUserAnswer = userAnswer.join(" / ")
  return (
    <div
      className={cn(
        "center flex-col items-start gap-1 rounded-md p-3 text-xs",
        {
          "bg-success/10 text-success": displayUserAnswer === correctAnswer,
          "bg-destructive/10 text-destructive":
            displayUserAnswer !== correctAnswer,
        },
      )}
      style={{ flex: "1 0 300px" }}
    >
      <h2>{question}</h2>
      <Badge
        className="center gap-1 rounded-md border px-2"
        variant={
          displayUserAnswer === correctAnswer
            ? "success"
            : ("destructive" as any)
        }
      >
        <span className="text-nowrap text-[11px]">
          {displayUserAnswer || "Empty field"}
        </span>
        {displayUserAnswer === correctAnswer ? (
          <Check size={15} />
        ) : (
          <X size={15} />
        )}
      </Badge>
    </div>
  )
}
