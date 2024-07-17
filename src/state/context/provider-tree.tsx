"use client"

import { Toaster } from "@/components/ui/toaster"
import ThemeProvider from "@/state/context/leaf/theme"
import { PropsWithChildren } from "react"

export default function ProviderTree({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
