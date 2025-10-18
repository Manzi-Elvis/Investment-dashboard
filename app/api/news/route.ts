import { NextResponse } from "next/server"

export async function GET() {
  // Mock news data with categories for demo purposes
  // In production, you would fetch from a real news API like NewsAPI, Finnhub, or Alpha Vantage

  const articles = [
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
  ]

  return NextResponse.json({ articles, timestamp: new Date().toISOString() })
}
