"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

interface StockChartProps {
  data: any
  symbol: string
}

export function StockChart({ data, symbol }: StockChartProps) {
  // Generate realistic chart data
  const generateChartData = () => {
    const points = 30
    const basePrice = Math.random() * 200 + 50
    const chartData = []

    for (let i = 0; i < points; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (points - i))
      const variance = (Math.random() - 0.5) * 10
      const price = basePrice + variance + i * 0.5

      chartData.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: Number.parseFloat(price.toFixed(2)),
      })
    }

    return chartData
  }

  const chartData = data?.chartData || generateChartData()
  const currentPrice = chartData[chartData.length - 1]?.price || 0
  const previousPrice = chartData[0]?.price || 0
  const priceChange = currentPrice - previousPrice
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-2xl font-bold text-foreground">${currentPrice.toFixed(2)}</h4>
          <div className="mt-1 flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? "+" : ""}${priceChange.toFixed(2)} ({isPositive ? "+" : ""}
              {percentChange}%)
            </span>
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[350px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" opacity={0.3} />
            <XAxis dataKey="date" stroke="rgb(var(--color-muted-foreground))" fontSize={12} tickLine={false} />
            <YAxis
              stroke="rgb(var(--color-muted-foreground))"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--color-card))",
                border: "1px solid rgb(var(--color-border))",
                borderRadius: "8px",
                color: "rgb(var(--color-foreground))",
              }}
              formatter={(value: any) => [`$${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
              strokeWidth={2}
              dot={false}
              fill="url(#colorPrice)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
