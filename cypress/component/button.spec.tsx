import { Button } from "@/components/ui/button"
import { mount } from "cypress/react18"

// Cypress Component Test
describe("Button Component", () => {
  it("should render with default props", () => {
    mount(<Button>Default Button</Button>)
    cy.get("button").should("have.class", "bg-primary text-primary-foreground")
    cy.get("button").should("contain.text", "Default Button")
  })

  it("should render with different variants", () => {
    mount(<Button variant="destructive">Destructive Button</Button>)
    cy.get("button").should(
      "have.class",
      "bg-destructive text-destructive-foreground",
    )

    mount(<Button variant="outline">Outline Button</Button>)
    cy.get("button").should("have.class", "border border-input bg-background")

    mount(<Button variant="secondary">Secondary Button</Button>)
    cy.get("button").should(
      "have.class",
      "bg-secondary text-secondary-foreground",
    )

    mount(<Button variant="warning">Warning Button</Button>)
    cy.get("button").should("have.class", "bg-warning text-warning-foreground")

    mount(<Button variant="ghost">Ghost Button</Button>)
    cy.get("button").should(
      "have.class",
      "hover:bg-accent hover:text-accent-foreground",
    )

    mount(<Button variant="link">Link Button</Button>)
    cy.get("button").should(
      "have.class",
      "text-primary underline-offset-4 hover:underline",
    )
  })

  it("should render with different sizes", () => {
    mount(<Button size="sm">Small Button</Button>)
    cy.get("button").should("have.class", "h-7 rounded-md px-3 text-xs")

    mount(<Button size="lg">Large Button</Button>)
    cy.get("button").should("have.class", "h-10 rounded-md px-8")

    mount(<Button size="icon">Icon Button</Button>)
    cy.get("button").should("have.class", "size-9")
  })

  it("should render as a different component if asChild is true", () => {
    mount(
      <Button asChild>
        <a href="#">Link styled as button</a>
      </Button>,
    )
    cy.get("a").should("have.class", "bg-primary text-primary-foreground")
    cy.get("a").should("contain.text", "Link styled as button")
  })
})
