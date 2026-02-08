"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/context/SessionContext"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookEditDialog } from "@/components/book-edit-dialog"
import { BookDetailModal } from "@/components/book-detail-modal"
import { UserOwnPostCard } from "@/components/user-own-post-card"
import { UserOtherAllCard } from "@/components/user-other-all-card"
import { Search, BookOpen, Loader2, RefreshCw, LogOut, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export default function UserDashboard() {
  const { user, logout } = useSession()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const router = useRouter()

  const [ownBooks, setOwnBooks] = useState<any[]>([])
  const [allBooks, setAllBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingBook, setEditingBook] = useState<any | null>(null)
  const [selectedBookDetail, setSelectedBookDetail] = useState<any | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [standardFilter, setStandardFilter] = useState("")
  const [conditionFilter, setConditionFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const standards = [
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard",
    "6th Standard",
    "7th Standard",
    "8th Standard",
    "9th Standard",
    "10th Standard",
    "11th Standard",
    "12th Standard",
  ]

  useEffect(() => {
    if (!user) {
      router.replace("/login")
      return
    }
    if (user.isAdmin) {
      router.replace("/dashboard/admin")
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true)

      const params = new URLSearchParams({
        search: searchTerm,
        standard: standardFilter,
        condition: conditionFilter,
        location: locationFilter,
        sortBy: sortBy,
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max }),
      })

      const res = await fetch(`/api/user/dashboard?${params}`)
      let data
      try {
        data = await res.json()
      } catch (err) {
        console.error("Invalid JSON response:", err)
        throw new Error("Server returned invalid JSON")
      }

      if (res.ok) {
        setOwnBooks(Array.isArray(data.ownBooks) ? data.ownBooks : [])
        setAllBooks(Array.isArray(data.allBooks) ? data.allBooks : [])
      } else {
        throw new Error(data.error || "Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      MySwal.fire({
        title: "Error!",
        text: "Failed to load dashboard data",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1e1b4b",
        customClass: { popup: "rounded-xl" },
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!loading) {
        fetchDashboardData()
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, standardFilter, conditionFilter, locationFilter, sortBy, priceRange])

  const handleDelete = async (bookId: string) => {
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setOwnBooks(ownBooks.filter((b) => b._id !== bookId))
      } else {
        throw new Error("Failed to delete book")
      }
    } catch (error) {
      console.error("Delete error:", error)
      MySwal.fire({
        title: "Error!",
        text: "Failed to delete book",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1e1b4b",
        customClass: { popup: "rounded-xl" },
      })
    }
  }

  const handleRefresh = () => {
    fetchDashboardData(true)
  }

  if (!user || user.isAdmin) return null

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
            : "bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative">
            <Loader2
              className={`h-16 w-16 animate-spin mx-auto mb-6 ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <Sparkles
              className={`absolute top-0 right-0 h-6 w-6 animate-pulse ${
                theme === "dark" ? "text-pink-400" : "text-pink-500"
              }`}
            />
          </div>
          <div className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Loading your dashboard...
          </div>
          <div className={`text-sm mt-2 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>
            Preparing your book collection
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
          : "bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50"
      }`}
    >
      <div className="relative z-10 container mx-auto p-4 sm:p-6 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent`}
              >
                Welcome back, {user.fullName}! ✨
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-base sm:text-lg ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}
              >
                Manage your books and discover amazing deals
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-3"
            >
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                className={`group relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border border-purple-500/30"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border border-purple-300/30"
                } backdrop-blur-sm`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <RefreshCw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-300`}
                  />
                  Refresh
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                onClick={logout}
                className={`group relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white border border-red-500/30"
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border border-red-300/30"
                } backdrop-blur-sm`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Logout
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Tabs defaultValue="own" className="w-full">
            <TabsList
              className={`grid w-full max-w-md mx-auto grid-cols-2 p-1 rounded-2xl mb-8 ${
                theme === "dark"
                  ? "bg-slate-800/50 backdrop-blur-xl border border-purple-500/30"
                  : "bg-white/70 backdrop-blur-xl border border-purple-200/50 shadow-lg"
              }`}
            >
              <TabsTrigger
                value="own"
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-purple-200 hover:text-white"
                    : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-purple-700 hover:text-purple-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  My Books ({ownBooks.length})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-purple-200 hover:text-white"
                    : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-purple-700 hover:text-purple-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  All Books ({allBooks.length})
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Own Books Tab */}
            <TabsContent value="own" className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                  <AnimatePresence>
                    {ownBooks.map((book, index) => (
                      <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <UserOwnPostCard
                          book={book}
                          onEdit={setEditingBook}
                          onDelete={handleDelete}
                          onView={setSelectedBookDetail}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {ownBooks.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="col-span-full text-center py-16"
                    >
                      <div
                        className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                          theme === "dark"
                            ? "bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30"
                            : "bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200"
                        }`}
                      >
                        <BookOpen className={`h-16 w-16 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                        No Books Yet
                      </h3>
                      <p className={`text-lg mb-6 ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}>
                        Start by adding your first book!
                      </p>
                      <Button
                        onClick={() => router.push("/sell")}
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
                            : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Add Your First Book
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            {/* All Books Tab */}
            <TabsContent value="all" className="mt-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {/* Enhanced Filters */}
                <div
                  className={`p-6 rounded-2xl mb-8 backdrop-blur-xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-purple-500/30 shadow-2xl"
                      : "bg-white/70 border-purple-200/50 shadow-xl"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="relative group">
                      <Search
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-purple-400 group-focus-within:text-purple-300"
                            : "text-purple-500 group-focus-within:text-purple-600"
                        }`}
                      />
                      <Input
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pl-12 h-12 rounded-xl border-2 transition-all duration-300 focus:scale-105 ${
                          theme === "dark"
                            ? "bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400 focus:bg-slate-700/70"
                            : "bg-white/80 border-purple-200 text-slate-800 placeholder:text-purple-500 focus:border-purple-400 focus:bg-white"
                        } backdrop-blur-sm`}
                      />
                    </div>

                    {[
                      {
                        value: standardFilter,
                        onChange: setStandardFilter,
                        placeholder: "Select Standard",
                        options: ["all", ...standards],
                      },
                      {
                        value: conditionFilter,
                        onChange: setConditionFilter,
                        placeholder: "Select Condition",
                        options: ["all", "excellent", "good", "fair", "poor"],
                      },
                      {
                        value: sortBy,
                        onChange: setSortBy,
                        placeholder: "Sort By",
                        options: ["newest", "oldest", "priceLow", "priceHigh", "popular"],
                      },
                    ].map((select, index) => (
                      <Select key={index} value={select.value} onValueChange={select.onChange}>
                        <SelectTrigger
                          className={`h-12 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            theme === "dark"
                              ? "bg-slate-700/50 border-purple-500/30 text-white hover:border-purple-400"
                              : "bg-white/80 border-purple-200 text-slate-800 hover:border-purple-400"
                          } backdrop-blur-sm`}
                        >
                          <SelectValue placeholder={select.placeholder} />
                        </SelectTrigger>
                        <SelectContent
                          className={`rounded-xl border-2 ${
                            theme === "dark" ? "bg-slate-800 border-purple-500/30" : "bg-white border-purple-200"
                          } backdrop-blur-xl`}
                        >
                          {select.options.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className={`rounded-lg ${
                                theme === "dark" ? "hover:bg-purple-600/20" : "hover:bg-purple-100"
                              }`}
                            >
                              {option === "all"
                                ? `All ${select.placeholder.split(" ")[1] || ""}`
                                : option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Location"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-105 ${
                        theme === "dark"
                          ? "bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"
                          : "bg-white/80 border-purple-200 text-slate-800 placeholder:text-purple-500 focus:border-purple-400"
                      } backdrop-blur-sm`}
                    />
                    <div className="flex gap-3">
                      <Input
                        placeholder="Min Price"
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                        className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-105 ${
                          theme === "dark"
                            ? "bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"
                            : "bg-white/80 border-purple-200 text-slate-800 placeholder:text-purple-500 focus:border-purple-400"
                        } backdrop-blur-sm`}
                      />
                      <Input
                        placeholder="Max Price"
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                        className={`h-12 rounded-xl border-2 transition-all duration-300 focus:scale-105 ${
                          theme === "dark"
                            ? "bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"
                            : "bg-white/80 border-purple-200 text-slate-800 placeholder:text-purple-500 focus:border-purple-400"
                        } backdrop-blur-sm`}
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Book Cards */}
                <div className="h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                    <AnimatePresence>
                      {allBooks.map((book, index) => (
                        <motion.div
                          key={book._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05, duration: 0.5 }}
                        >
                          <UserOtherAllCard book={book} onView={setSelectedBookDetail} />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {allBooks.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="col-span-full text-center py-16"
                      >
                        <div
                          className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                            theme === "dark"
                              ? "bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30"
                              : "bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200"
                          }`}
                        >
                          <Search className={`h-16 w-16 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                          No Books Found
                        </h3>
                        <p className={`text-lg ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}>
                          Try adjusting your search filters
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Enhanced Dialogs */}
        <AnimatePresence>
          {editingBook && (
            <BookEditDialog
              book={editingBook}
              isOpen={!!editingBook}
              onClose={() => setEditingBook(null)}
              onSave={(updatedBook) => {
                setOwnBooks(ownBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book)))
                setEditingBook(null)
              }}
            />
          )}

          {selectedBookDetail && (
            <BookDetailModal
              book={selectedBookDetail}
              isOpen={!!selectedBookDetail}
              onClose={() => setSelectedBookDetail(null)}
              currentUser={user}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
