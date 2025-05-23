"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Shield, CreditCard, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const [userType, setUserType] = useState<"homeowner" | "contractor">("homeowner")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "text-red-500" }
    if (password.length < 10) return { strength: "medium", color: "text-yellow-500" }
    return { strength: "strong", color: "text-green-500" }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="text-xl font-bold">
            QuoteBuster.fun
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">LET'S BUST SOME QUOTES!</h1>
            <p className="text-xl text-gray-600">Get the best bids on your next home project.</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border">
              <Button
                variant={userType === "homeowner" ? "default" : "ghost"}
                className="px-8 py-2"
                onClick={() => setUserType("homeowner")}
              >
                I'm a Homeowner
              </Button>
              <Button
                variant={userType === "contractor" ? "default" : "ghost"}
                className="px-8 py-2"
                onClick={() => setUserType("contractor")}
              >
                I'm a Contractor
              </Button>
            </div>
          </div>

          {/* Main Signup Area */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Panel - Signup Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === "homeowner" ? "Create Your Homeowner Account" : "Create Your Contractor Account"}
                </CardTitle>
                <CardDescription>
                  {userType === "homeowner"
                    ? "Start posting projects and getting competitive bids"
                    : "Join our network and start bidding on projects"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>

                {userType === "contractor" && (
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="Your business or company name" />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {password && (
                    <p className={`text-xs ${passwordStrength.color}`}>
                      Password strength: {passwordStrength.strength}
                    </p>
                  )}
                </div>

                {userType === "contractor" && (
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tn">Tennessee</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="co">Colorado</SelectItem>
                        <SelectItem value="or">Oregon</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="wa">Washington</SelectItem>
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
                  <Input id="neighborhood" placeholder="e.g. Downtown, Music Row" />
                </div>

                {userType === "contractor" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="licensed" />
                    <Label htmlFor="licensed" className="text-sm">
                      I'm licensed and insured
                    </Label>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  {userType === "homeowner" ? "Create Account" : "Create Contractor Account"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Right Panel - Value Proposition */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {userType === "homeowner" ? <>🎉 Welcome Homeowner!</> : <>🛠️ Welcome Contractor!</>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {userType === "homeowner" ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Post your first project FREE</h3>
                          <p className="text-sm text-gray-600">Unlimited uploads + 0% platform fees</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Upload your existing quote</h3>
                          <p className="text-sm text-gray-600">Set your beat target and watch pros compete</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Get competitive bids</h3>
                          <p className="text-sm text-gray-600">Local contractors bid to match or beat your quote</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm font-medium text-center">
                        "I saved $3,200 on my kitchen renovation using QuoteBuster!"
                      </p>
                      <p className="text-xs text-gray-500 text-center mt-1">- Sarah M., Nashville</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">5 Free Credits to start</h3>
                          <p className="text-sm text-gray-600">Unlock your first projects at no cost</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">1 credit = 1 project unlock</h3>
                          <p className="text-sm text-gray-600">Buy more anytime in your dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Build your profile</h3>
                          <p className="text-sm text-gray-600">Upload portfolio and start bidding</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm font-medium">Next Steps:</p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Complete your contractor profile</li>
                        <li>• Upload portfolio photos</li>
                        <li>• Browse available projects</li>
                        <li>• Use your free credits to start bidding</li>
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Trust Signals */}
          <div className="flex justify-center items-center gap-6 mt-8 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span>Verified by Stripe</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
