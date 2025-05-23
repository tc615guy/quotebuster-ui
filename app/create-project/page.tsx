"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, List, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { LineItemTable } from "@/components/line-item-table"
import { Separator } from "@/components/ui/separator"
import { serviceCategories } from "@/lib/service-categories"
import { SimpleDropdown } from "@/components/ui/simple-dropdown"

export default function CreateProjectPage() {
  const [files, setFiles] = useState<{ id: number; file: string; isMain: boolean }[]>([
    { id: 1, file: "/placeholder.svg?height=200&width=300&query=home project", isMain: true },
    { id: 2, file: "/placeholder.svg?height=200&width=300&query=renovation", isMain: false },
  ])

  const [quoteMethod, setQuoteMethod] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const addFile = () => {
    if (files.length < 10) {
      const newId = Math.max(0, ...files.map((f) => f.id)) + 1
      setFiles([
        ...files,
        {
          id: newId,
          file: "/placeholder.svg?height=200&width=300&query=construction",
          isMain: files.length === 0,
        },
      ])
    }
  }

  const removeFile = (id: number) => {
    const newFiles = files.filter((f) => f.id !== id)
    // If we removed the main image, set the first one as main
    if (files.find((f) => f.id === id)?.isMain && newFiles.length > 0) {
      newFiles[0].isMain = true
    }
    setFiles(newFiles)
  }

  const setMainImage = (id: number) => {
    setFiles(
      files.map((f) => ({
        ...f,
        isMain: f.id === id,
      })),
    )
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
          <h1 className="ml-4 text-xl font-bold">Create New Project</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g. Kitchen Renovation" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea id="description" placeholder="Describe your project in detail..." rows={5} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <SimpleDropdown
                options={serviceCategories}
                placeholder="Select a category"
                searchPlaceholder="Search categories..."
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Input id="city" placeholder="e.g. Nashville" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="neighborhood">Neighborhood (Optional)</Label>
              <Input id="neighborhood" placeholder="e.g. Downtown" />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Quote Details (Optional)</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Help contractors understand your project better by providing quote details. This will lead to more
                  accurate bids.
                </p>

                {!quoteMethod ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2"
                      onClick={() => setQuoteMethod("upload")}
                    >
                      <FileText className="h-8 w-8 text-gray-400" />
                      <span>Upload Your Quote</span>
                      <span className="text-xs text-gray-500">(PDF or Image)</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2"
                      onClick={() => setQuoteMethod("manual")}
                    >
                      <List className="h-8 w-8 text-gray-400" />
                      <span>Fill in Details Manually</span>
                      <span className="text-xs text-gray-500">(Line by Line)</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        {quoteMethod === "upload" ? "Upload Quote Document" : "Enter Quote Line Items"}
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => setQuoteMethod(null)}>
                        Change Method
                      </Button>
                    </div>

                    {quoteMethod === "upload" ? (
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-center mb-2">
                          Drag and drop your quote document here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 text-center mb-4">
                          Accepts PDF, JPG, or PNG files up to 10MB
                        </p>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse Files
                        </Button>
                      </div>
                    ) : (
                      <LineItemTable />
                    )}
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-2">
              <Label htmlFor="budget">Budget (Optional)</Label>
              <Input id="budget" placeholder="$" type="number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bid-duration">Bid Duration</Label>
              <div className="flex gap-2">
                <Input id="bid-duration" type="number" defaultValue={72} min={1} className="w-24" />
                <Select defaultValue="hours">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-amber-600">
                We recommend at least 72 hours to receive quality bids from contractors.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Project Images & Documents (Max 10)</Label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {files.map((file) => (
                  <div key={file.id} className="relative">
                    <img
                      src={file.file || "/placeholder.svg"}
                      alt={`Upload ${file.id}`}
                      className={`object-cover w-full h-24 border rounded-md ${file.isMain ? "border-primary border-2" : ""}`}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-1 bg-black/50">
                      <div className="flex items-center">
                        <Switch
                          id={`main-${file.id}`}
                          checked={file.isMain}
                          onCheckedChange={() => setMainImage(file.id)}
                          className="scale-75"
                        />
                        <Label htmlFor={`main-${file.id}`} className="text-xs text-white">
                          Main
                        </Label>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-white hover:text-red-400"
                        onClick={() => removeFile(file.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {files.length < 10 && (
                  <button
                    onClick={addFile}
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md hover:border-primary"
                  >
                    <Upload className="w-6 h-6 mb-1 text-gray-400" />
                    <span className="text-xs text-gray-500">Add File</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {files.length}/10 files uploaded. Click "Main" to set your primary image.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Link href="/">
              <Button>Submit Project</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
