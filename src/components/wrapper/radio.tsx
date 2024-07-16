import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type RadioGroupProps = {
  options: { label: string; value: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

export default function RadioGroupWrapper({
  options,
  selectedValue,
  onChange,
}: RadioGroupProps) {
  return (
    <RadioGroup value={selectedValue}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={option.value}
            onClick={() => onChange(option.value)}
          />
          <label
            htmlFor={option.value}
            className="cursor-pointer select-none text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup>
  )
}
