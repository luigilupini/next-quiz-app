import Delete from "@/components/delete"
import ConfigSheet from "@/components/settings"
import { ThemeToggle } from "@/components/theme-toggle"
import { Category } from "@/lib/definitions"

type Props = {
  trivia_categories: Category[]
}

export default function Header({ trivia_categories }: Props) {
  return (
    <>
      <Logo />
      <div className="center gap-2">
        <Delete />
        <ConfigSheet categories={trivia_categories} />
        <ThemeToggle />
      </div>
    </>
  )
}

function Logo() {
  return <h1 className="font-medium">QuizUp</h1>
}
