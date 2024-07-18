"use client"

import SelectWrapper from "@/components/wrapper/select"
import SliderWrapper from "@/components/wrapper/slider"
import { Category } from "@/lib/definitions"
import qs from "query-string"
import { useState } from "react"

type Props = {
  categories: Category[]
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

const defaultControls = {
  amount: "0",
  category: "",
  difficulty: "",
  type: "",
}

export default function Body({ categories }: Props) {
  const [settings, setSettings] = useState({
    ...defaultControls,
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

  const categoryOptions = categories.map(({ id, name }) => ({
    value: id.toString(),
    label: name,
  }))

  return (
    <section
      className="mt-2 flex h-full w-full flex-col gap-2 text-sm"
      data-id="open-sidebar-content"
    >
      <SliderWrapper
        label="Amount"
        value={parseInt(settings.amount)}
        onValueChange={handleSliderChange("amount")}
      />
      <SelectWrapper
        value={settings.category}
        onValueChange={handleValueChange("category")}
        options={categoryOptions}
        placeholder="Select a category"
      />
      <SelectWrapper
        value={settings.difficulty}
        onValueChange={handleValueChange("difficulty")}
        options={difficultyOptions}
        placeholder="Select difficulty"
      />
      <SelectWrapper
        value={settings.type || ""}
        onValueChange={handleValueChange("type")}
        options={typeOptions}
        placeholder="Select question type"
      />
      <input type="hidden" name="settings" value={qs.stringify(settings)} />
    </section>
  )
}
