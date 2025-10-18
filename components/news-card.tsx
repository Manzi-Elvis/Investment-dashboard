"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Newspaper, ExternalLink, TrendingUp, Bitcoin, Building2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface NewsItem {
  title: string
  source: string
  time: string
  url: string
  category: "stocks" | "crypto" | "general"
}

export function NewsCard() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<"all" | "stocks" | "crypto">("all")

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news")
        const data = await response.json()
        setNews(data.articles || [])
      } catch (error) {
        console.error("Error fetching news:", error)
        // Demo data with categories
        setNews([
          {
            title: "Tech Stocks Rally as Fed Signals Rate Pause",
            source: "Financial Times",
            time: "2 hours ago",
            url: "#",
            category: "stocks",
          },
          {
            title: "Apple Announces Record Q4 Earnings Beat Expectations",
            source: "Bloomberg",
            time: "4 hours ago",
            url: "#",
            category: "stocks",
          },
          {
            title: "Bitcoin Surges Past $45K on ETF Optimism",
            source: "CoinDesk",
            time: "6 hours ago",
            url: "#",
            category: "crypto",
          },
          {
            title: "Ethereum Network Upgrade Scheduled for Next Month",
            source: "CoinTelegraph",
            time: "7 hours ago",
            url: "#",
            category: "crypto",
          },
          {
            title: "Tesla Expands Production Capacity in Europe",
            source: "Reuters",
            time: "8 hours ago",
            url: "#",
            category: "stocks",
          },
          {
            title: "Global Markets Show Strong Growth in Q4",
            source: "Wall Street Journal",
            time: "9 hours ago",
            url: "#",
            category: "general",
          },
          {
            title: "Solana DeFi TVL Reaches New All-Time High",
            source: "The Block",
            time: "10 hours ago",
            url: "#",
            category: "crypto",
          },
          {
            title: "Microsoft Cloud Revenue Exceeds Analyst Forecasts",
            source: "CNBC",
            time: "11 hours ago",
            url: "#",
            category: "stocks",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const filteredNews = activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stocks":
        return <TrendingUp className="h-4 w-4" />
      case "crypto":
        return <Bitcoin className="h-4 w-4" />
      default:
        return <Building2 className="h-4 w-4" />
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Latest Market News</h3>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setActiveCategory(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-4">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredNews.map((item, index) => (
                    <motion.a
                      key={`${item.title}-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                      className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-background/50 p-4 transition-smooth hover:border-primary/50 hover:bg-background"
                    >
                      <div className="flex flex-1 gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            item.category === "crypto"
                              ? "bg-accent/20 text-accent"
                              : item.category === "stocks"
                                ? "bg-primary/20 text-primary"
                                : "bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold text-foreground group-hover:text-primary">{item.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{item.source}</span>
                            <span>•</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
