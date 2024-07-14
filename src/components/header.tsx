import Link from "next/link"
import { SheetDemo } from "./settings"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <>
      Trivia App
      <Button asChild>
        <Link href="/">Reset Btn</Link>
      </Button>
      <SheetDemo />
      <ThemeToggle />
    </>
  )
}
