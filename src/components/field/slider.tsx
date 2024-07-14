"use client"

import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { InputHTMLAttributes } from "react"

type SharedProps = {
  defaultValue?: number
  value?: number
  min?: number
  max?: number
  onValueChange: (value: number[]) => void
}

type SliderProps = {} & SharedProps

type InputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement> &
  SharedProps

export default function SliderField({
  label,
  placeholder,
  defaultValue,
  type,
  min = 0,
  max = 100,
  onValueChange,
  onChange,
}: InputProps & SliderProps) {
  return (
    <article className="between py-[1px]">
      <label htmlFor={label} className="basis-24 text-left text-xs">
        {label}
      </label>
      <div className="center flex-1 gap-4">
        <Slider
          defaultValue={[defaultValue as number]}
          value={[defaultValue as number]}
          max={max}
          min={min}
          step={1}
          className="flex-1"
          onValueChange={onValueChange}
        />
        <Input
          id={label}
          type={type}
          min={min}
          max={max}
          className="basis-[66px] shadow-none"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={defaultValue}
          onChange={onChange}
        />
      </div>
    </article>
  )
}
