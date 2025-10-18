"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockChart } from "@/components/stock-chart"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function MarketOverview() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStockData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stock/${selectedSymbol}`)
      const data = await response.json()
      setStockData(data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error fetching stock data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData()
  }, [selectedSymbol])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStockData()
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedSymbol])

  const formatLastUpdate = () => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return lastUpdate.toLocaleTimeString()
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">Market Overview</h3>
            <p className="text-sm text-muted-foreground">Real-time market data • Updated {formatLastUpdate()}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchStockData}
            disabled={loading}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <Tabs defaultValue="stocks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="stocks"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Stocks
            </TabsTrigger>
            <TabsTrigger
              value="crypto"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Crypto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META"].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => setSelectedSymbol(symbol)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    selectedSymbol === symbol
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <StockChart data={stockData} symbol={selectedSymbol} />
            )}
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["BTC", "ETH", "SOL", "ADA", "DOT", "MATIC", "AVAX"].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => setSelectedSymbol(symbol)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    selectedSymbol === symbol
                      ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                      : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
              </div>
            ) : (
              <StockChart data={stockData} symbol={selectedSymbol} />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
