import { Input } from "@/components/ui/input"
import { mount } from "cypress/react18"

describe("Input Component", () => {
  it("should render with default props", () => {
    mount(<Input placeholder="Default Input" />)
    cy.get("input").should(
      "have.class",
      "flex h-7 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors",
    )
    cy.get("input").should("have.attr", "placeholder", "Default Input")
  })

  it("should render with additional className", () => {
    mount(<Input className="custom-class" />)
    cy.get("input").should("have.class", "custom-class")
  })

  it("should handle input correctly", () => {
    mount(<Input />)
    cy.get("input").type("Test input")
    cy.get("input").should("have.value", "Test input")
  })

  it("should render with different types", () => {
    mount(<Input type="password" />)
    cy.get("input").should("have.attr", "type", "password")

    mount(<Input type="email" />)
    cy.get("input").should("have.attr", "type", "email")
  })

  it("should render with disabled state", () => {
    mount(<Input disabled />)
    cy.get("input").should("be.disabled")
  })
})
