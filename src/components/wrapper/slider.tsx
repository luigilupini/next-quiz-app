import { Slider } from "../ui/slider"

type Props = {
  label: string
  value?: number
  onValueChange: (value: number[]) => void
}

export default function SliderWrapper({ label, value, onValueChange }: Props) {
  return (
    <div className="flex h-7 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
      <label className="center basis-28 justify-start gap-1">{label}</label>
      <div className="center flex-1 gap-4">
        <span className="center w-7 rounded-md border bg-background px-6 text-foreground">
          {value || 0}
        </span>
        <Slider
          defaultValue={[0]}
          min={1}
          max={20}
          step={1}
          value={value ? [value] : [0]}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  )
}
