"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { useTheme } from "next-themes"

interface TransactionChartProps {
  period: "24h" | "7d" | "30d" | "90d"
}

// Sample data - in a real app, this would come from an API
const generateChartData = (period: string) => {
  let data: { name: string; amount: number }[] = []
  
  if (period === "24h") {
    // Generate hourly data for 24 hours
    for (let i = 0; i < 24; i++) {
      data.push({
        name: `${i}:00`,
        amount: Math.floor(Math.random() * 5000) + 1000
      })
    }
  } else if (period === "7d") {
    // Generate daily data for 7 days
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (let i = 0; i < 7; i++) {
      data.push({
        name: days[i],
        amount: Math.floor(Math.random() * 20000) + 5000
      })
    }
  } else if (period === "30d") {
    // Generate data for 30 days
    for (let i = 1; i <= 30; i++) {
      data.push({
        name: `${i}`,
        amount: Math.floor(Math.random() * 50000) + 10000
      })
    }
  } else {
    // Generate data for 90 days (by weeks)
    for (let i = 1; i <= 13; i++) {
      data.push({
        name: `Week ${i}`,
        amount: Math.floor(Math.random() * 200000) + 50000
      })
    }
  }
  
  return data
}

export default function TransactionChart({ period }: TransactionChartProps) {
  const { theme } = useTheme()
  const data = generateChartData(period)
  
  // Format labels based on period
  const formatLabel = (period: string) => {
    switch(period) {
      case "24h": return "Hourly Transactions"
      case "7d": return "Daily Transactions"
      case "30d": return "30-Day Transactions"
      case "90d": return "Quarterly Transactions"
      default: return "Transactions"
    }
  }
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <Card className="h-[350px] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{formatLabel(period)}</CardTitle>
        <CardDescription>
          Transaction volume over time
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'hsl(var(--muted))' : '#eee'} vertical={false} />
            <XAxis 
              dataKey="name"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={{ stroke: 'hsl(var(--muted))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={{ stroke: 'hsl(var(--muted))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value as number), 'Amount']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}