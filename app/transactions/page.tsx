"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const metadata: Metadata = {
  title: "Transactions - CryptoFlow",
  description: "Manage your crypto transactions",
}

// Sample data - in a real app, this would come from an API
const transactions = [
  {
    id: "T-1234",
    customer: {
      name: "Olivia Wilson",
      email: "olivia@example.com",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$1,250.00",
    currency: "BTC",
    status: "completed",
    date: "2025-04-20T09:30:00Z"
  },
  {
    id: "T-1235",
    customer: {
      name: "Noah Smith",
      email: "noah@example.com",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$890.50",
    currency: "ETH",
    status: "processing",
    date: "2025-04-20T08:45:00Z"
  },
  {
    id: "T-1236",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$45.99",
    currency: "USDC",
    status: "completed",
    date: "2025-04-20T07:30:00Z"
  },
  {
    id: "T-1237",
    customer: {
      name: "William Johnson",
      email: "william@example.com",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$3,400.00",
    currency: "BTC",
    status: "failed",
    date: "2025-04-20T07:15:00Z"
  },
  {
    id: "T-1238",
    customer: {
      name: "Sophia Brown",
      email: "sophia@example.com",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$175.25",
    currency: "SOL",
    status: "completed",
    date: "2025-04-20T06:50:00Z"
  },
  {
    id: "T-1239",
    customer: {
      name: "James Miller",
      email: "james@example.com",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$550.75",
    currency: "ETH",
    status: "completed",
    date: "2025-04-19T22:15:00Z"
  },
  {
    id: "T-1240",
    customer: {
      name: "Isabella Taylor",
      email: "isabella@example.com",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$75.20",
    currency: "USDC",
    status: "processing",
    date: "2025-04-19T21:40:00Z"
  },
  {
    id: "T-1241",
    customer: {
      name: "Liam Anderson",
      email: "liam@example.com",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    amount: "$1,850.00",
    currency: "BTC",
    status: "completed",
    date: "2025-04-19T20:30:00Z"
  }
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const StatusBadge = ({ status }: { status: string }) => {
  let variant: "outline" | "secondary" | "destructive" = "outline"
  let icon = null

  switch(status) {
    case "completed":
      variant = "secondary"
      icon = <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
      break
    case "processing":
      variant = "outline"
      icon = <Clock className="mr-1 h-3 w-3 text-yellow-500" />
      break
    case "failed":
      variant = "destructive"
      icon = <XCircle className="mr-1 h-3 w-3" />
      break
  }

  return (
    <Badge variant={variant} className={cn(
      "flex items-center",
      status === "completed" && "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700",
      status === "processing" && "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
    )}>
      {icon}
      <span className="capitalize">{status}</span>
    </Badge>
  )
}

export default function TransactionsPage() {
  const [date, setDate] = useState<DateRange | undefined>()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-lg font-semibold md:text-2xl">Transactions</h1>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-72 rounded-full bg-background pl-8 md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DateRangePicker date={date} setDate={setDate} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 rounded-full">
                  <Filter className="h-4 w-4" /> Filter
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>All Transactions</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Processing</DropdownMenuItem>
                <DropdownMenuItem>Failed</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Bitcoin (BTC)</DropdownMenuItem>
                <DropdownMenuItem>Ethereum (ETH)</DropdownMenuItem>
                <DropdownMenuItem>USDC</DropdownMenuItem>
                <DropdownMenuItem>Solana (SOL)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              {filteredTransactions.length} transactions found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      Transaction ID <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      Customer <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      Amount <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      Status <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-primary transition-colors">
                      Date <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={transaction.customer.image} alt={transaction.customer.name} />
                            <AvatarFallback>
                              {transaction.customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{transaction.customer.name}</span>
                            <span className="text-xs text-muted-foreground">{transaction.customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{transaction.amount}</span>
                          <span className="text-xs text-muted-foreground">{transaction.currency}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                      <TableCell className="text-right">{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Download receipt</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Contact customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}