import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function RootError() {
  return (
    <main className="center size-full">
      <Card className="relative px-4">
        <CardHeader>
          <CardTitle className="font-mono text-2xl">404 error</CardTitle>
          <CardDescription className="pt-1 prose-p:mt-1">
            Sorry we not sure how you got here,
            <br />
            <p>Let&apos;s you get back on track:</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="flex gap-3">
            <Button asChild size="sm" variant="link" className="px-0">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
