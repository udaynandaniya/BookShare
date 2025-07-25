"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

export default function RefundPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <RefreshCw className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Refund Policy</h1>
            <p className="text-gray-300 text-lg">Last updated: December 2024</p>
          </div>

          <div className="space-y-6">
            {/* Important Notice */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-200 space-y-4">
                <p className="font-medium">
                  NavneetHub is a FREE platform that connects buyers and sellers of used Navneet books. We do not
                  process payments, handle transactions, or charge any fees.
                </p>
                <p>
                  Since we don't handle money or payments, traditional refund policies do not apply to our platform.
                </p>
              </CardContent>
            </Card>

            {/* Platform Services */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-400" />
                  Our Free Services
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>NavneetHub provides the following services at no cost:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Platform access for buying and selling books</li>
                  <li>Book listing and browsing features</li>
                  <li>Search and filtering capabilities</li>
                  <li>User account management</li>
                  <li>Contact information sharing between users</li>
                  <li>Safety guidelines and support resources</li>
                </ul>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-200 text-sm">
                    <strong>100% Free:</strong> All platform features are completely free to use. No registration fees,
                    listing fees, or transaction fees.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Disputes */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Transaction Disputes</CardTitle>
                <CardDescription className="text-gray-300">
                  How to handle payment or book quality issues
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Direct User Transactions</h4>
                  <p className="text-sm">
                    All book purchases and payments are conducted directly between buyers and sellers. NavneetHub is not
                    involved in these transactions.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Dispute Resolution</h4>
                  <p className="text-sm">If you have issues with a transaction, you should:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                    <li>Contact the other party directly to resolve the issue</li>
                    <li>Keep records of all communications</li>
                    <li>Follow safety guidelines for future transactions</li>
                    <li>Report fraudulent behavior to us for account action</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-200 text-sm">
                    <strong>Prevention is Key:</strong> Always inspect books before payment and meet in safe, public
                    places to avoid disputes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What We Can Help With */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  What We Can Help With
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>While we can't process refunds, we can assist with:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Platform Issues</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Account access problems</li>
                      <li>Listing management issues</li>
                      <li>Technical support</li>
                      <li>Feature explanations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Safety Concerns</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Reporting suspicious users</li>
                      <li>Fraudulent listing reports</li>
                      <li>Safety guideline clarifications</li>
                      <li>Account violations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Cannot Help With */}
            <Card className="bg-black/40 backdrop-blur-md border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" />
                  What We Cannot Help With
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>We cannot assist with the following as they are outside our platform scope:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Processing refunds for book purchases</li>
                  <li>Mediating payment disputes between users</li>
                  <li>Guaranteeing book quality or authenticity</li>
                  <li>Recovering money from fraudulent transactions</li>
                  <li>Providing legal advice for disputes</li>
                  <li>Arranging alternative payment methods</li>
                </ul>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-200 text-sm">
                    <strong>Important:</strong> Users are responsible for their own transactions and should exercise
                    caution when meeting strangers and making payments.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prevention Tips */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Prevention Tips</CardTitle>
                <CardDescription className="text-gray-300">Avoid issues by following these guidelines</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Before Meeting</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Verify book details through messages</li>
                      <li>Ask for additional photos if needed</li>
                      <li>Confirm meeting location and time</li>
                      <li>Research fair market prices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">During Meeting</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Meet in public, well-lit places</li>
                      <li>Thoroughly inspect books before payment</li>
                      <li>Count pages and check for damage</li>
                      <li>Verify all promised books are present</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Deletion */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Account Deletion</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>If you're unsatisfied with our platform, you can delete your account at any time:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Go to Dashboard → Settings → Delete Account</li>
                  <li>Your profile and listings will be removed</li>
                  <li>Your data will be deleted according to our Privacy Policy</li>
                  <li>This action cannot be undone</li>
                </ul>
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4">
                  <p className="text-gray-200 text-sm">
                    <strong>Note:</strong> Account deletion does not affect any ongoing transactions or communications
                    you've had with other users.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>For platform-related issues or questions about this policy, contact us:</p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p>
                    <strong className="text-white">Email:</strong> udaynandaniya5@gmail.com
                  </p>
                  <p>
                    <strong className="text-white">Subject:</strong> NavneetHub Support Request
                  </p>
                  <p>
                    <strong className="text-white">Response Time:</strong> Within 48 hours
                  </p>
                </div>
                <p className="text-sm">
                  Please include your account email and a detailed description of the issue when contacting support.
                </p>
              </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="bg-purple-500/10 border-purple-500/30">
              <CardContent className="p-6">
                <h4 className="text-purple-200 font-medium mb-2">Legal Disclaimer</h4>
                <p className="text-purple-200 text-sm">
                  This refund policy is part of our Terms of Service. NavneetHub operates as a free platform service and
                  is not liable for transactions between users. Users engage in transactions at their own risk and are
                  advised to follow safety guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
