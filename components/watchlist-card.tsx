"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Plus, TrendingUp, TrendingDown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
}

export function WatchlistCard() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])

  const loadWatchlist = () => {
    const saved = localStorage.getItem("watchlist")
    if (saved) {
      setWatchlist(JSON.parse(saved))
    } else {
      const demoWatchlist = [
        { symbol: "AAPL", name: "Apple Inc.", price: 178.25, change: 2.34 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.5, change: -1.12 },
        { symbol: "TSLA", name: "Tesla Inc.", price: 242.8, change: 5.67 },
        { symbol: "BTC", name: "Bitcoin", price: 43250.0, change: 3.45 },
      ]
      setWatchlist(demoWatchlist)
      localStorage.setItem("watchlist", JSON.stringify(demoWatchlist))
    }
  }

  useEffect(() => {
    loadWatchlist()

    // Listen for storage changes from search component
    const handleStorageChange = () => {
      loadWatchlist()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const removeFromWatchlist = (symbol: string) => {
    const updated = watchlist.filter((item) => item.symbol !== symbol)
    setWatchlist(updated)
    localStorage.setItem("watchlist", JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" fill="currentColor" />
            <h3 className="font-bold text-foreground">Watchlist</h3>
            <span className="text-xs text-muted-foreground">({watchlist.length})</span>
          </div>
          <Button size="sm" variant="ghost" title="Use search to add items">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {watchlist.length > 0 ? (
              watchlist.map((item, index) => (
                <motion.div
                  key={item.symbol}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="group flex items-center justify-between rounded-lg border border-border bg-background/50 p-3 transition-smooth hover:border-primary/50 hover:bg-background"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.symbol}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-end gap-1">
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-xs ${item.change >= 0 ? "text-success" : "text-destructive"}`}>
                          {item.change >= 0 ? "+" : ""}
                          {item.change}%
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => removeFromWatchlist(item.symbol)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                Your watchlist is empty. Use search to add items.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}
