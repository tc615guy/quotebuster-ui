"use client"

import Link from "next/link"
import { ArrowLeft, CreditCard, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditBadge } from "@/components/credit-badge"

export default function DashboardPage() {
  // Sample data
  const creditBalance = 12
  const unlockedProjects = [
    {
      id: "1",
      title: "Kitchen Renovation",
      location: "Austin, TX",
      unlocked: "2 days ago",
      image: "/placeholder.svg?height=100&width=150&query=kitchen renovation",
    },
    {
      id: "2",
      title: "Bathroom Remodel",
      location: "Denver, CO",
      unlocked: "5 days ago",
      image: "/placeholder.svg?height=100&width=150&query=bathroom remodel",
    },
  ]

  const recentBids = [
    {
      id: "1",
      projectTitle: "Kitchen Renovation",
      amount: "$14,200",
      status: "Pending",
      date: "May 20, 2025",
    },
    {
      id: "2",
      projectTitle: "Bathroom Remodel",
      amount: "$8,000",
      status: "Accepted",
      date: "May 18, 2025",
    },
    {
      id: "3",
      projectTitle: "Deck Construction",
      amount: "$5,800",
      status: "Rejected",
      date: "May 15, 2025",
    },
  ]

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
          <h1 className="ml-4 text-xl font-bold">Contractor Dashboard</h1>
          <div className="ml-auto">
            <CreditBadge credits={creditBalance} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Credit Wallet Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Credit Wallet</CardTitle>
              <CardDescription>Your current balance and credit history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 text-center bg-gray-100 rounded-md">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-3xl font-bold">{creditBalance} Credits</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Purchase Credits</DialogTitle>
                    <DialogDescription>Select a credit package to purchase</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <RadioGroup defaultValue="10">
                      <div className="flex items-center justify-between p-3 mb-2 border rounded-md">
                        <div>
                          <Label htmlFor="10-credits" className="font-medium">
                            10 Credits
                          </Label>
                          <p className="text-sm text-gray-500">$20 ($2.00 per credit)</p>
                        </div>
                        <RadioGroupItem value="10" id="10-credits" />
                      </div>
                      <div className="flex items-center justify-between p-3 mb-2 border rounded-md">
                        <div>
                          <Label htmlFor="30-credits" className="font-medium">
                            30 Credits
                          </Label>
                          <p className="text-sm text-gray-500">$50 ($1.67 per credit)</p>
                        </div>
                        <RadioGroupItem value="30" id="30-credits" />
                      </div>
                      <div className="flex items-center justify-between p-3 mb-2 border rounded-md">
                        <div>
                          <Label htmlFor="75-credits" className="font-medium">
                            75 Credits
                          </Label>
                          <p className="text-sm text-gray-500">$100 ($1.33 per credit)</p>
                        </div>
                        <RadioGroupItem value="75" id="75-credits" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <Label htmlFor="200-credits" className="font-medium">
                            200 Credits
                          </Label>
                          <p className="text-sm text-gray-500">$250 ($1.25 per credit)</p>
                        </div>
                        <RadioGroupItem value="200" id="200-credits" />
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Button>Proceed to Payment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">1 credit = unlock 1 project to submit a bid</p>
            </CardFooter>
          </Card>

          {/* Projects and Bids */}
          <div className="md:col-span-2">
            <Tabs defaultValue="unlocked">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="unlocked">Unlocked Projects</TabsTrigger>
                <TabsTrigger value="bids">Recent Bids</TabsTrigger>
              </TabsList>

              <TabsContent value="unlocked" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recently Unlocked Projects</CardTitle>
                    <CardDescription>Projects you've unlocked to submit bids</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {unlockedProjects.length > 0 ? (
                      <div className="space-y-4">
                        {unlockedProjects.map((project) => (
                          <Link href={`/project/${project.id}`} key={project.id}>
                            <div className="flex gap-4 p-3 transition-colors border rounded-md hover:bg-gray-50">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="object-cover w-20 h-16 rounded"
                              />
                              <div>
                                <h3 className="font-medium">{project.title}</h3>
                                <p className="text-sm text-gray-500">{project.location}</p>
                                <p className="text-xs text-gray-400">Unlocked {project.unlocked}</p>
                              </div>
                              <Badge variant="outline" className="ml-auto self-start">
                                Unlocked
                              </Badge>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500 border border-dashed rounded-md">
                        <p>You haven't unlocked any projects yet</p>
                        <Link href="/">
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="w-4 h-4 mr-1" />
                            Browse Projects
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Recent Bids</CardTitle>
                    <CardDescription>Track the status of your submitted bids</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentBids.length > 0 ? (
                      <div className="space-y-3">
                        {recentBids.map((bid) => (
                          <div key={bid.id} className="p-3 border rounded-md">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{bid.projectTitle}</h3>
                                <p className="text-sm text-gray-500">Bid: {bid.amount}</p>
                                <p className="text-xs text-gray-400">Submitted: {bid.date}</p>
                              </div>
                              <Badge
                                variant={
                                  bid.status === "Accepted"
                                    ? "success"
                                    : bid.status === "Rejected"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {bid.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500 border border-dashed rounded-md">
                        <p>You haven't submitted any bids yet</p>
                        <Link href="/">
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="w-4 h-4 mr-1" />
                            Browse Projects
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
