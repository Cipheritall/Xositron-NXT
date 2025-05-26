"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Users, CreditCard, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: number
  trendLabel: string
}

function StatsCard({ title, value, description, icon, trend, trendLabel }: StatsCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center text-xs">
          <span
            className={cn(
              "mr-1",
              trend > 0
                ? "text-green-500"
                : trend < 0
                ? "text-red-500"
                : "text-gray-500"
            )}
          >
            {trend > 0 ? (
              <ArrowUpIcon className="h-3 w-3" />
            ) : (
              <ArrowDownIcon className="h-3 w-3" />
            )}
          </span>
          <span
            className={cn(
              "font-medium",
              trend > 0
                ? "text-green-500"
                : trend < 0
                ? "text-red-500"
                : "text-gray-500"
            )}
          >
            {trend}%
          </span>{" "}
          <span className="ml-1 text-muted-foreground">{trendLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardStats() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231.89"
            description="152 payments this month"
            icon={<DollarSign className="h-4 w-4" />}
            trend={12}
            trendLabel="from last month"
          />
          <StatsCard
            title="New Customers"
            value="2,350"
            description="32 new today"
            icon={<Users className="h-4 w-4" />}
            trend={5.2}
            trendLabel="from yesterday"
          />
          <StatsCard
            title="Active Payments"
            value="12,234"
            description="312 processing"
            icon={<CreditCard className="h-4 w-4" />}
            trend={-2.1}
            trendLabel="from yesterday"
          />
          <StatsCard
            title="Conversion Rate"
            value="2.4%"
            description="24 conversions today"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={1.2}
            trendLabel="from yesterday"
          />
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Average Transaction"
            value="$235.89"
            description="Based on 152 payments"
            icon={<DollarSign className="h-4 w-4" />}
            trend={3.2}
            trendLabel="from last week"
          />
          <StatsCard
            title="Customer Retention"
            value="78%"
            description="12% improvement"
            icon={<Users className="h-4 w-4" />}
            trend={12}
            trendLabel="from last month"
          />
          <StatsCard
            title="Success Rate"
            value="96.5%"
            description="3.5% failed"
            icon={<CreditCard className="h-4 w-4" />}
            trend={0.5}
            trendLabel="from yesterday"
          />
          <StatsCard
            title="Traffic Sources"
            value="Direct: 65%"
            description="Referral: 35%"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={5}
            trendLabel="from last month"
          />
        </div>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Monthly Growth"
            value="23.5%"
            description="Compared to 18.2% last month"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={5.3}
            trendLabel="from last month"
          />
          <StatsCard
            title="Top Currency"
            value="Bitcoin (BTC)"
            description="45% of transactions"
            icon={<CreditCard className="h-4 w-4" />}
            trend={7}
            trendLabel="from last month"
          />
          <StatsCard
            title="Average Fee"
            value="$2.34"
            description="Per transaction"
            icon={<DollarSign className="h-4 w-4" />}
            trend={-0.5}
            trendLabel="from yesterday"
          />
          <StatsCard
            title="Support Tickets"
            value="12"
            description="4 open, 8 resolved"
            icon={<Users className="h-4 w-4" />}
            trend={-25}
            trendLabel="from last week"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}