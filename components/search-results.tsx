"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface SearchResult {
  symbol: string
  name: string
  type: "stock" | "crypto"
  price: number
  change: number
  isInWatchlist: boolean
}

interface SearchResultsProps {
  query: string
  onClose: () => void
}

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchAssets = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)

      // Simulate API call - in production, fetch from real API
      await new Promise((resolve) => setTimeout(resolve, 300))

      const mockResults: SearchResult[] = [
        { symbol: "AAPL", name: "Apple Inc.", type: "stock", price: 178.25, change: 2.34, isInWatchlist: true },
        { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock", price: 142.5, change: -1.12, isInWatchlist: true },
        { symbol: "MSFT", name: "Microsoft Corp.", type: "stock", price: 378.91, change: 1.45, isInWatchlist: false },
        { symbol: "AMZN", name: "Amazon.com Inc.", type: "stock", price: 152.33, change: 0.87, isInWatchlist: false },
        { symbol: "BTC", name: "Bitcoin", type: "crypto", price: 43250.0, change: 3.45, isInWatchlist: true },
        { symbol: "ETH", name: "Ethereum", type: "crypto", price: 2280.5, change: 2.12, isInWatchlist: false },
      ]

      const filtered = mockResults.filter(
        (item) =>
          item.symbol.toLowerCase().includes(query.toLowerCase()) ||
          item.name.toLowerCase().includes(query.toLowerCase()),
      )

      setResults(filtered)
      setLoading(false)
    }

    searchAssets()
  }, [query])

  const toggleWatchlist = (symbol: string) => {
    setResults((prev) =>
      prev.map((item) => (item.symbol === symbol ? { ...item, isInWatchlist: !item.isInWatchlist } : item)),
    )

    // Update localStorage
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const result = results.find((r) => r.symbol === symbol)

    if (result?.isInWatchlist) {
      const filtered = watchlist.filter((item: any) => item.symbol !== symbol)
      localStorage.setItem("watchlist", JSON.stringify(filtered))
    } else if (result) {
      watchlist.push({
        symbol: result.symbol,
        name: result.name,
        price: result.price,
        change: result.change,
      })
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }

    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full z-50 mt-2"
    >
      <Card className="max-h-[400px] overflow-y-auto border-border bg-card shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : results.length > 0 ? (
          <div className="p-2">
            {results.map((result, index) => (
              <motion.div
                key={result.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between rounded-lg p-3 transition-smooth hover:bg-accent/10"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      result.type === "crypto" ? "bg-accent/20" : "bg-primary/20"
                    }`}
                  >
                    <span className="text-sm font-bold text-foreground">{result.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{result.symbol}</p>
                    <p className="text-xs text-muted-foreground">{result.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${result.price.toFixed(2)}</p>
                    <div className="flex items-center justify-end gap-1">
                      {result.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className={`text-xs ${result.change >= 0 ? "text-success" : "text-destructive"}`}>
                        {result.change >= 0 ? "+" : ""}
                        {result.change}%
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleWatchlist(result.symbol)}
                  >
                    <Star
                      className={`h-4 w-4 transition-colors ${
                        result.isInWatchlist ? "fill-warning text-warning" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
          </div>
        )}
      </Card>
    </motion.div>
  )
}
