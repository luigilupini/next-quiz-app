import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  label: string
}>

export default function FieldWrapper({ label, children }: Props) {
  return (
    <div className="center">
      <label className="center basis-28 justify-start gap-1 opacity-80">
        {label}
      </label>
      <div className="center flex-1 gap-4">{children}</div>
    </div>
  )
}
