import { create, StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type Question = {
  type: "multiple" | "boolean"
  difficulty: "easy" | "medium" | "hard"
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  user_answer?: string[]
}

type QuizState = {
  questions: Question[]
  currentQuestionIndex: number
  score: number
  status: "idle" | "progress" | "review" | "complete"
  gamesPlayed: number
  totalScore: number
  timeLeft: number
  loadQuestions: (questions: Question[]) => void
  answerQuestion: (answer: string) => void
  nextQuestion: () => void
  previousQuestion: () => void
  reviewAnswers: () => void
  submitQuiz: () => void
  resetQuiz: () => void
  decrementTimer: () => void
  deleteQuiz: () => void
}

const createQuizSlice: StateCreator<QuizState> = (set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: "idle",
  gamesPlayed: 0,
  totalScore: 0,
  timeLeft: 0,
  loadQuestions: (questions) =>
    set({
      questions: questions.map((q) => ({ ...q })),
      currentQuestionIndex: 0,
      score: 0,
      status: "progress",
      timeLeft: questions.length * 60, // 1 minute per question
    }),
  answerQuestion: (answer: string) =>
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex]
      if (!currentQuestion) return {}

      const points = currentQuestion.type === "multiple" ? 10 : 5
      const isCorrect = currentQuestion.correct_answer === answer

      let updatedAnswers: string[]

      switch (currentQuestion.type) {
        case "multiple":
          const previousAnswers = currentQuestion.user_answer || []
          updatedAnswers = previousAnswers.includes(answer)
            ? previousAnswers.filter((ans) => ans !== answer)
            : [...previousAnswers, answer]
          break
        case "boolean":
          updatedAnswers = [answer]
          break
      }

      const updatedQuestions = [...state.questions]
      updatedQuestions[state.currentQuestionIndex] = {
        ...currentQuestion,
        user_answer: updatedAnswers,
      }

      const wasPreviouslyCorrect = currentQuestion.user_answer
        ? currentQuestion.user_answer.includes(currentQuestion.correct_answer)
        : false

      const scoreAdjustment = isCorrect
        ? !wasPreviouslyCorrect
          ? points
          : 0
        : wasPreviouslyCorrect
          ? -points
          : 0

      return {
        questions: updatedQuestions,
        score: state.score + scoreAdjustment,
      }
    }),
  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1
      if (nextIndex >= state.questions.length) return { status: "review" }
      return { currentQuestionIndex: nextIndex }
    }),
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),
  reviewAnswers: () => set({ status: "review" }),
  submitQuiz: () =>
    set((state) => ({
      status: "complete",
      gamesPlayed: state.gamesPlayed + 1,
      totalScore: state.totalScore + state.score,
    })),
  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      status: "idle",
      timeLeft: 0,
    }),
  decrementTimer: () =>
    set((state) => {
      if (state.timeLeft <= 0 && state.status === "progress") {
        return { status: "review" }
      }
      return {
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      }
    }),
  deleteQuiz: () => {
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      totalScore: 0,
      gamesPlayed: 0,
      status: "idle",
      timeLeft: 0,
    })
    localStorage.removeItem("quiz-storage")
  },
})

const useQuizStore = create(
  devtools(persist(createQuizSlice, { name: "quiz-storage" })),
)

export default useQuizStore
