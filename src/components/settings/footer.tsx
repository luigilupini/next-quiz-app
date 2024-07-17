import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { Upload } from "lucide-react"

export default function Footer() {
  return (
    <SheetFooter className="w-full">
      <div className="center mr-auto gap-2">
        <div className="center ml-auto gap-2">
          <Button variant="outline">
            <Upload size={14} className="mr-1" />
            Update
          </Button>
        </div>
      </div>
    </SheetFooter>
  )
}
