

// "use client"

// import { useLanguage } from "@/components/language-provider"

// export function HowItWorks() {
//   const { t } = useLanguage()

//   const steps = [
//     {
//       number: 1,
//       title: t("signUpTitle") || "Sign Up",
//       description: t("signUpDesc") || "Create account with mobile verification",
//     },
//     {
//       number: 2,
//       title: t("listBooksTitle") || "List Books",
//       description: t("listBooksDesc") || "Upload photos and details of books to sell",
//     },
//     {
//       number: 3,
//       title: t("connectTitle") || "Connect",
//       description: t("connectDesc") || "Buyers contact you directly to purchase",
//     },
//   ]

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold mb-4 text-white">{t("howItWorksTitle") || "How It Works"}</h2>
//           <p className="text-xl text-gray-400">
//             {t("howItWorksSubtitle") || "Simple steps to start buying and selling Navneet books"}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="relative group overflow-hidden bg-slate-800/40 p-8 rounded-xl shadow-sm transition-all duration-300 hover:bg-slate-800/70"
//             >
//               <span className="absolute top-0 left-0 w-full h-full border border-blue-500/30 rounded-xl z-0" />
//               <span
//                 className={`absolute z-0 top-0 left-[-100%] w-full h-full border-2 border-blue-500 rounded-xl group-hover:left-0 transition-all duration-500 ease-in-out ${
//                   index % 2 === 0 ? "animate-slide-right" : "animate-slide-left"
//                 }`}
//               />
//               <div className="relative z-10 text-center flex flex-col items-center">
//                 <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
//                   <span className="text-2xl font-bold text-white">{step.number}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
//                 <p className="text-gray-400 text-sm">{step.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"

import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"

export function HowItWorks() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const steps = [
    {
      number: 1,
      title: t("signUpTitle") || "Sign Up",
      description: t("signUpDesc") || "Create account with mobile verification",
    },
    {
      number: 2,
      title: t("listBooksTitle") || "List Books",
      description: t("listBooksDesc") || "Upload photos and details of books to sell",
    },
    {
      number: 3,
      title: t("connectTitle") || "Connect",
      description: t("connectDesc") || "Buyers contact you directly to purchase",
    },
  ]

  const isDark = theme === "dark"

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDark ? "bg-slate-900" : "bg-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            {t("howItWorksTitle") || "How It Works"}
          </h2>
          <p className={`text-xl ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {t("howItWorksSubtitle") || "Simple steps to start buying and selling Navneet books"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden p-8 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.02] ${
                isDark ? "bg-slate-800/40 hover:bg-slate-800/70" : "bg-white hover:bg-gray-100"
              }`}
            >
              <span className={`absolute top-0 left-0 w-full h-full border ${
                isDark ? "border-blue-500/30" : "border-blue-300/30"
              } rounded-xl z-0`} />
              <span
                className={`absolute z-0 top-0 left-[-100%] w-full h-full border-2 border-blue-500 rounded-xl group-hover:left-0 transition-all duration-500 ease-in-out ${
                  index % 2 === 0 ? "animate-slide-right" : "animate-slide-left"
                }`}
              />
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
