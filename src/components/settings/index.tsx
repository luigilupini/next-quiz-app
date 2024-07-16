"use client"

import { Category, Controls, QuizResult } from "@/lib/definitions"
import { Settings } from "lucide-react"
import { useState } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Icon from "../icon"
import Body from "./body"
import Footer from "./footer"
import Header from "./header"

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

export default function ConfigSheet({
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
  const isResultsComplete = results.length === 0

  return (
    <Sheet>
      <SheetTrigger className="group animate-fade-left animate-normal animate-once animate-ease-out">
        <Icon icon={Settings} />
      </SheetTrigger>
      <SheetContent className="between flex-col">
        <Header />
        <Body
          handleValueChange={handleValueChange}
          handleSliderChange={handleSliderChange}
          isSettingsComplete={isSettingsComplete}
          isResultsComplete={isResultsComplete}
          categories={categories}
          settings={settings}
          results={results}
        />
        <Footer
          isSettingsComplete={isSettingsComplete}
          isResultsComplete={isResultsComplete}
          settings={settings}
          results={results}
        />
      </SheetContent>
    </Sheet>
  )
}
