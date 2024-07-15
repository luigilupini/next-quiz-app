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
        <ProviderTree>{children}</ProviderTree>
      </body>
    </html>
  )
}
