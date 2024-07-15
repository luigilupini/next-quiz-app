"use client"

import { Category, Controls, QuizResult } from "@/lib/definitions"
import { AnimatePresence } from "framer-motion"
import { Check, Info, Search, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Message from "./message"
import SelectWrapper from "./wrapper/select"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SliderWrapper from "./wrapper/slider"

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
    <Sheet>
      <SheetTrigger
        asChild
        className="group animate-fade-left animate-normal animate-once animate-ease-out"
      >
        <button className="z-50 flex size-7 cursor-pointer items-center justify-center rounded-full border transition-all delay-75 duration-150 ease-in-out hover:bg-muted hover:text-muted-foreground">
          <Settings className="size-[1rem] animate-spin animate-normal animate-fill-both animate-once animate-ease-out" />
        </button>
      </SheetTrigger>
      <SheetContent className="between flex-col">
        <SheetHeader className="w-full">
          <SheetTitle>Edit settings</SheetTitle>
          <SheetDescription>
            Customize the quiz settings to your liking
          </SheetDescription>
        </SheetHeader>
        <form className="flex h-full w-full flex-col gap-3 text-sm">
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
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            placeholder="Select difficulty"
          />
          <SelectWrapper
            value={settings.type}
            onValueChange={handleValueChange("type")}
            options={[
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True / False" },
            ]}
            placeholder="Select question type"
          />
          <AnimatePresence>
            {!isSettingsComplete && (
              <Message
                key="incomplete"
                icon={Info}
                title="Complete all above settings to start"
              />
            )}
            {!results || results.length === 0 ? (
              <Message
                key="no-results"
                icon={Search}
                title="Clear your search and try again"
              />
            ) : (
              <Message
                key="results-found"
                icon={Check}
                title={`Category with ${results.length} results found`}
              />
            )}
          </AnimatePresence>
        </form>
        <SheetFooter className="w-full">
          <div className="center mr-auto gap-2">
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
              <Button
                variant="outline"
                disabled={!results || results.length === 0}
              >
                Start
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
