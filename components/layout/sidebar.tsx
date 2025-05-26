"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModeToggle } from '@/components/mode-toggle'
import { useAuth } from '@/components/auth-provider'
import {
  LayoutDashboard,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Key,
  Zap
} from 'lucide-react'

type SidebarItem = {
  name: string
  href: string
  icon: React.ReactNode
}

const mainNav: SidebarItem[] = [
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: 'Transactions', href: '/transactions', icon: <CreditCard className="h-5 w-5" /> },
  { name: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" /> },
  { name: 'Payment Methods', href: '/payment-methods', icon: <Wallet className="h-5 w-5" /> },
  { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="h-5 w-5" /> }
]

const secondaryNav: SidebarItem[] = [
  { name: 'API Keys', href: '/api-keys', icon: <Key className="h-5 w-5" /> },
  { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <div 
      className={cn(
        "group relative flex flex-col border-r bg-card text-card-foreground h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center p-4 h-16">
        {!collapsed && (
          <Link href="/\" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-chart-1" />
            <span className="font-bold text-lg">Xositron</span>
          </Link>
        )}
        {collapsed && (
          <Zap className="h-6 w-6 mx-auto text-chart-1" />
        )}
      </div>

      <Button 
        variant="ghost" 
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-sm z-10 hidden group-hover:flex"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          <div className="py-2">
            {!collapsed && <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">MAIN</p>}
            {mainNav.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 mb-1",
                  collapsed && "justify-center px-2"
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </Button>
            ))}
          </div>

          <div className="py-2">
            {!collapsed && <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">SETTINGS</p>}
            {secondaryNav.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 mb-1",
                  collapsed && "justify-center px-2"
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4 border-t flex items-center gap-2">
        {collapsed ? (
          <ModeToggle />
        ) : (
          <>
            <Button variant="outline\" size="icon\" className="rounded-full">
              <img 
                src={user?.user_metadata?.avatar_url || "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                alt={user?.email || "User"} 
                className="rounded-full object-cover w-8 h-8" 
              />
            </Button>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground truncate">User</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}