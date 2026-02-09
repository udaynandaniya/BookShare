"use client"

import { Header } from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Search, Shield, CreditCard, Users, BookOpen } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-800",
      faqs: [
        {
          question: "How do I create an account on BookShareApp?",
          answer:
            "Click on 'Sign Up' in the top right corner, enter your email and phone number, verify with OTP, and complete your profile. It's that simple!",
        },
        {
          question: "Is BookShareApp free to use?",
          answer:
            "Yes! Creating an account and browsing books is completely free. We only charge a small commission when you successfully sell a book.",
        },
        {
          question: "What types of books can I sell?",
          answer:
            "You can sell any BookShareApp books including textbooks, workbooks, and reference materials for all standards (1st to 12th).",
        },
      ],
    },
    {
      title: "Buying Books",
      icon: Search,
      color: "bg-green-100 text-green-800",
      faqs: [
        {
          question: "How do I search for specific books?",
          answer:
            "Use our search bar to find books by title, author, subject, or standard. You can also use filters to narrow down results by price, condition, and location.",
        },
        {
          question: "How do I contact a seller?",
          answer:
            "Click on any book listing to view seller contact details. You can call or message them directly to arrange purchase and pickup.",
        },
        {
          question: "Can I negotiate the price?",
          answer: "Yes! Most sellers are open to reasonable negotiations. Contact them directly to discuss pricing.",
        },
        {
          question: "What if the book condition doesn't match the description?",
          answer:
            "Always inspect books before purchasing. If there's a significant discrepancy, you can report the seller and we'll take appropriate action.",
        },
      ],
    },
    {
      title: "Selling Books",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-800",
      faqs: [
        {
          question: "How do I list a book for sale?",
          answer:
            "Go to 'Sell Book', fill in the book details, upload clear photos, set your price, and publish. Your book will be visible to buyers immediately.",
        },
        {
          question: "What price should I set for my book?",
          answer:
            "Check similar books on our platform for reference. Generally, used books sell for 30-70% of their original price depending on condition.",
        },
        {
          question: "How do I get paid?",
          answer:
            "Payment is handled directly between buyer and seller. We recommend cash on delivery or secure payment methods like UPI.",
        },
        {
          question: "Can I edit my listing after posting?",
          answer:
            "Yes! Go to your dashboard, find your book, and click 'Edit' to update details, price, or photos anytime.",
        },
      ],
    },
    {
      title: "Safety & Security",
      icon: Shield,
      color: "bg-red-100 text-red-800",
      faqs: [
        {
          question: "Is it safe to buy/sell on BookShareApp?",
          answer:
            "We verify all users with OTP and encourage meeting in public places. Always inspect books before payment and trust your instincts.",
        },
        {
          question: "What are the safety guidelines?",
          answer:
            "Meet in public places, inspect books thoroughly, use secure payment methods, and report suspicious behavior immediately.",
        },
        {
          question: "How do I report a problematic user?",
          answer:
            "Use the 'Report Issue' option in our footer or contact support directly. We take all reports seriously and investigate promptly.",
        },
      ],
    },
    {
      title: "Account & Technical",
      icon: Users,
      color: "bg-yellow-100 text-yellow-800",
      faqs: [
        {
          question: "I forgot my password. How do I reset it?",
          answer:
            "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your email.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Go to Profile Settings > Account Settings > Delete Account. Note that this action is permanent and cannot be undone.",
        },
        {
          question: "The website is not working properly. What should I do?",
          answer:
            "Try refreshing the page or clearing your browser cache. If issues persist, report the problem using our 'Report Issue' form.",
        },
        {
          question: "Can I change my registered phone number?",
          answer:
            "Yes, go to Profile Settings and update your phone number. You'll need to verify the new number with OTP.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-16 w-16 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about BookShareApp. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <category.icon className="h-6 w-6" />
                  </div>
                  {category.title}
                  <Badge className={category.color}>{category.faqs.length} questions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border border-white/10 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-2">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <Card className="max-w-2xl mx-auto mt-12 bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform",
                    "_blank",
                  )
                }
                className="animated-border-button"
              >
                Contact Support
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform",
                    "_blank",
                  )
                }
                className="animated-border-button"
              >
                Report Issue
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
