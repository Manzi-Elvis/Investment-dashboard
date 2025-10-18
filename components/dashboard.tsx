"use client"

import { PortfolioSummary } from "@/components/portfolio-summary"
import { MarketOverview } from "@/components/market-overview"
import { WatchlistCard } from "@/components/watchlist-card"
import { NewsCard } from "@/components/news-card"
import { AIInsights } from "@/components/ai-insights"
import { motion } from "framer-motion"

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Welcome back, Elvis</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Here's what's happening with your investments today
        </p>
      </motion.div>

      {/* Portfolio summary cards */}
      <PortfolioSummary />

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Market overview - takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          <WatchlistCard />
          <AIInsights />
        </div>
      </div>

      {/* News section - full width */}
      <NewsCard />
    </div>
  )
}
