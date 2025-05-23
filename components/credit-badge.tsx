import { CreditCard } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CreditBadgeProps {
  credits: number
}

export function CreditBadge({ credits }: CreditBadgeProps) {
  const isLowBalance = credits <= 5

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/dashboard">
            <Button variant={isLowBalance ? "destructive" : "outline"} size="sm" className="gap-1.5 h-8">
              <CreditCard className="w-3.5 h-3.5" />
              <span>
                {credits} {credits === 1 ? "Credit" : "Credits"}
              </span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLowBalance ? "Low balance! Click to buy more credits" : "Your credit balance"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
