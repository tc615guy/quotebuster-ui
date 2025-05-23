"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Home, Lock, Plus, User, Clock, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CreditBadge } from "@/components/credit-badge"
import { ShareMenu } from "@/components/share-menu"
import { serviceCategories } from "@/lib/service-categories"
import { SimpleDropdown } from "@/components/ui/simple-dropdown"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function HomePage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const credits = 12 // Sample credit balance
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Sample project data - Updated to match service category values
  const projects = [
    {
      id: "1",
      title: "Kitchen Renovation",
      image: "/placeholder.svg?height=200&width=300&query=kitchen renovation",
      location: "Austin, TX",
      quote: "$15,000",
      status: "LIVE",
      category: "kitchen",
      categoryLabel: "Kitchen",
      timeRemaining: "2 days",
    },
    {
      id: "2",
      title: "Bathroom Remodel",
      image: "/placeholder.svg?height=200&width=300&query=bathroom remodel",
      location: "Denver, CO",
      quote: "$8,500",
      status: "LIVE",
      category: "bathroom",
      categoryLabel: "Bathroom",
      timeRemaining: "5 days",
    },
    {
      id: "3",
      title: "Deck Construction",
      image: "/placeholder.svg?height=200&width=300&query=deck construction",
      location: "Portland, OR",
      quote: "$6,200",
      status: "CLOSED",
      category: "deck-patio",
      categoryLabel: "Deck & Patio",
      timeRemaining: "N/A",
    },
    {
      id: "4",
      title: "Basement Finishing",
      image: "/placeholder.svg?height=200&width=300&query=basement finishing",
      location: "Chicago, IL",
      quote: "$22,000",
      status: "LIVE",
      category: "basement",
      categoryLabel: "Basement",
      timeRemaining: "3 days",
    },
    {
      id: "5",
      title: "Landscaping Project",
      image: "/placeholder.svg?height=200&width=300&query=landscaping project",
      location: "Nashville, TN",
      quote: "$4,800",
      status: "LIVE",
      category: "landscaping",
      categoryLabel: "Landscaping",
      timeRemaining: "4 days",
    },
    {
      id: "6",
      title: "Pressure Washing",
      image: "/placeholder.svg?height=200&width=300&query=pressure washing house",
      location: "Seattle, WA",
      quote: "$750",
      status: "LIVE",
      category: "pressure-washing",
      categoryLabel: "Pressure Washing",
      timeRemaining: "1 day",
    },
    {
      id: "7",
      title: "Gutter Cleaning & Repair",
      image: "/placeholder.svg?height=200&width=300&query=gutter cleaning",
      location: "Nashville, TN",
      quote: "$650",
      status: "LIVE",
      category: "gutter-work",
      categoryLabel: "Gutter Work",
      timeRemaining: "3 days",
    },
    {
      id: "8",
      title: "Concrete Driveway Installation",
      image: "/placeholder.svg?height=200&width=300&query=concrete driveway",
      location: "Miami, FL",
      quote: "$7,200",
      status: "CLOSED",
      category: "concrete",
      categoryLabel: "Concrete",
      timeRemaining: "N/A",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "live" && project.status !== "LIVE") return false
      if (statusFilter === "closed" && project.status !== "CLOSED") return false
    }

    // Category filter
    if (categoryFilter !== "all" && project.category !== categoryFilter) {
      return false
    }

    return true
  })

  const shareToFacebook = (projectId: string, projectTitle: string) => {
    const projectUrl = `${window.location.origin}/project/${projectId}`
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      projectUrl,
    )}&quote=${encodeURIComponent(`Check out this project on QuoteBuster.fun: ${projectTitle}`)}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const unlockProject = (projectId: string) => {
    toast.success("Project unlocked! You can now submit a bid.")
  }

  const categoryOptions = [{ value: "all", label: "All Categories" }, ...serviceCategories]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">QuoteBuster.fun</h1>
          </div>
          <div className="flex items-center space-x-2">
            <CreditBadge credits={credits} />
            <Link href="/create-project">
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Project Feed</h2>
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-4 py-4">
                  <h3 className="text-lg font-medium">Filter Projects</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <SimpleDropdown
                      options={categoryOptions}
                      placeholder="Select category"
                      searchPlaceholder="Search categories..."
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="live">Active Only</SelectItem>
                        <SelectItem value="closed">Closed Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="co">Colorado</SelectItem>
                        <SelectItem value="or">Oregon</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="wa">Washington</SelectItem>
                        <SelectItem value="tn">Tennessee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="min-quote">Min Quote</Label>
                      <Input id="min-quote" placeholder="$" type="number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="max-quote">Max Quote</Label>
                      <Input id="max-quote" placeholder="$" type="number" />
                    </div>
                  </div>
                  <Button className="mt-2">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center space-x-1 border rounded-md">
              <Button
                variant={viewType === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-none rounded-l-md"
                onClick={() => setViewType("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewType === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-none rounded-r-md"
                onClick={() => setViewType("list")}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 mb-6 bg-white border rounded-md">
          <SimpleDropdown
            options={categoryOptions}
            placeholder="Category"
            searchPlaceholder="Search categories..."
            className="w-[140px]"
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="live">Active Only</SelectItem>
              <SelectItem value="closed">Closed Only</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="co">Colorado</SelectItem>
              <SelectItem value="or">Oregon</SelectItem>
              <SelectItem value="il">Illinois</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
              <SelectItem value="wa">Washington</SelectItem>
              <SelectItem value="tn">Tennessee</SelectItem>
            </SelectContent>
          </Select>
          <Input className="w-[140px]" placeholder="City" />
          <Input className="w-[100px]" placeholder="Min $" type="number" />
          <Input className="w-[100px]" placeholder="Max $" type="number" />
          <Button size="sm">Apply</Button>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
            {categoryFilter !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="font-medium">
                  {serviceCategories.find((cat) => cat.value === categoryFilter)?.label}
                </span>
              </span>
            )}
            {statusFilter !== "all" && (
              <span>
                {" "}
                with status <span className="font-medium">{statusFilter === "live" ? "Active" : "Closed"}</span>
              </span>
            )}
          </p>
        </div>

        {/* Project Grid/List */}
        <div
          className={
            viewType === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 gap-4"
          }
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`overflow-hidden transition-shadow hover:shadow-md ${viewType === "list" ? "flex" : ""}`}
            >
              <div className={viewType === "list" ? "w-1/3" : ""}>
                <Link href={`/project/${project.id}`}>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className={`object-cover w-full ${viewType === "grid" ? "h-48" : "h-full"}`}
                  />
                </Link>
              </div>
              <div className={viewType === "list" ? "w-2/3" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/project/${project.id}`}>
                        <h3 className="text-lg font-semibold hover:text-primary">{project.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-500">{project.location}</p>
                      {project.status === "LIVE" && (
                        <p className="text-xs text-orange-600 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {project.timeRemaining} left
                        </p>
                      )}
                    </div>
                    <Badge variant={project.status === "LIVE" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <span className="text-sm font-medium">{project.categoryLabel}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{project.quote}</span>

                    {/* Unlock Button */}
                    {project.status === "LIVE" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Lock className="h-4 w-4" />
                            <span className="sr-only">Unlock Project</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Unlock Project</DialogTitle>
                            <DialogDescription>
                              Unlocking this project will cost 1 credit. You currently have {credits} credits.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">Unlocking gives you access to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              <li>Submit your bid to the homeowner</li>
                              <li>View project details and all uploaded documents</li>
                              <li>Message the homeowner directly</li>
                              <li>Receive notifications about project updates</li>
                            </ul>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button onClick={() => unlockProject(project.id)}>Unlock for 1 Credit</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* Facebook Share Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => shareToFacebook(project.id, project.title)}
                    >
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span className="sr-only">Share to Facebook</span>
                    </Button>

                    {/* Share Menu (with other options) */}
                    <ShareMenu projectId={project.id} projectTitle={project.title} />
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects found matching your filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setCategoryFilter("all")
                setStatusFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 bg-white border-t md:hidden">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link href="/create-project">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Plus className="w-5 h-5" />
            <span className="text-xs">Create</span>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
