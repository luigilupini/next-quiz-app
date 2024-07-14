import Header from "@/components/header"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import { rubik } from "@/lib/typeface/fonts"
import { cn } from "@/lib/utils"
import ProviderTree from "@/state/context/provider-tree"
import "@/styles/globals.css"
import { PropsWithChildren } from "react"

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn("antialiased", rubik.className)}
      suppressHydrationWarning
    >
      <body className="w-scr een relative h-screen overflow-hidden bg-background text-foreground">
        <ProviderTree>
          <GridBase layout="plain" className="size-full">
            <GridHeader className="between w-full border-b p-2">
              <Header />
            </GridHeader>
            <GridBody className="center rounded-none">{children}</GridBody>
            <GridFooter className="between border-t p-2">
              Footer Timer
            </GridFooter>
          </GridBase>
        </ProviderTree>
      </body>
    </html>
  )
}
