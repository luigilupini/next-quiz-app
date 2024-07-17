import Carousel from "@/components/carousel"
import Header from "@/components/header"
import Information from "@/components/information"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import Timer from "@/components/timer"
import { getCategories } from "@/server/api"

export default async function HomePage() {
  const { trivia_categories } = await getCategories()
  return (
    <GridBase layout="plain" className="size-full">
      <GridHeader className="between w-full border-b p-2">
        <Header trivia_categories={trivia_categories} />
      </GridHeader>
      <GridBody className="center rounded-none">
        <Carousel />
      </GridBody>
      <GridFooter className="between border-t p-2">
        <Timer />
        <Information />
      </GridFooter>
    </GridBase>
  )
}
