"use client"

import { Facebook, Link2, Share2, Twitter } from "lucide-react"
import { toast } from "sonner"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface ShareMenuProps {
  projectId: string
  projectTitle: string
}

export function ShareMenu({ projectId, projectTitle }: ShareMenuProps) {
  const projectUrl = `${window.location.origin}/project/${projectId}`

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      projectUrl,
    )}&quote=${encodeURIComponent(`Check out this project on QuoteBuster.fun: ${projectTitle}`)}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      projectUrl,
    )}&text=${encodeURIComponent(`Check out this project on QuoteBuster.fun: ${projectTitle}`)}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(projectUrl)
    toast.success("Link copied to clipboard!")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          <span>Share to Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          <span>Share to Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
