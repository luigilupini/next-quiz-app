"use client"

import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { Controls, QuizResult } from "@/lib/definitions"
import useQuizStore from "@/state/zustand/quiz-store"
import { Joystick, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

type FooterProps = {
  isSettingsComplete: boolean
  isResultsComplete: boolean
  settings: Controls
  results: QuizResult[]
}

export default function Footer({
  isSettingsComplete,
  isResultsComplete,
  settings,
  results,
}: FooterProps) {
  const loadQuestions = useQuizStore((state) => state.loadQuestions)
  const router = useRouter()
  const audioFiles = "/sounds/coin.wav"

  const handleClick = () => {
    const audio = new Audio(audioFiles)
    audio.play()
    loadQuestions(results)
  }
  return (
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
            <Upload size={14} className="mr-1" />
            Update
          </Button>
          <Button
            variant="outline"
            disabled={isResultsComplete}
            onClick={handleClick}
          >
            <Joystick size={14} className="mr-1" />
            Start
          </Button>
        </div>
      </div>
    </SheetFooter>
  )
}
