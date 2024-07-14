import create from "zustand"

interface Question {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface QuizState {
  questions: Question[]
  currentQuestionIndex: number
  score: number
  status: "idle" | "loading" | "failed"
  loadQuestions: (questions: Question[]) => void
  answerQuestion: (answer: string) => void
  resetQuiz: () => void
}

const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: "idle",
  loadQuestions: (questions) =>
    set({ questions, status: "idle", currentQuestionIndex: 0, score: 0 }),
  answerQuestion: (answer: string) =>
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex]
      const isCorrect = currentQuestion?.correct_answer === answer
      const points = currentQuestion?.type === "multiple" ? 10 : 5
      return {
        score: isCorrect ? state.score + points : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }
    }),
  resetQuiz: () =>
    set({ questions: [], currentQuestionIndex: 0, score: 0, status: "idle" }),
}))

export default useQuizStore
