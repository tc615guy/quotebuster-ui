"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Lock, MapPin, MessageSquare, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CreditBadge } from "@/components/credit-badge"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const credits = 12 // Sample credit balance

  // Sample project data
  const project = {
    id: params.id,
    title: "Kitchen Renovation",
    description:
      "Complete kitchen renovation including new cabinets, countertops, appliances, and flooring. Looking for experienced contractors who can complete the work within 4 weeks.",
    category: "Kitchen",
    location: "Austin, TX",
    neighborhood: "Downtown",
    budget: "$15,000",
    status: "LIVE",
    timeRemaining: "68h 24m",
    images: [
      "/placeholder.svg?height=400&width=600&query=kitchen renovation main",
      "/placeholder.svg?height=400&width=600&query=kitchen cabinets",
      "/placeholder.svg?height=400&width=600&query=kitchen countertops",
      "/placeholder.svg?height=400&width=600&query=kitchen appliances",
    ],
    unlockCost: "1 credit",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4 mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="ml-4 text-xl font-bold">Project Details</h1>
          <div className="flex items-center ml-auto space-x-2">
            <CreditBadge credits={credits} />
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Image Gallery */}
          <div className="md:col-span-2">
            <div className="overflow-hidden bg-white border rounded-lg">
              <div className="relative aspect-video">
                <img
                  src={project.images[selectedImage] || "/placeholder.svg"}
                  alt={`${project.title} - Image ${selectedImage + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex p-2 overflow-x-auto gap-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge variant={project.status === "LIVE" ? "default" : "secondary"}>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location} {project.neighborhood && `(${project.neighborhood})`}
                </div>
                {project.status === "LIVE" && (
                  <div className="flex items-center text-sm text-orange-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Bidding ends in: {project.timeRemaining}</span>
                    <span className="ml-1 text-xs text-gray-500">(May 26, 2025 at 4:30 PM)</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium">Category:</span>
                  <span className="ml-2 text-sm">{project.category}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Budget:</span>
                  <span className="ml-2 text-sm">{project.budget}</span>
                </div>
                <p className="text-sm">{project.description}</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Unlock & Bid ({project.unlockCost})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Your Bid</DialogTitle>
                      <DialogDescription>This will cost {project.unlockCost} from your account.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="bid-amount">Your Bid Amount</label>
                        <Input id="bid-amount" placeholder="$" type="number" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="bid-message">Message to Client</label>
                        <Textarea id="bid-message" placeholder="Introduce yourself and explain your bid..." rows={4} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="bid-timeline">Estimated Timeline (days)</label>
                        <Input id="bid-timeline" placeholder="e.g. 30" type="number" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Bid</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Messaging Thread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6 text-center text-gray-500 border border-dashed rounded-md">
                  <div>
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Unlock this project to view and participate in the messaging thread</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500">
                  Only contractors who have unlocked this project can view and send messages
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
