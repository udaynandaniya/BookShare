
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type Language = "en" | "gu"
type TranslationKey = keyof typeof translations["en"]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

const translations = {
  en: {
    home: "Home",
    buyBooks: "Buy Books",
    sellBooks: "Sell Books",
    faq: "FAQ",
    help: "Help",
    dashboard: "Dashboard",
    profile: "Profile",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    sort: "Sort",

    // Auth
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    location: "Location",
    standard: "Standard",

    // Hero
    heroTitle: "Buy & Sell Used Navneet Books",
    heroSubtitle:
      "Connect with students in your area to buy and sell affordable used Navneet books",
    heroExtraText:
      "Buy & Sell Used Navneet Books. Connect with students nearby to get affordable books or pass on the ones you've completed. Save money and help the community!",

    // How it Works
    howItWorks: "How It Works",
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Simple steps to start buying and selling Navneet books",
    searchBooks: "Search Books",
    contactSeller: "Contact Seller",
    meetAndBuy: "Meet & Buy",
    simpleSteps: "Simple steps to start buying and selling Navneet books",
    step1Title: "Sign Up",
    step1Desc: "Create account with mobile verification",
    step2Title: "List Books",
    step2Desc: "Upload photos and details of books to sell",
    step3Title: "Connect",
    step3Desc: "Buyers contact you directly to purchase",

    // Why Choose
    "whyChoose.title": "Why Choose BookShareApp?",
    "whyChoose.qualityTitle": "Quality Books",
    "whyChoose.qualityDesc": "Verified condition of all listed books",
    "whyChoose.standardsTitle": "All Standards",
    "whyChoose.standardsDesc": "Books available for standards 1-12",
    "whyChoose.verifiedTitle": "Student Verified",
    "whyChoose.verifiedDesc": "All users are verified students",
    "whyChoose.easyTitle": "Easy Process",
    "whyChoose.easyDesc": "Simple listing and buying process",

    // Dashboard
    welcome: "Welcome",
    myBooks: "My Books",
    allBooks: "All Books",
    dashboardDesc: "Manage your books and discover new ones",
    adminDashboard: "Admin Dashboard",
    adminDesc: "Manage books and users",

    // Actions
    call: "Call",
    share: "Share",

    // Filters
    searchBooksInput: "Search books...",
    selectStandard: "Select Standard",
    selectCondition: "Select Condition",
    sortBy: "Sort By",
    minPrice: "Min Price",
    maxPrice: "Max Price",

    // Book Details
    condition: "Condition",
    description: "Description",

    // Messages
    areYouSure: "Are you sure?",
    deleteWarning: "You will not be able to recover this book!",
    yesDelete: "Yes, delete it!",
    deleted: "Deleted!",
    bookDeleted: "Your book has been deleted.",
    somethingWrong: "Something went wrong.",
    failedToDelete: "Failed to delete book.",
    linkCopied: "Link Copied!",
    linkCopiedDesc: "Book link has been copied to clipboard",

    // Feedback
    helpImprove: "Help Us Improve BookShareApp",
    feedbackOptions: "Your feedback is valuable to us. Choose how you'd like to help us improve:",
    "feedback.askTitle": "Ask Query",
    "feedback.askDesc": "Have questions about BookShareApp? Need help with something?",
    "feedback.askCta": "Contact Support →",
    "feedback.ideaTitle": "Share New Ideas",
    "feedback.ideaDesc": "Have an idea to make BookShareApp better?",
    "feedback.ideaCta": "Submit Ideas →",
    "feedback.issueTitle": "Report Issue",
    "feedback.issueDesc": "Found a bug or facing problems?",
    "feedback.issueCta": "Report Problem →",
  "feedback.sectionTitle": "Help Us Improve BookShareApp",
  "feedback.sectionSubtitle": "Your feedback is valuable to us. Choose how you'd like to help us improve:",

  //howItWorks section

    "howItWorksTitle": "How It Works",
  "howItWorksSubtitle": "Simple steps to start buying and selling Navneet books",

  "signUpTitle": "Sign Up",
  "signUpDesc": "Create account with mobile verification",

  "listBooksTitle": "List Books",
  "listBooksDesc": "Upload photos and details of books to sell",

  "connectTitle": "Connect",
  "connectDesc": "Buyers contact you directly to purchase",
  
  "feedback.sectionTitle": "Feedback",
"feedback.sectionSubtitle": "Your feedback is valuable to us. Choose how you'd like to help us improve:",

"feedback.askTitle": "Ask Query",
"feedback.askDesc": "Have questions about BookShareApp? Need help with something?",
"feedback.askCta": "Contact Support →",

"feedback.ideaTitle": "Share New Ideas",
"feedback.ideaDesc": "Have an idea to make BookShareApp better?",
"feedback.ideaCta": "Submit Ideas →",

"feedback.issueTitle": "Report Issue",
"feedback.issueDesc": "Found a bug or facing problems?",
"feedback.issueCta": "Report Problem →",

"feedback.feedbackTitle": "Give Feedback",
"feedback.feedbackDesc": "Tell us what you love or want improved on BookShareApp.",
"feedback.feedbackCta": "Send Feedback →",


//footer
"footer.contact": "Ask a Query",
  "footer.idea": "Share Ideas",
  "footer.issue": "Report Issue",
  "footer.feedback": "Give Feedback",
  "footer.home": "Home",
  "footer.browse": "Browse Books",
  "footer.sell": "Sell Books",
  "footer.howItWorks": "How It Works",
  "footer.safetyTips": "Safety Tips",
  "footer.importantNotice": "Important Notice",
  "footer.support": "Support & Help",
  "footer.contactSupport": "Contact Support",
  "footer.requestFeature": "Request Feature",
  "footer.reportIssue": "Report Issue",
  "footer.giveFeedback": "Give Feedback",
  "footer.disclaimer": "Please verify all details before making any transaction. We are not responsible for any fraudulent activities. Always meet in safe public places and verify books before payment.",
  "footer.quickLinks": "Quick Links",
  "footer.description": "Connect with students in your area to buy affordable used Navneet books or sell your completed ones. Save money, help others!",
  "footer.activeTime": "Active: February - July",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.version": "v2.0.0",
   "footer.sessionCycle": "Session Cycle",
  "footer.sessionDetails": "Mar–Aug: Active session ends 1 Sep, new session from 2 Sep | Sep–Feb: Ends 1 Mar, new session from 2 Mar",
  "footer.autoCleanupTitle": "Automatic Data Cleanup",
  "footer.autoCleanupDesc": "Every 1 March and 1 Sep all user accounts and book listings are automatically removed to ensure fresh start and remove inactive users",


  //privacy policy 
    "privacy.title": "Privacy Policy",
  "privacy.intro": "We are committed to protecting your privacy. This privacy policy explains how your personal information is collected and used.",
  "privacy.collectionTitle": "Information We Collect",
  "privacy.collectionContent": "We may collect personal information such as your name, email address, and usage data to provide better services.",
  "privacy.usageTitle": "How We Use Your Information",
  "privacy.usageContent": "Your information is used to personalize your experience, improve our platform, and communicate with you.",
  "privacy.sharingTitle": "Information Sharing",
  "privacy.sharingContent": "We do not sell or share your information with third parties except as required by law.",
  "privacy.securityTitle": "Data Security",
  "privacy.securityContent": "We implement security measures to safeguard your information and prevent unauthorized access.",
  "privacy.changesTitle": "Changes to this Policy",
  "privacy.changesContent": "We may update this policy from time to time. Changes will be posted on this page.",
  "privacy.contactTitle": "Contact Us",
  "privacy.contactContent": "If you have questions about this privacy policy, please contact us.",
  
  
  // Notice
    importantNotice: "Important Notice",
    importantNoticeContent:
      "Please verify all details before making any transaction. We are not responsible for any fraudulent activities. Always meet in safe public places and verify books before payment.",
  },

  gu: {
    // Navigation
    home: "હોમ",
    buyBooks: "પુસ્તકો ખરીદો",
    sellBooks: "પુસ્તકો વેચો",
    faq: "FAQ",
    help: "મદદ",
    dashboard: "ડેશબોર્ડ",
    profile: "પ્રોફાઇલ",
    login: "લૉગિન",
    signup: "સાઇન અપ",
    logout: "લૉગઆઉટ",

    // Common
    loading: "લોડ થઈ રહ્યું છે...",
    error: "ભૂલ",
    success: "સફળતા",
    cancel: "રદ કરો",
    save: "સેવ કરો",
    delete: "કાઢી નાખો",
    edit: "ફેરફાર કરો",
    view: "જુઓ",
    search: "શોધો",
    filter: "ફિલ્ટર",
    sort: "ગોઠવો",

    // Auth
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    fullName: "પૂર્ણ નામ",
    mobileNumber: "મોબાઇલ નંબર",
    location: "સ્થળ",
    standard: "ધોરણ",

    // Hero
    heroTitle: "વપરાયેલ નવનીત પુસ્તકો ખરીદો અને વેચો",
    heroSubtitle: "તમારા વિસ્તારમાં વિદ્યાર્થીઓ સાથે જોડાવા માટે સસ્તા પુસ્તકો ખરીદો કે વેચો",
    heroExtraText: "નવનીત પુસ્તકો ખરીદો અને વેચો. વિદ્યાર્થીઓ સાથે જોડાવા માટે આદર્શ પ્લેટફોર્મ.",

    // How it Works
    howItWorks: "કેવી રીતે કાર્ય કરે છે",
    howItWorksTitle: "કેવી રીતે કાર્ય કરે છે",
    howItWorksSubtitle: "પુસ્તકો ખરીદવા અને વેચવા માટે સરળ પગલાં",
    searchBooks: "પુસ્તકો શોધો",
    contactSeller: "વેચનારનો સંપર્ક કરો",
    meetAndBuy: "મળો અને ખરીદો",
    simpleSteps: "સરળ પગલાંથી શરૂ કરો",
    step1Title: "સાઇન અપ",
    step1Desc: "મોબાઇલ ચકાસણી સાથે એકાઉન્ટ બનાવો",
    step2Title: "પુસ્તકો ઉમેરો",
    step2Desc: "તસવીરો અને વિગતો અપલોડ કરો",
    step3Title: "જોડાવો",
    step3Desc: "ખરીદદારો તમારો સીધો સંપર્ક કરે છે",

    // Why Choose
    "whyChoose.title": "શા માટે પસંદ કરો નવનીતહબ?",
    "whyChoose.qualityTitle": "ગુણવત્તાવાળા પુસ્તકો",
    "whyChoose.qualityDesc": "બધી યાદીબદ્ધ પુસ્તકોની સ્થિતિ ચકાસાયેલ છે",
    "whyChoose.standardsTitle": "બધા ધોરણો",
    "whyChoose.standardsDesc": "ધોરણ 1 થી 12 સુધીના પુસ્તકો ઉપલબ્ધ છે",
    "whyChoose.verifiedTitle": "વિદ્યાર્થી દ્વારા ચકાસાયેલ",
    "whyChoose.verifiedDesc": "બધા યુઝર્સ ચકાસાયેલ વિદ્યાર્થીઓ છે",
    "whyChoose.easyTitle": "સરળ પ્રક્રિયા",
    "whyChoose.easyDesc": "સરળ રીતે યાદી બનાવો અને ખરીદો",

    // Dashboard
    welcome: "સ્વાગત છે",
    myBooks: "મારા પુસ્તકો",
    allBooks: "બધા પુસ્તકો",
    dashboardDesc: "તમારા પુસ્તકોનું સંચાલન કરો અને નવા શોધો",
    adminDashboard: "એડમિન ડેશબોર્ડ",
    adminDesc: "પુસ્તકો અને વપરાશકર્તાઓનું સંચાલન કરો",

    // Actions
    call: "કૉલ કરો",
    share: "શેર કરો",

    // Filters
    searchBooksInput: "પુસ્તકો શોધો...",
    selectStandard: "ધોરણ પસંદ કરો",
    selectCondition: "સ્થિતિ પસંદ કરો",
    sortBy: "ક્રમ પ્રમાણે",
    minPrice: "ન્યૂનતમ કિંમત",
    maxPrice: "મહત્તમ કિંમત",

    // Book Details
    condition: "સ્થિતિ",
    description: "વર્ણન",

    // Messages
    areYouSure: "શું તમે ખાતરી કરો છો?",
    deleteWarning: "આ પુસ્તક ફરીથી પુનઃપ્રાપ્ત ન કરી શકાશે!",
    yesDelete: "હા, કાઢી નાખો!",
    deleted: "કાઢી નાખવામાં આવ્યું!",
    bookDeleted: "તમારું પુસ્તક કાઢી નાખવામાં આવ્યું છે.",
    somethingWrong: "કંઈક ખોટું થયું.",
    failedToDelete: "પુસ્તક કાઢી નાખવામાં નિષ્ફળતા.",
    linkCopied: "લિંક કૉપિ થઈ!",
    linkCopiedDesc: "લિંક ક્લિપબોર્ડમાં કૉપિ થઈ છે",

    // Feedback
    helpImprove: "BookShareApp ને વધુ સારું બનાવવા માટે અમને મદદ કરો",
    feedbackOptions: "તમારા પ્રતિસાદથી કેવી રીતે મદદ કરશો તે પસંદ કરો:",
    "feedback.askTitle": "પ્રશ્ન પૂછો",
    "feedback.askDesc": "BookShareApp વિશે પ્રશ્નો છે? મદદ જોઈએ?",
    "feedback.askCta": "સંપર્ક કરો →",
    "feedback.ideaTitle": "નવા વિચારો શેર કરો",
    "feedback.ideaDesc": "BookShareApp ને વધુ સારું બનાવવા માટે તમારા વિચારો શેર કરો",
    "feedback.ideaCta": "વિચાર મોકલો →",
    "feedback.issueTitle": "સમસ્યા જણાવો",
    "feedback.issueDesc": "બગ મળ્યો છે કે સમસ્યા આવી છે?",
    "feedback.issueCta": "પ્રતિસાદ આપો →",
     "footer.sessionCycle": "સત્ર ચક્ર",
  "footer.sessionDetails": "માર્ચ-ઓગસ્ટ: સત્ર 1 સપ્ટેમ્બરે પૂરુ થાય છે, 2 સપ્ટેમ્બરથી નવું સત્ર શરૂ થાય છે | સપ્ટેમ્બર-ફેબ્રુઆરી: 1 માર્ચે પૂરુ થાય છે, 2 માર્ચથી નવું સત્ર શરૂ થાય છે",



    //how works sectioon
    "howItWorksTitle": "કેવી રીતે કાર્ય કરે છે",
  "howItWorksSubtitle": "પુસ્તકો ખરીદવા અને વેચવા માટે સરળ પગલાં",

  "signUpTitle": "સાઇન અપ કરો",
  "signUpDesc": "મોબાઇલ પુષ્ટિ સાથે ખાતું બનાવો",

  "listBooksTitle": "પુસ્તકો યાદીબદ્ધ કરો",
  "listBooksDesc": "વેચવા માટે પુસ્તકોના ફોટા અને વિગતો અપલોડ કરો",

  "connectTitle": "જોડાવો",
  "connectDesc": "ખરીદદારો સીધા તમારી સાથે સંપર્ક કરશે",

  "feedback.sectionTitle": "પ્રતિસાદ",
  "feedback.sectionSubtitle": "તમારો પ્રતિસાદ અમારે માટે મૂલ્યવાન છે. અમને વધુ સારું બનાવવા માટે તમારી પસંદગી બતાવો",

  "feedback.sectionTitle": "પ્રતિસાદ",
"feedback.sectionSubtitle": "તમારો પ્રતિસાદ અમારે માટે મૂલ્યવાન છે. અમને વધુ સારું બનાવવા માટે તમારી પસંદગી બતાવો",

"feedback.askTitle": "પ્રશ્ન પૂછો",
"feedback.askDesc": "BookShareApp વિશે પ્રશ્નો છે? મદદ જોઈએ?",
"feedback.askCta": "સંપર્ક કરો →",

"feedback.ideaTitle": "નવા વિચારો શેર કરો",
"feedback.ideaDesc": "BookShareApp ને વધુ સારું બનાવવાનો વિચાર છે?",
"feedback.ideaCta": "વિચાર મોકલો →",

"feedback.issueTitle": "સમસ્યા જણાવો",
"feedback.issueDesc": "બગ મળ્યો કે સમસ્યા આવી?",
"feedback.issueCta": "સમસ્યા જણાવો →",

"feedback.feedbackTitle": "પ્રતિસાદ આપો",
"feedback.feedbackDesc": "તમને શું ગમે છે અથવા શું સુધારવું જોઈએ તે જણાવો.",
"feedback.feedbackCta": "પ્રતિસાદ મોકલો →",


  "footer.contact": "પ્રશ્ન પૂછો",
  "footer.idea": "વિચાર શેર કરો",
  "footer.issue": "સમસ્યા જાણાવો",
  "footer.feedback": "પ્રતિસાદ આપો",
  "footer.home": "મુખ્ય પૃષ્ઠ",
  "footer.browse": "પુસ્તકો જુઓ",
  "footer.sell": "પુસ્તકો વેચો",
  "footer.howItWorks": "કેવી રીતે કાર્ય કરે છે",
  "footer.safetyTips": "સલામતી સૂચનાઓ",
  "footer.importantNotice": "મહત્વપૂર્ણ સૂચના",
  "footer.support": "સહાય અને સપોર્ટ",
  "footer.contactSupport": "સપોર્ટનો સંપર્ક કરો",
  "footer.requestFeature": "ફીચર વિનંતી",
  "footer.reportIssue": "સમસ્યા જાણાવો",
  "footer.giveFeedback": "પ્રતિસાદ આપો",
  "footer.disclaimer": "કોઈપણ લેવું-દેવું કરતા પહેલા તમામ વિગતો ચકાસો. અમારું કોઈ જવાબદારી નહિ હોય છે ભ્રામક પ્રવૃત્તિઓ માટે. હંમેશાં સાર્વજનિક સ્થળે મળો અને ચુકવણી પહેલા પુસ્તકો ચકાસો.",
  "footer.quickLinks": "ઝડપી લિંક્સ",
  "footer.description": "તમારા વિસ્તારના વિદ્યાર્થીઓ સાથે જોડાઓ, સસ્તા વપરાયેલ નવનીત પુસ્તકો ખરીદો અથવા તમારા ઉપયોગ થયેલા વેચો. પૈસા બચાવો, અન્યની મદદ કરો!",
  "footer.activeTime": "સક્રિય સમયગાળો: ફેબ્રુઆરી - જુલાઈ",
  "footer.privacy": "ગોપનીયતા નીતિ",
  "footer.terms": "સેવાની શરતો",
  "footer.version": "સંસ્કરણ v2.0.0",
  "footer.autoCleanupTitle": "આપોઆપ ડેટા સફાઈ",
  "footer.autoCleanupDesc": "દર વર્ષે 1 માર્ચ અને 1 સપ્ટેમ્બરે તમામ યુઝર ખાતાઓ અને પુસ્તક યાદીઓ આપોઆપ દૂર કરવામાં આવે છે જેથી નવી શરૂઆત થાય અને નિષ્ક્રિય યુઝર્સ દૂર થાય",


  //privacy-policy
   "privacy.title": "ગોપનીયતા નીતિ",
  "privacy.intro": "અમે તમારી ગોપનીયતાની રક્ષા કરવા પ્રતિબદ્ધ છીએ. આ ગોપનીયતા નીતિ બતાવે છે કે તમારી વ્યક્તિગત માહિતી કેવી રીતે એકત્રિત થાય છે અને ઉપયોગમાં લેવામાં આવે છે.",
  "privacy.collectionTitle": "અમે કઈ માહિતી એકત્રિત કરીએ છીએ",
  "privacy.collectionContent": "અમે તમારી નામ, ઈમેલ અને ઉપયોગ સંબંધિત માહિતી જેવી વ્યક્તિગત માહિતી એકત્રિત કરી શકીએ છીએ.",
  "privacy.usageTitle": "માહિતીનો ઉપયોગ કેવી રીતે થાય છે",
  "privacy.usageContent": "તમારી માહિતીનો ઉપયોગ તમારા અનુભવને વ્યક્તિગત બનાવવા, અમારી સેવાઓ સુધારવા અને તમારા સાથે સંચાર કરવા માટે થાય છે.",
  "privacy.sharingTitle": "માહિતી વહેંચણી",
  "privacy.sharingContent": "અમે તમારી માહિતી ત્રીજા પક્ષ સાથે વેચતા નથી કે વહેંચતા નથી, સિવાય કાનૂની જરૂરિયાત હોય ત્યારે.",
  "privacy.securityTitle": "માહિતી સુરક્ષા",
  "privacy.securityContent": "અમે તમારી માહિતીની સુરક્ષા માટે પગલાં લઈએ છીએ અને અનધિકૃત પ્રવેશને અટકાવીએ છીએ.",
  "privacy.changesTitle": "નીતિમાં ફેરફારો",
  "privacy.changesContent": "અમે સમય સમય પર આ નીતિમાં સુધારા કરી શકીએ છીએ. ફેરફારો આ પૃષ્ઠ પર દર્શાવવામાં આવશે.",
  "privacy.contactTitle": "અમારો સંપર્ક કરો",
  "privacy.contactContent": "જો તમારી પાસે આ ગોપનીયતા નીતિ વિશે પ્રશ્નો હોય, તો કૃપા કરીને અમારો સંપર્ક કરો.",


  importantNotice: "મહત્વપૂર્ણ સૂચના",
    importantNoticeContent:
      "કોઈપણ વ્યવહાર પહેલા વિગતોની ચકાસણી કરો. હંમેશા જાહેર સ્થળે મળો અને ચુકવણી પહેલાં પુસ્તકો ચકાસો.",
  },
} as const

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang === "en" || storedLang === "gu") {
      setLanguage(storedLang)
    }
  }, [])

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: TranslationKey) =>
    translations[language][key] ?? `[${key}]`

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
