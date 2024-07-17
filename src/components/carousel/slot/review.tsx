import { Badge } from "@/components/ui/badge"
import OpacityWrapper from "@/components/wrapper/opacity"
import useQuizStore from "@/state/zustand/quiz-store"
import { Gift } from "lucide-react"
import { ReviewCtl } from "../controls"

export default function ReviewSlot() {
  const { questions } = useQuizStore((state) => ({
    questions: state.questions,
  }))

  return (
    <OpacityWrapper className="flex flex-col gap-3 p-6">
      <header className="between mb-3">
        <h1 className="text-lg font-medium">Review</h1>
        <div className="center gap-2">
          <span className="center gap-2">{questions.length} questions</span>
          <div className="center gap-1 rounded-md border px-2">
            {questions[0]?.type === "multiple" ? 10 : 5} <Gift size={16} />
          </div>
        </div>
      </header>
      <div className="flex flex-wrap gap-1">
        {questions.map((question, index) => (
          <Review
            key={index}
            question={question.question}
            userAnswer={question.user_answer || []}
          />
        ))}
      </div>
      <nav className="between mt-6">
        <ReviewCtl />
      </nav>
    </OpacityWrapper>
  )
}

type ReviewProps = {
  question: string
  userAnswer: string[]
}

function Review({ question, userAnswer }: ReviewProps) {
  const displayUserAnswer = userAnswer.join(" / ")
  return (
    <div
      className="center flex-col items-start gap-1 rounded-md bg-primary/10 p-3 text-xs text-primary"
      style={{ flex: "1 0 300px" }}
    >
      <h2>{question}</h2>
      <Badge className="center gap-1 rounded-md border px-2">
        {displayUserAnswer}
      </Badge>
    </div>
  )
}
