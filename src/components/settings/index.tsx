"use client"

import { Category } from "@/lib/definitions"
import { Settings } from "lucide-react"
import { useRef } from "react"

import Icon from "@/components/icon"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

import { createQuiz } from "@/server/api"
import useQuizStore from "@/state/zustand/quiz-store"

import { playAudio } from "@/lib/utils"
import Body from "./body"
import Footer from "./footer"
import Header from "./header"

type Props = {
  categories: Category[]
}

export default function ConfigSheet({ categories }: Props) {
  const { toast } = useToast()

  const ref = useRef<HTMLFormElement>(null)

  const loadQuestions = useQuizStore((state) => state.loadQuestions)

  const handleAction = async (formData: FormData) => {
    const data = await createQuiz(formData)
    if (data.status === "error") {
      playAudio("/sounds/kick.wav")
      toast({
        variant: "warning",
        title: "Oops! Something went wrong",
        description: data.message,
      })
      return
    }
    if (data.status === "success") {
      playAudio("/sounds/coin.wav")
      loadQuestions(data.data)
      toast({
        variant: "success",
        title: "Success! Questions loaded",
        description: data.message,
      })
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="group animate-fade-left animate-normal animate-once animate-ease-out">
        <Icon icon={Settings} />
      </SheetTrigger>
      <SheetContent>
        <form
          ref={ref}
          action={handleAction}
          className="between h-full flex-col"
        >
          <Header />
          <Body categories={categories} />
          <Footer />
        </form>
      </SheetContent>
    </Sheet>
  )
}
