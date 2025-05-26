"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, XCircle, ChevronDown, ChevronRight } from "lucide-react"

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

export default function RecentTransactions() {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription>
            Your most recent cryptocurrency payments
          </CardDescription>
        </div>
        <Button variant="outline" className="ml-auto gap-1">
          View All <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="transition-colors hover:bg-muted/30 cursor-pointer"
              >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}