"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Shield, AlertTriangle, CheckCircle, Users, Phone } from "lucide-react"

export default function SafetyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Safety Guidelines</h1>
            <p className="text-gray-300 text-lg">
              Your safety is our priority. Follow these guidelines for secure transactions.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Meeting Safety */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Meeting Safety
                </CardTitle>
                <CardDescription className="text-gray-300">Guidelines for safe in-person meetings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Meet in Public Places</h4>
                    <p className="text-gray-300 text-sm">
                      Always meet in well-lit, crowded public places like malls, cafes, or libraries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Bring a Friend</h4>
                    <p className="text-gray-300 text-sm">
                      Consider bringing a friend or family member with you to the meeting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Daytime Meetings</h4>
                    <p className="text-gray-300 text-sm">Schedule meetings during daytime hours when possible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Trust Your Instincts</h4>
                    <p className="text-gray-300 text-sm">
                      If something feels wrong, don't hesitate to cancel the meeting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Safety */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Payment Safety
                </CardTitle>
                <CardDescription className="text-gray-300">Secure payment practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Inspect Before Payment</h4>
                    <p className="text-gray-300 text-sm">
                      Always inspect the books thoroughly before making any payment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Cash Transactions</h4>
                    <p className="text-gray-300 text-sm">
                      Prefer cash transactions for in-person meetings. Avoid online transfers to unknown parties.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">No Advance Payments</h4>
                    <p className="text-gray-300 text-sm">Never make advance payments without seeing the books first.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Safety */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-400" />
                  Communication Safety
                </CardTitle>
                <CardDescription className="text-gray-300">Safe communication practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Keep Personal Info Private</h4>
                    <p className="text-gray-300 text-sm">
                      Don't share unnecessary personal information like home address or financial details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Use Platform Messaging</h4>
                    <p className="text-gray-300 text-sm">
                      Use WhatsApp or phone calls for initial communication. Keep records of conversations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Report Suspicious Behavior</h4>
                    <p className="text-gray-300 text-sm">
                      Report any suspicious or inappropriate behavior to us immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Red Flags */}
            <Card className="bg-black/40 backdrop-blur-md border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Red Flags to Watch Out For
                </CardTitle>
                <CardDescription className="text-gray-300">Warning signs of potential scams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Pressure to Pay Immediately</h4>
                    <p className="text-gray-300 text-sm">
                      Be wary of sellers who pressure you to pay immediately or create urgency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Unrealistic Prices</h4>
                    <p className="text-gray-300 text-sm">
                      Prices that seem too good to be true often are. Research market prices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Reluctance to Meet</h4>
                    <p className="text-gray-300 text-sm">
                      Avoid sellers who refuse to meet in person or only want online transactions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Poor Communication</h4>
                    <p className="text-gray-300 text-sm">
                      Be cautious of sellers with poor grammar, generic responses, or evasive answers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-400" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription className="text-gray-300">Important numbers to keep handy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Police Emergency</h4>
                    <p className="text-purple-400 text-xl font-bold">100</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Women Helpline</h4>
                    <p className="text-purple-400 text-xl font-bold">1091</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Cyber Crime</h4>
                    <p className="text-purple-400 text-xl font-bold">1930</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">NavneetHub Support</h4>
                    <p className="text-purple-400 text-xl font-bold">+91-XXXXXXXXXX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-200 font-medium mb-2">Important Disclaimer</h4>
                    <p className="text-yellow-200 text-sm">
                      NavneetHub is a platform that connects buyers and sellers. We are not responsible for the quality
                      of books, payment disputes, or any fraudulent activities. Users are advised to exercise caution
                      and follow safety guidelines. Always verify the authenticity of books and sellers before making
                      any transactions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
