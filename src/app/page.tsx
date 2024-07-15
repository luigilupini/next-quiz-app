import EmptyResult from "@/components/empty-results"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import ConfigSheet from "@/components/settings"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { SearchParams } from "@/lib/definitions"
import { getCategories, getQuiz } from "@/server/api"
import Link from "next/link"

type Props = {
  searchParams: SearchParams
}

export default async function HomePage({ searchParams }: Props) {
  const { trivia_categories } = await getCategories()
  const { results } = await getQuiz(searchParams)
  return (
    <GridBase layout="plain" className="size-full">
      <GridHeader className="between w-full border-b p-2">
        Trivia App
        <Button asChild>
          <Link href="/">Reset Btn</Link>
        </Button>
        <div className="center gap-2">
          <ConfigSheet
            results={results}
            categories={trivia_categories}
            controls={searchParams}
          />
          <ThemeToggle />
        </div>
      </GridHeader>
      <GridBody className="center rounded-none">
        {results.length > 0 ? (
          <div className="font-mono text-xs">{JSON.stringify(results)}</div>
        ) : (
          <EmptyResult />
        )}
      </GridBody>
      <GridFooter className="between border-t p-2">Footer Timer</GridFooter>
    </GridBase>
  )
}
