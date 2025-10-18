"use client"

import { Search, Bell, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { SearchResults } from "@/components/search-results"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 0) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery])

  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search stocks, crypto..."
              className="pl-10 pr-10 bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <AnimatePresence>
              {showResults && <SearchResults query={searchQuery} onClose={() => setShowResults(false)} />}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
