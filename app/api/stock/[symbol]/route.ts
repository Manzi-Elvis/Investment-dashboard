import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params

  // Generate realistic mock data for demo purposes
  // In production, you would fetch from a real API like Alpha Vantage, Finnhub, or Yahoo Finance

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

  const data = {
    symbol,
    chartData: generateChartData(),
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(data)
}
