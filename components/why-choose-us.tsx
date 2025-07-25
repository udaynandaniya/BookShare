

// "use client"

// import { ShieldCheck, BookOpen, UserCheck, Zap } from "lucide-react"
// import { useLanguage } from "@/components/language-provider"

// export default function WhyChooseUs() {
//   const { t } = useLanguage()

//   const features = [
//     {
//       icon: ShieldCheck,
//       title: t("whyChoose.qualityTitle") || "Quality Books",
//       description: t("whyChoose.qualityDesc") || "Verified condition of all listed books",
//     },
//     {
//       icon: BookOpen,
//       title: t("whyChoose.standardsTitle") || "All Standards",
//       description: t("whyChoose.standardsDesc") || "Books available for standards 1-12",
//     },
//     {
//       icon: UserCheck,
//       title: t("whyChoose.verifiedTitle") || "Student Verified",
//       description: t("whyChoose.verifiedDesc") || "All users are verified students",
//     },
//     {
//       icon: Zap,
//       title: t("whyChoose.easyTitle") || "Easy Process",
//       description: t("whyChoose.easyDesc") || "Simple listing and buying process",
//     },
//   ]
//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f172a]">
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-16 text-white">Why Choose NavneetHub?</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group relative rounded-xl p-6 bg-[#0f172a] text-center overflow-hidden border border-blue-800"
//             >
//               {/* Animated Border */}
//               <span className="absolute inset-0 border-2 border-blue-500 animate-borderGlow rounded-xl pointer-events-none" />

//               <feature.icon className="h-10 w-10 mx-auto mb-4 text-blue-400 z-10 relative" />
//               <h3 className="text-xl font-semibold text-white mb-3 z-10 relative">
//                 {feature.title}
//               </h3>
//               <p className="text-base text-blue-200 z-10 relative">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes borderGlow {
//           0% {
//             clip-path: inset(0 100% 100% 0);
//           }
//           25% {
//             clip-path: inset(0 0 100% 0);
//           }
//           50% {
//             clip-path: inset(0 0 0 0);
//           }
//           75% {
//             clip-path: inset(100% 0 0 0);
//           }
//           100% {
//             clip-path: inset(0 100% 100% 0);
//           }
//         }
//         .animate-borderGlow {
//           animation: borderGlow 2s linear infinite;
//         }
//       `}</style>
//     </section>
//   )
// }

"use client"

import { ShieldCheck, BookOpen, UserCheck, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"

export default function WhyChooseUs() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const features = [
    {
      icon: ShieldCheck,
      title: t("whyChoose.qualityTitle") || "Quality Books",
      description: t("whyChoose.qualityDesc") || "Verified condition of all listed books",
    },
    {
      icon: BookOpen,
      title: t("whyChoose.standardsTitle") || "All Standards",
      description: t("whyChoose.standardsDesc") || "Books available for standards 1-12",
    },
    {
      icon: UserCheck,
      title: t("whyChoose.verifiedTitle") || "Student Verified",
      description: t("whyChoose.verifiedDesc") || "All users are verified students",
    },
    {
      icon: Zap,
      title: t("whyChoose.easyTitle") || "Easy Process",
      description: t("whyChoose.easyDesc") || "Simple listing and buying process",
    },
  ]

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
       {/* <h2 className="text-4xl font-bold mb-16 text-white">
  {t("whyChoose.title") || "Why Choose NavneetHub?"}
</h2> */}
<h2
  className={`text-4xl font-bold mb-16 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  {t("whyChoose.title") || "Why Choose NavneetHub?"}
</h2>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-6 text-center overflow-hidden border transition-colors duration-300 ${
                isDark
                  ? "bg-slate-800 border-blue-800"
                  : "bg-white border-blue-300"
              }`}
            >
              {/* Animated Border */}
              <span className="absolute inset-0 border-2 border-blue-500 animate-borderGlow rounded-xl pointer-events-none" />

              <feature.icon className="h-10 w-10 mx-auto mb-4 text-blue-500 z-10 relative" />
              <h3 className={`text-xl font-semibold mb-3 z-10 relative ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {feature.title}
              </h3>
              <p className={`text-base z-10 relative ${
                isDark ? "text-blue-200" : "text-gray-600"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes borderGlow {
          0% {
            clip-path: inset(0 100% 100% 0);
          }
          25% {
            clip-path: inset(0 0 100% 0);
          }
          50% {
            clip-path: inset(0 0 0 0);
          }
          75% {
            clip-path: inset(100% 0 0 0);
          }
          100% {
            clip-path: inset(0 100% 100% 0);
          }
        }
        .animate-borderGlow {
          animation: borderGlow 2s linear infinite;
        }
      `}</style>
    </section>
  )
}
