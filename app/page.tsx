import { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import PaymentMethodDistribution from "@/components/dashboard/payment-method-distribution"
import TransactionChart from "@/components/dashboard/transaction-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Dashboard - CryptoFlow",
  description: "Cryptocurrency payment dashboard",
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      
      <div className="p-6 space-y-6 pb-16">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="7d" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Transaction Volume</h2>
                <TabsList>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                  <TabsTrigger value="90d">90d</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="24h" className="mt-0">
                <TransactionChart period="24h" />
              </TabsContent>
              
              <TabsContent value="7d" className="mt-0">
                <TransactionChart period="7d" />
              </TabsContent>
              
              <TabsContent value="30d" className="mt-0">
                <TransactionChart period="30d" />
              </TabsContent>
              
              <TabsContent value="90d" className="mt-0">
                <TransactionChart period="90d" />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <PaymentMethodDistribution />
          </div>
        </div>
        
        <RecentTransactions />
      </div>
    </div>
  )
}