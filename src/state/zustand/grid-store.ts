import styles from "@/styles/grid.module.css"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export type LayoutType = "plain" | "basic" | "aside" | "balanced" | "editor"

type LayoutStyles = {
  base?: string
  header?: string
  body?: string
  footer?: string
  aside?: string
  start?: string
  end?: string
}

type LayoutState = {
  layout: LayoutType
  layoutStyles: LayoutStyles
  setLayout: (layout: LayoutType) => void
}

const getLayoutStyles = (layout: LayoutType): LayoutStyles => ({
  base: styles[layout],
  header: styles[`${layout}_header`],
  body: styles[`${layout}_body`],
  footer: styles[`${layout}_footer`],
  aside: styles[`${layout}_aside`],
  end: styles[`${layout}_end`],
  start: styles[`${layout}_start`],
})

const createLayoutSlice: StateCreator<LayoutState> = (set, get) => ({
  layout: "basic",
  layoutStyles: getLayoutStyles("basic"),
  setLayout: (layout: LayoutType) =>
    set({
      layout,
      layoutStyles: getLayoutStyles(layout),
    }),
})

const useLayoutStore = create(devtools(createLayoutSlice, "LayoutStore" as any))

export default useLayoutStore
