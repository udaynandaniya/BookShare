

// "use client"

// import { useToast } from "@/hooks/use-toast"
// import { MessageCircle, Lightbulb, AlertTriangle } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { useLanguage } from "@/components/language-provider"
// import { useTheme } from "next-themes"

// export function FeedbackSection() {
//   const { toast } = useToast()
//   const { t } = useLanguage()
//   const { theme } = useTheme()

//   const handleFormClick = (formType: string) => {
//     let formUrl = ""
//     let toastMessage = ""

//     switch (formType) {
//       case "query":
//         formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform"
//         toastMessage = "Contact form opened in new tab"
//         break
//       case "feature":
//         formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform"
//         toastMessage = "Feature request form opened in new tab"
//         break
//       case "issue":
//         formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform"
//         toastMessage = "Report issue form opened in new tab"
//         break
//     }

//     if (formUrl) {
//       window.open(formUrl, "_blank")
//       toast({
//         title: "Form Opened",
//         description: toastMessage,
//       })
//     }
//   }

//   const cards = [
//     {
//       title: t("feedback.askTitle") || "Ask Query",
//       description: t("feedback.askDesc") || "Have questions about NavneetHub? Need help with something?",
//       icon: MessageCircle,
//       type: "query",
//       cta: t("feedback.askCta") || "Contact Support →",
//       bg: "bg-blue-100",
//       color: "text-blue-600",
//     },
//     {
//       title: t("feedback.ideaTitle") || "Share New Ideas",
//       description: t("feedback.ideaDesc") || "Have an idea to make NavneetHub better?",
//       icon: Lightbulb,
//       type: "feature",
//       cta: t("feedback.ideaCta") || "Submit Ideas →",
//       bg: "bg-yellow-100",
//       color: "text-yellow-600",
//     },
//     {
//       title: t("feedback.issueTitle") || "Report Issue",
//       description: t("feedback.issueDesc") || "Found a bug or facing problems?",
//       icon: AlertTriangle,
//       type: "issue",
//       cta: t("feedback.issueCta") || "Report Problem →",
//       bg: "bg-red-100",
//       color: "text-red-600",
//     },
//   ]

//   return (
//     <section
//       className={`py-24 transition-colors duration-300 ${
//         theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100 text-gray-900"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
//   {t("feedback.sectionTitle")}
// </h2>
// <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
//   {t("feedback.sectionSubtitle")}
// </p>

//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {cards.map((card) => (
//             <Card
//               key={card.title}
//               onClick={() => handleFormClick(card.type)}
//               className={`group cursor-pointer border border-transparent hover:border-blue-300 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl hover:scale-[1.02] ${
//                 theme === "dark" ? "bg-slate-800" : "bg-white"
//               }`}
//             >
//               <CardContent className="p-8 text-center">
//                 <div className={`mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full ${card.bg}`}>
//                   <card.icon className={`h-8 w-8 ${card.color}`} />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
//                 <p className="text-base mb-5 text-gray-600 dark:text-gray-300">{card.description}</p>
//                 <div className={`text-sm font-semibold ${card.color}`}>{card.cta}</div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

//C:\Users\UDAYN\Downloads\navneethub\components\feedback-section.tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Lightbulb, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"

export function FeedbackSection() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const { theme } = useTheme()

  const handleFormClick = (formType: string) => {
    let formUrl = ""
    let toastMessage = ""

    switch (formType) {
      case "query":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSclRI95PV__qCDVn3VHFy-7rA5VmgXOuQcZ0BQyl3XTdNBqYA/viewform?usp=dialog"
        toastMessage = "Contact form opened in new tab"
        break
      case "feature":
        formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfzo03N65BjzNxD0iARrd77ehI2Z58sI903Fdu74gZP3TyQBA/viewform?usp=dialog"
        toastMessage = "Feature request form opened in new tab"
        break
      case "issue":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
        toastMessage = "Report issue form opened in new tab"
        break
      case "feedback":
        formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSdYkzw3GQgVlQyAE7TlXOHy9OCLuHLJJqAcCNX-rZc_l5pp2A/viewform?usp=sharing&ouid=116740770329831354136 "
        toastMessage = "Feedback form opened in new tab"
       break
    }

     if (formUrl) {
    // Show toast immediately
    toast({
      title: "Form Opened",
      description: toastMessage,
    })

    // Delay opening the form
    setTimeout(() => {
      window.open(formUrl, "_blank")
    }, 800)
  }

  }

  const cards = [
    {
      title: t("feedback.askTitle") || "Ask Query",
      description: t("feedback.askDesc") || "Have questions about NavneetHub? Need help with something?",
      icon: MessageCircle,
      type: "query",
      cta: t("feedback.askCta") || "Contact Support →",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: t("feedback.ideaTitle") || "Share New Ideas",
      description: t("feedback.ideaDesc") || "Have an idea to make NavneetHub better?",
      icon: Lightbulb,
      type: "feature",
      cta: t("feedback.ideaCta") || "Submit Ideas →",
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: t("feedback.issueTitle") || "Report Issue",
      description: t("feedback.issueDesc") || "Found a bug or facing problems?",
      icon: AlertTriangle,
      type: "issue",
      cta: t("feedback.issueCta") || "Report Problem →",
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: t("feedback.feedbackTitle") || "Give Feedback",
      description: t("feedback.feedbackDesc") || "Tell us what you love or want improved on NavneetHub.",
      icon: MessageCircle,
      type: "feedback",
      cta: t("feedback.feedbackCta") || "Send Feedback →",
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ]

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">{t("feedback.sectionTitle")}</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            {t("feedback.sectionSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.title}
              onClick={() => handleFormClick(card.type)}
              className={`group cursor-pointer border border-transparent hover:border-blue-300 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl hover:scale-[1.02] ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              }`}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full ${card.bg}`}
                >
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-base mb-5 text-gray-600 dark:text-gray-300">{card.description}</p>
                <div className={`text-sm font-semibold ${card.color}`}>{card.cta}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
