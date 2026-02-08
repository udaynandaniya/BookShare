"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { FileText, Users, Shield, AlertTriangle, Scale, BookOpen } from "lucide-react"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-300 text-lg">Last updated: December 2024</p>
          </div>

          <div className="space-y-6">
            {/* Introduction */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Welcome to BookShareApp! These Terms of Service ("Terms") govern your use of our platform for buying and
                  selling used Navneet books. By accessing or using BookShareApp, you agree to be bound by these Terms.
                </p>
                <p>If you do not agree to these Terms, please do not use our platform.</p>
              </CardContent>
            </Card>

            {/* Platform Description */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  Platform Description
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  BookShareApp is an online platform that connects students who want to buy and sell used Navneet
                  educational books. We provide a marketplace where users can:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>List used Navneet books for sale</li>
                  <li>Browse and search for books by standard and location</li>
                  <li>Contact sellers directly through provided contact information</li>
                  <li>Arrange meetings and transactions independently</li>
                </ul>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-200 text-sm">
                    <strong>Important:</strong> BookShareApp is a platform service only. We do not handle payments,
                    shipping, or guarantee the quality of books or reliability of users.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Account Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use only Gmail addresses for registration</li>
                    <li>Verify your email address through OTP</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Listing Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>List only genuine Navneet books</li>
                    <li>Provide accurate book descriptions and conditions</li>
                    <li>Upload clear, authentic photos of books</li>
                    <li>Set fair and reasonable prices</li>
                    <li>Respond promptly to buyer inquiries</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Buying Guidelines</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Communicate respectfully with sellers</li>
                    <li>Inspect books before making payment</li>
                    <li>Follow safety guidelines for meetings</li>
                    <li>Report any suspicious or fraudulent activity</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Activities */}
            <Card className="bg-black/40 backdrop-blur-md border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>The following activities are strictly prohibited on BookShareApp:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Content Violations</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Posting fake or misleading listings</li>
                      <li>Uploading inappropriate images</li>
                      <li>Listing non-Navneet books</li>
                      <li>Duplicate or spam listings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Behavioral Violations</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Harassment or abusive behavior</li>
                      <li>Fraudulent activities or scams</li>
                      <li>Impersonating other users</li>
                      <li>Sharing false contact information</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-200 text-sm">
                    <strong>Consequences:</strong> Violation of these terms may result in account suspension, listing
                    removal, or permanent ban from the platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Platform Limitations */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Platform Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">What We Don't Do</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Process payments or handle money transactions</li>
                    <li>Verify the authenticity or quality of books</li>
                    <li>Guarantee the reliability of users</li>
                    <li>Provide shipping or delivery services</li>
                    <li>Mediate disputes between buyers and sellers</li>
                    <li>Store or backup user-uploaded images permanently</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">User Acknowledgment</h4>
                  <p className="text-sm">
                    By using BookShareApp, you acknowledge that all transactions are conducted directly between buyers and
                    sellers. You assume full responsibility for your interactions, meetings, and transactions with other
                    users.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Platform Content</h4>
                  <p className="text-sm">
                    The BookShareApp platform, including its design, features, and functionality, is owned by us and
                    protected by copyright and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">User Content</h4>
                  <p className="text-sm">
                    You retain ownership of content you post (book listings, images, descriptions). By posting content,
                    you grant us a license to display and distribute it on our platform.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Navneet Books</h4>
                  <p className="text-sm">
                    "Navneet" is a trademark of Navneet Education Limited. We are not affiliated with Navneet Education
                    Limited. This platform is for resale of used books only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liability and Disclaimers */}
            <Card className="bg-black/40 backdrop-blur-md border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scale className="h-5 w-5 text-yellow-400" />
                  Liability and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Platform Disclaimer</h4>
                  <p className="text-sm">
                    BookShareApp is provided "as is" without warranties of any kind. We do not guarantee the accuracy,
                    completeness, or reliability of any content or the availability of the platform.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Limitation of Liability</h4>
                  <p className="text-sm">
                    We are not liable for any direct, indirect, incidental, or consequential damages arising from your
                    use of the platform or transactions with other users.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">User Responsibility</h4>
                  <p className="text-sm">
                    You are solely responsible for your interactions with other users, including meetings, transactions,
                    and any disputes that may arise.
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Important:</strong> Always follow safety guidelines, meet in public places, and verify books
                    before payment. We strongly recommend parental guidance for users under 18.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Termination */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Account Termination</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">By You</h4>
                  <p className="text-sm">
                    You may delete your account at any time through your dashboard settings. This will remove your
                    profile and listings from the platform.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">By Us</h4>
                  <p className="text-sm">
                    We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent
                    activities, or pose risks to other users.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Effect of Termination</h4>
                  <p className="text-sm">
                    Upon termination, your access to the platform will cease, and your listings will be removed. Some
                    information may be retained as required by law or for legitimate business purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We may update these Terms from time to time to reflect changes in our platform, legal requirements, or
                  business practices.
                </p>
                <div>
                  <h4 className="text-white font-medium mb-2">Notification</h4>
                  <p className="text-sm">
                    We will notify users of significant changes by posting the updated Terms on our platform and
                    updating the "Last updated" date.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Acceptance</h4>
                  <p className="text-sm">
                    Continued use of BookShareApp after changes constitutes acceptance of the updated Terms. If you don't
                    agree to the changes, please stop using the platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>If you have questions about these Terms or need to report violations, please contact us:</p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p>
                    <strong className="text-white">Email:</strong> udaynandaniya5@gmail.com
                  </p>
                  <p>
                    <strong className="text-white">Platform:</strong> BookShareApp.com
                  </p>
                  <p>
                    <strong className="text-white">Response Time:</strong> Within 48 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="bg-purple-500/10 border-purple-500/30">
              <CardContent className="p-6">
                <h4 className="text-purple-200 font-medium mb-2">Governing Law</h4>
                <p className="text-purple-200 text-sm">
                  These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of
                  BookShareApp will be subject to the jurisdiction of Indian courts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
