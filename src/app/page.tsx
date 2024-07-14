import QuizForm from "@/components/quiz-form"
import { SearchParams } from "@/lib/definitions"
import { getCategories, getQuiz } from "@/server/api"

type Props = {
  searchParams: SearchParams
}

export default async function HomePage({ searchParams }: Props) {
  const { trivia_categories } = await getCategories()
  const { results } = await getQuiz(searchParams)
  return (
    <main className="center size-full">
      <QuizForm
        results={results}
        categories={trivia_categories}
        controls={searchParams}
      />
    </main>
  )
}
