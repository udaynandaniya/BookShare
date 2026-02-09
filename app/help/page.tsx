"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { HelpCircle, BookOpen, Users, Shield, MessageCircle, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
            <p className="text-gray-300 text-lg">Find answers to common questions and get support</p>
          </div>

          <div className="grid gap-6">
            {/* Quick Help */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Getting Started</h3>
                  <p className="text-gray-300 text-sm mb-4">Learn how to use BookShareApp</p>
                  <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="#getting-started">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Buying & Selling</h3>
                  <p className="text-gray-300 text-sm mb-4">Tips for successful transactions</p>
                  <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="#buying-selling">View Tips</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Safety First</h3>
                  <p className="text-gray-300 text-sm mb-4">Stay safe while trading</p>
                  <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="/safety">Safety Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Getting Started */}
            <Card id="getting-started" className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  Getting Started with BookShareApp
                </CardTitle>
                <CardDescription className="text-gray-300">Step-by-step guide to using our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">1. Create Your Account</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    <li>Click "Sign Up" and fill in your details</li>
                    <li>Use a valid Gmail address for registration</li>
                    <li>Verify your email with the OTP sent to your inbox</li>
                    <li>Complete your profile with location and standard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">2. Browse Books</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    <li>Use the search bar to find specific books</li>
                    <li>Filter by standard, condition, and location</li>
                    <li>View detailed book information and seller contact</li>
                    <li>Contact sellers directly via WhatsApp or phone</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">3. List Your Books</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    <li>Go to "Sell Books" and fill in book details</li>
                    <li>Upload clear photos of your books (1-4 images)</li>
                    <li>Set a fair price based on condition</li>
                    <li>Provide accurate contact information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Buying & Selling Tips */}
            <Card id="buying-selling" className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Buying & Selling Tips
                </CardTitle>
                <CardDescription className="text-gray-300">Best practices for successful transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">For Buyers</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>Compare prices from multiple sellers</li>
                      <li>Ask for additional photos if needed</li>
                      <li>Verify book condition before meeting</li>
                      <li>Negotiate respectfully</li>
                      <li>Inspect books thoroughly before payment</li>
                      <li>Meet in safe, public places</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">For Sellers</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>Take clear, well-lit photos</li>
                      <li>Describe condition honestly</li>
                      <li>Respond to inquiries promptly</li>
                      <li>Price competitively</li>
                      <li>Be flexible with meeting times</li>
                      <li>Keep books in good condition until sale</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Issues */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Common Issues & Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-white font-medium">Can't receive OTP email?</h4>
                    <p className="text-gray-300 text-sm">
                      Check your spam folder and ensure you're using a Gmail address. Wait a few minutes and try
                      resending.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-white font-medium">Book images not uploading?</h4>
                    <p className="text-gray-300 text-sm">
                      Ensure images are under 5MB and in JPG/PNG format. Try using a different browser or device.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-white font-medium">Seller not responding?</h4>
                    <p className="text-gray-300 text-sm">
                      Try calling if WhatsApp doesn't work. Some sellers may take time to respond. Look for alternative
                      listings.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-white font-medium">Forgot password?</h4>
                    <p className="text-gray-300 text-sm">
                      Currently, contact support to reset your password. We're working on an automated reset feature.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  Contact Support
                </CardTitle>
                <CardDescription className="text-gray-300">Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="h-5 w-5 text-purple-400" />
                      <h4 className="text-white font-medium">Email Support</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">For general questions and technical issues</p>
                    <p className="text-purple-400 text-sm">udaynandaniya5@gmail.com</p>
                    <p className="text-gray-400 text-xs">Response within 48 hours</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <HelpCircle className="h-5 w-5 text-purple-400" />
                      <h4 className="text-white font-medium">Feature Requests</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Suggest new features or improvements</p>
                    <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/feature-request">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Submit Request
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 h-auto p-4 flex-col"
                  >
                    <Link href="/faq">
                      <HelpCircle className="h-6 w-6 mb-2" />
                      <span>FAQ</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 h-auto p-4 flex-col"
                  >
                    <Link href="/safety">
                      <Shield className="h-6 w-6 mb-2" />
                      <span>Safety Guide</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 h-auto p-4 flex-col"
                  >
                    <Link href="/terms">
                      <BookOpen className="h-6 w-6 mb-2" />
                      <span>Terms of Service</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 h-auto p-4 flex-col"
                  >
                    <Link href="/privacy">
                      <Shield className="h-6 w-6 mb-2" />
                      <span>Privacy Policy</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
