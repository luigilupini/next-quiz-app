"use client"

import Icon from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Trash } from "lucide-react"
import { useState } from "react"

import useQuizStore from "@/state/zustand/quiz-store"

export default function Delete() {
  const [checked, setChecked] = useState(false)
  const { gamesPlayed, deleteQuiz } = useQuizStore((state) => ({
    gamesPlayed: state.gamesPlayed,
    deleteQuiz: state.deleteQuiz,
  }))

  const handleClose = () => setChecked(false)

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogTrigger asChild>
        <button>
          <Icon icon={Trash} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription className="text-sm">
            You are about to delete all history of {gamesPlayed} games played.
          </DialogDescription>
        </DialogHeader>
        <section className="center gap-2">
          <div className="flex-1 rounded-md border border-border/50 px-2 py-[2px] transition-all duration-300 hover:border-primary/100">
            <label
              htmlFor="confirm-deletion"
              className={cn(
                "flex cursor-pointer place-items-center gap-2 py-1 text-xs font-normal leading-none opacity-60",
                { "text-primary opacity-100": checked },
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                id="confirm-deletion"
                checked={checked}
                className={cn("border-foreground", {
                  "border-primary": checked,
                })}
                onCheckedChange={() => setChecked(!checked)}
              />
              Please confirm the deletion
            </label>
          </div>
          <Button
            type="button"
            variant="default"
            disabled={!checked}
            onClick={() => {
              deleteQuiz()
              handleClose()
            }}
          >
            Delete
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  )
}
