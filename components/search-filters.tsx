"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  isLoading?: boolean
}

export interface SearchFilters {
  search: string
  standard: string
  condition: string
  location: string
  sortBy: string
}

export function SearchFilters({ onFiltersChange, isLoading }: SearchFiltersProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    standard: "",
    condition: "",
    location: "",
    sortBy: "newest",
  })

  const standards = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const conditions = ["new", "gentlyUsed", "heavilyUsed"]
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      search: "",
      standard: "",
      condition: "",
      location: "",
      sortBy: "newest",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.search || filters.standard || filters.condition || filters.location

  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          {t("searchFilters") || "Search & Filters"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-white">
            {t("searchBooks") || "Search Books"}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search by title or location..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Standard */}
        <div className="space-y-2">
          <Label className="text-white">{t("standard") || "Standard"}</Label>
          <Select value={filters.standard} onValueChange={(value) => handleFilterChange("standard", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="All Standards" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="" className="text-white hover:bg-slate-800">
                All Standards
              </SelectItem>
              {standards.map((std) => (
                <SelectItem key={std} value={std} className="text-white hover:bg-slate-800">
                  Standard {std}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-white">{t("condition") || "Condition"}</Label>
          <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="" className="text-white hover:bg-slate-800">
                All Conditions
              </SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition} className="text-white hover:bg-slate-800">
                  {t(condition) || condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">
            {t("location") || "Location"}
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Enter city or area..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-white">{t("sortBy") || "Sort By"}</Label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-800">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label className="text-white">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  Search: {filters.search}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("search", "")} />
                </Badge>
              )}
              {filters.standard && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  Standard {filters.standard}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("standard", "")} />
                </Badge>
              )}
              {filters.condition && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  {t(filters.condition) || filters.condition}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("condition", "")} />
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  {filters.location}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("location", "")} />
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
