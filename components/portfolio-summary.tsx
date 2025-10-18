"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    label: "Total Portfolio Value",
    value: "$124,582.50",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Today's Gain/Loss",
    value: "+$2,847.32",
    change: "+2.34%",
    trend: "up",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    label: "Total Invested",
    value: "$98,450.00",
    change: "+26.5%",
    trend: "up",
    icon: Activity,
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "Best Performer",
    value: "AAPL",
    change: "+18.2%",
    trend: "up",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-500",
  },
]

export function PortfolioSummary() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="group relative overflow-hidden border-border bg-card p-4 transition-smooth hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 md:p-6">
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`}
            />

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-foreground md:text-2xl">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-success md:h-4 md:w-4" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive md:h-4 md:w-4" />
                  )}
                  <span
                    className={`text-xs font-semibold md:text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`rounded-xl bg-gradient-to-br ${stat.color} p-2 shadow-lg md:p-3`}>
                <stat.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
