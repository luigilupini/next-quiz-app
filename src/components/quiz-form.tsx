"use client"

import { Category, Controls, QuizResult } from "@/lib/definitions"
import { AnimatePresence } from "framer-motion"
import { Check, Info, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Message from "./message"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Slider } from "./ui/slider"
import SelectWrapper from "./wrapper/select"
import FieldWrapper from "./wrapper/slider"

type Props = {
  results: QuizResult[]
  categories: Category[]
  controls?: Controls
}

const defaultControls = {
  amount: "10",
  category: "1",
  difficulty: "easy",
  type: "multiple",
}

export default function QuizForm({
  results,
  categories,
  controls = defaultControls,
}: Props) {
  const [settings, setSettings] = useState({
    amount: controls.amount,
    category: controls.category,
    difficulty: controls.difficulty,
    type: controls.type,
  })
  const router = useRouter()

  const handleValueChange = (field: string) => (value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  const handleSliderChange = (field: string) => (value: number[]) => {
    const stringValue = value[0]?.toString()
    setSettings((prev) => ({
      ...prev,
      [field]: stringValue,
    }))
  }

  const isSettingsComplete =
    settings.amount !== undefined &&
    settings.category !== undefined &&
    settings.difficulty !== undefined &&
    settings.type !== undefined

  console.log(results)

  return (
    <Card className="w-[550px]">
      <CardHeader className="text-center">Question Settings</CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3 text-sm">
          <FieldWrapper label="Amount">
            <span className="center size-7 rounded-md border bg-background px-6 text-foreground">
              {settings.amount || 0}
            </span>
            <Slider
              defaultValue={[0]}
              min={1}
              max={20}
              step={1}
              value={settings.amount ? [parseInt(settings.amount)] : [0]}
              onValueChange={handleSliderChange("amount")}
            />
          </FieldWrapper>

          <FieldWrapper label="Category">
            <SelectWrapper
              value={settings.category}
              onValueChange={handleValueChange("category")}
              options={categories.map(({ id, name }) => ({
                value: id.toString(),
                label: name,
              }))}
              placeholder="Select a category"
            />
          </FieldWrapper>

          <FieldWrapper label="Difficulty">
            <SelectWrapper
              value={settings.difficulty}
              onValueChange={handleValueChange("difficulty")}
              options={[
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" },
              ]}
              placeholder="Select difficulty"
            />
          </FieldWrapper>

          <FieldWrapper label="Type">
            <SelectWrapper
              value={settings.type}
              onValueChange={handleValueChange("type")}
              options={[
                { value: "multiple", label: "Multiple Choice" },
                { value: "boolean", label: "True / False" },
              ]}
              placeholder="Select question type"
            />
          </FieldWrapper>
        </form>
      </CardContent>

      <CardFooter className="between flex-col gap-2">
        <div className="center ml-auto gap-2">
          <Button
            variant="outline"
            disabled={!isSettingsComplete}
            onClick={() =>
              router.push(
                `/?${new URLSearchParams(settings as Controls).toString()}`,
              )
            }
          >
            Search
          </Button>
          <Button variant="outline" disabled={!results || results.length === 0}>
            Start
          </Button>
        </div>

        <div className="center mr-auto gap-2">
          <AnimatePresence>
            {!isSettingsComplete && (
              <Message
                key="incomplete"
                icon={Info}
                title="Complete all settings to continue"
              />
            )}
            {!results || results.length === 0 ? (
              <Message
                key="no-results"
                icon={Search}
                title="No results found for this category"
              />
            ) : (
              <Message
                key="results-found"
                icon={Check}
                title={`Category with ${results.length} results found`}
              />
            )}
          </AnimatePresence>
        </div>
      </CardFooter>
    </Card>
  )
}
