"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModeToggle } from '@/components/mode-toggle'
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
  Zap,
  Menu
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
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={cn(
          "fixed md:relative flex flex-col border-r bg-card text-card-foreground h-screen transition-all duration-300 ease-in-out z-50",
          collapsed ? "w-[70px]" : "w-[240px]",
          isMobile && !isOpen && "translate-x-[-100%]",
          isMobile && isOpen && "translate-x-0"
        )}
      >
        <div className="flex items-center p-4 h-16">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-chart-1" />
              <span className="font-bold text-lg">Xositron</span>
            </Link>
          )}
          {collapsed && (
            <Zap className="h-6 w-6 mx-auto text-chart-1" />
          )}
        </div>

        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-sm z-10 hidden group-hover:flex md:flex"
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        )}

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
                  onClick={() => isMobile && setIsOpen(false)}
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
                  onClick={() => isMobile && setIsOpen(false)}
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
              <Button variant="outline" size="icon" className="rounded-full">
                <img src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="rounded-full object-cover w-8 h-8" 
                />
              </Button>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}