export type SearchParams = {
  id?: string
  query?: string
  search?: string
  name?: string
  page?: string
  sidebar?: string
  field?: string
  value?: string
  amount?: string
  category?: string
  difficulty?: string
  type?: string
}

export type Params = {
  id: string
  slug: string
  serverId: string
}

export type ServerProps = {
  params: Params
  searchParams: SearchParams
}

export type QuizResult = {
  type: "multiple" | "boolean"
  difficulty: "easy" | "medium" | "hard"
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type Category = {
  id: number
  name: string
}

export type Controls = {
  amount?: string
  category?: string
  difficulty?: string
  type?: string
}

export type QuizData = {
  results: QuizResult[]
  categories: Category[]
  controls: Controls
}
