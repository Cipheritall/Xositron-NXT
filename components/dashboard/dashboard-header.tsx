"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { CalendarIcon, Download, Filter, Plus, SearchIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "../ui/date-range-picker"

export default function DashboardHeader() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <div className="border-b">
      <div className="flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center gap-4 p-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto sm:ml-auto">
          <div className="w-full sm:w-auto">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-full sm:w-72 rounded-full bg-background pl-8 md:w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <DateRangePicker date={date} setDate={setDate} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Filter by status</DropdownMenuItem>
                <DropdownMenuItem>Filter by amount</DropdownMenuItem>
                <DropdownMenuItem>Filter by currency</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="rounded-full whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> New Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}