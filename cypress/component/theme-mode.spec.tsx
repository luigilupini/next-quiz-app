import { ThemeToggle } from "@/components/theme-toggle"
import { mount } from "@cypress/react"
import { ThemeProvider } from "next-themes"

describe("ThemeToggle Component", () => {
  it("should render correctly", () => {
    mount(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )
    cy.get("button").should("exist")
    cy.get('svg[data-id="theme-toggle"]').should("exist")
  })
})
