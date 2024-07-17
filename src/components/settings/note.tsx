import useQuizStore from "@/state/zustand/quiz-store"
import { motion } from "framer-motion"

export default function ActiveNote() {
  const { questions, status } = useQuizStore((state) => ({
    questions: state.questions,
    status: state.status,
  }))

  if (!questions.length) return null

  const { category, difficulty } = questions[0] || {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
      className="mb-24 flex flex-col rounded-md border border-dashed border-success/50 p-2"
    >
      <h3 className="font-bold">
        Game {`${status === "complete" ? "" : " in "}`}
        <span className="capitalize">{status}</span>
      </h3>
      <p className="mt-1 text-xs opacity-80">
        A <span className="font-medium text-success">{category}</span> category
        is active with a total of{" "}
        <span className="font-medium text-success">{questions.length}</span>{" "}
        questions loaded and set to a{" "}
        <span className="font-medium text-success">{difficulty}</span>{" "}
        difficulty.
      </p>
    </motion.div>
  )
}
