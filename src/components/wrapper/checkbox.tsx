import { Checkbox } from "@/components/ui/checkbox"

type CheckboxProps = {
  options: string[]
  selectedValues: string[]
  onChange: (value: string) => void
}

export function CheckboxGroupWrapper({
  options,
  selectedValues,
  onChange,
}: CheckboxProps) {
  return (
    <div className="center flex-col items-start gap-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={selectedValues.includes(option)}
            onClick={() => onChange(option)}
          />
          <label
            htmlFor={option}
            className="cursor-pointer select-none text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}
