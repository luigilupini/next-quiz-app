"use client"

import Message from "@/components/message"
import SelectWrapper from "@/components/wrapper/select"
import SliderWrapper from "@/components/wrapper/slider"
import { Category, Controls, QuizResult } from "@/lib/definitions"
import { AnimatePresence } from "framer-motion"
import { Check, HelpCircle } from "lucide-react"

type Props = {
  results: QuizResult[]
  categories: Category[]
  controls?: Controls
  settings: Controls
  isSettingsComplete: boolean
  isResultsComplete: boolean
  handleSliderChange: (field: string) => (value: number[]) => void
  handleValueChange: (field: string) => (value: string) => void
}

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

const typeOptions = [
  { value: "multiple", label: "Multiple Choice" },
  { value: "boolean", label: "True / False" },
]

export default function Body({
  results,
  categories,
  settings,
  isSettingsComplete,
  isResultsComplete,
  handleSliderChange,
  handleValueChange,
}: Props) {
  return (
    <form className="mt-2 flex h-full w-full flex-col gap-2 text-sm">
      <SliderWrapper
        label="Amount"
        value={settings.amount ? parseInt(settings.amount) : 0}
        onValueChange={handleSliderChange("amount")}
      />
      <SelectWrapper
        value={settings.category}
        onValueChange={handleValueChange("category")}
        options={categories.map(({ id, name }) => ({
          value: id.toString(),
          label: name,
        }))}
        placeholder="Select a category"
      />
      <SelectWrapper
        value={settings.difficulty}
        onValueChange={handleValueChange("difficulty")}
        options={difficultyOptions}
        placeholder="Select difficulty"
      />
      <SelectWrapper
        value={settings.type}
        onValueChange={handleValueChange("type")}
        options={typeOptions}
        placeholder="Select question type"
      />
      <div className="mt-4 flex flex-col gap-2">
        <AnimatePresence>
          {!isSettingsComplete && (
            <Message
              key="incomplete"
              icon={HelpCircle}
              title="Complete the above fields to continue"
              type="warning"
            />
          )}
          {isResultsComplete ? (
            <Message
              key="no-results"
              icon={HelpCircle}
              title="Search for available categories"
              type="warning"
            />
          ) : (
            <Message
              key="results-found"
              icon={Check}
              title={`Category with ${results.length} questions ready`}
              type="success"
            />
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
