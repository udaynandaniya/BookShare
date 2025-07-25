





"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/context/SessionContext"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookEditDialog } from "@/components/book-edit-dialog"
import { BookDetailModal } from "@/components/book-detail-modal"
import { AdminOwnPostCard } from "@/components/admin-own-post-card"
import { AdminAllPostCard } from "@/components/admin-all-post-card"
import { motion, AnimatePresence } from "framer-motion"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {
  Search,
  BookOpen,
  Shield,
  Crown,
  LogOut,
  RefreshCw,
  Users,
  TrendingUp,
  BarChart3,
  AlertTriangle,
} from "lucide-react"

const MySwal = withReactContent(Swal)

export default function AdminDashboard() {
  const { user, logout } = useSession()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const router = useRouter()

  // States
  const [ownBooks, setOwnBooks] = useState<any[]>([])
  const [allBooks, setAllBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingBook, setEditingBook] = useState<any | null>(null)
  const [selectedBookDetail, setSelectedBookDetail] = useState<any | null>(null)
  const [deletionReason, setDeletionReason] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<any | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [standardFilter, setStandardFilter] = useState("")
  const [conditionFilter, setConditionFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  // Stats
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeBooks: 0,
    recentBooks: 0,
  })

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
    if (!user.isAdmin) {
      router.replace("/dashboard/user")
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
      const data = await res.json()

      if (res.ok) {
        setOwnBooks(Array.isArray(data.ownBooks) ? data.ownBooks : [])
        setAllBooks(Array.isArray(data.allBooks) ? data.allBooks : [])
        setStats(data.stats || stats)
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
        setAllBooks(allBooks.filter((b) => b._id !== bookId))
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

  const handleAdminDelete = async (book: any) => {
    setBookToDelete(book)
    setShowDeleteDialog(true)
  }

  const confirmAdminDelete = async () => {
    if (!bookToDelete || !deletionReason.trim()) {
      MySwal.fire({
        title: "Error!",
        text: "Please provide a reason for deletion",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1e1b4b",
      })
      return
    }

    try {
      const deleteRes = await fetch(`/api/books/${bookToDelete._id}`, {
        method: "DELETE",
      })

      if (deleteRes.ok) {
        await fetch("/api/admin/notify-deletion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: bookToDelete.sellerEmail,
            userName: bookToDelete.sellerName,
            bookTitle: bookToDelete.title,
            reason: deletionReason,
          }),
        })

        setAllBooks(allBooks.filter((b) => b._id !== bookToDelete._id))
        setShowDeleteDialog(false)
        setBookToDelete(null)
        setDeletionReason("")

        MySwal.fire({
          title: "Deleted!",
          text: "Book has been deleted and user notified.",
          icon: "success",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1e1b4b",
        })
      } else {
        throw new Error("Failed to delete book")
      }
    } catch (err) {
      console.error(err)
      MySwal.fire({
        title: "Error!",
        text: "Failed to delete book.",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1e1b4b",
      })
    }
  }

  const handleRefresh = () => {
    fetchDashboardData(true)
  }

  if (!user || !user.isAdmin) return null

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
            <Shield
              className={`h-16 w-16 animate-pulse mx-auto mb-6 ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <Crown
              className={`absolute top-0 right-0 h-6 w-6 animate-bounce ${
                theme === "dark" ? "text-yellow-400" : "text-yellow-500"
              }`}
            />
          </div>
          <div className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Loading admin dashboard...
          </div>
          <div className={`text-sm mt-2 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>
            Preparing administrative controls
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
        {/* Enhanced Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600"
                      : "bg-gradient-to-br from-purple-500 to-indigo-500"
                  } shadow-lg`}
                >
                  <Crown className="h-8 w-8 text-yellow-300" />
                </div>
                <h1
                  className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent`}
                >
                  Admin Dashboard 👑
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-base sm:text-lg ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}
              >
                Manage books, users, and platform operations
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

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
        >
          {[
            {
              title: "Total Books",
              value: stats.totalBooks,
              icon: BookOpen,
              color: "from-blue-500 to-cyan-500",
              bgColor: theme === "dark" ? "from-blue-600/20 to-cyan-600/20" : "from-blue-100 to-cyan-100",
            },
            {
              title: "Total Users",
              value: stats.totalUsers,
              icon: Users,
              color: "from-green-500 to-emerald-500",
              bgColor: theme === "dark" ? "from-green-600/20 to-emerald-600/20" : "from-green-100 to-emerald-100",
            },
            {
              title: "Active Books",
              value: stats.activeBooks,
              icon: TrendingUp,
              color: "from-purple-500 to-pink-500",
              bgColor: theme === "dark" ? "from-purple-600/20 to-pink-600/20" : "from-purple-100 to-pink-100",
            },
            {
              title: "Recent Books",
              value: stats.recentBooks,
              icon: BarChart3,
              color: "from-orange-500 to-red-500",
              bgColor: theme === "dark" ? "from-orange-600/20 to-red-600/20" : "from-orange-100 to-red-100",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`group relative overflow-hidden backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  theme === "dark" ? "bg-slate-800/50 border-purple-500/30" : "bg-white/70 border-purple-200/50"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                />
                <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle
                    className={`text-xs sm:text-sm font-medium ${
                      theme === "dark" ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                  >
                    {stat.value}
                  </div>
                  <div className={`text-xs mt-1 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>
                    Platform metric
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
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
                  <Shield className="w-4 h-4" />
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
                        <AdminOwnPostCard
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
                        Start by adding your first book as admin!
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
                          <Crown className="w-5 h-5" />
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

                {/* Enhanced Books Grid */}
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
                          <AdminAllPostCard
                            book={book}
                            onEdit={setEditingBook}
                            onAdminDelete={handleAdminDelete}
                            onView={setSelectedBookDetail}
                          />
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
                setAllBooks(allBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book)))
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

          {/* Enhanced Admin Delete Dialog */}
          {showDeleteDialog && (
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent
                className={`mx-4 rounded-2xl border-2 backdrop-blur-xl ${
                  theme === "dark" ? "bg-slate-800/90 border-red-500/30" : "bg-white/90 border-red-200/50"
                }`}
              >
                <DialogHeader>
                  <DialogTitle
                    className={`text-xl font-bold flex items-center ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Delete Book - Admin Action
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className={theme === "dark" ? "text-white" : "text-slate-800"}>
                    <p className="mb-2">You are about to delete:</p>
                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"}`}>
                      <p className="font-semibold">{bookToDelete?.title}</p>
                      <p className={`text-sm ${theme === "dark" ? "text-purple-200" : "text-purple-700"}`}>
                        by {bookToDelete?.sellerName}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                      Reason for deletion (will be sent to user):
                    </label>
                    <Textarea
                      value={deletionReason}
                      onChange={(e) => setDeletionReason(e.target.value)}
                      placeholder="Please provide a reason for deleting this book post..."
                      className={`rounded-xl border-2 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                          : "bg-white/80 border-purple-200 text-slate-800 placeholder:text-purple-500"
                      } backdrop-blur-sm`}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDeleteDialog(false)}
                      className={`flex-1 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300"
                      }`}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={confirmAdminDelete}
                      disabled={!deletionReason.trim()}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete & Notify User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
