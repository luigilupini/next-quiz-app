import Carousel from "@/components/carousel"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import ConfigSheet from "@/components/settings"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCategories } from "@/server/api"
import { RefreshCcw } from "lucide-react"

export default async function HomePage() {
  const { trivia_categories } = await getCategories()
  return (
    <GridBase layout="plain" className="size-full">
      <GridHeader className="between w-full border-b p-2">
        Trivia App
        <div className="center gap-2">
          <RefreshCcw />
          <ConfigSheet categories={trivia_categories} />
          <ThemeToggle />
        </div>
      </GridHeader>
      <GridBody className="center rounded-none">
        <Carousel />
      </GridBody>
      <GridFooter className="between border-t p-2">Footer Timer</GridFooter>
    </GridBase>
  )
}
