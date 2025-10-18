"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { motion } from "framer-motion"

const insights = [
  {
    type: "bullish",
    icon: TrendingUp,
    title: "Strong Buy Signal",
    description: "AAPL showing bullish momentum with RSI at 65",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Volatility Alert",
    description: "TSLA experiencing high volatility, consider stop-loss",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    type: "info",
    icon: Info,
    title: "Diversification Tip",
    description: "Consider adding more tech sector exposure",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function AIInsights() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">AI Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group flex gap-3 rounded-lg border border-border bg-background/50 p-3 transition-smooth hover:border-primary/50 hover:bg-background"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${insight.bgColor}`}>
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-sm font-semibold text-foreground">{insight.title}</h4>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
