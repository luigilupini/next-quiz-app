import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export default function Header() {
  return (
    <SheetHeader className="w-full">
      <SheetTitle>Edit settings</SheetTitle>
      <SheetDescription>
        Customize the quiz settings to your liking
      </SheetDescription>
    </SheetHeader>
  )
}
