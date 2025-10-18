"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, TrendingUp, Star, Newspaper, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Markets", active: false },
  { icon: Star, label: "Watchlist", active: false },
  { icon: Newspaper, label: "News", active: false },
  { icon: Sparkles, label: "AI Insights", active: false },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden bg-card/80 backdrop-blur-xl border border-border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card/80 backdrop-blur-xl",
          "md:relative md:translate-x-0 transition-transform duration-300",
          !isOpen && "-translate-x-full md:translate-x-0",
        )}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">InvestPro</h1>
                <p className="text-xs text-muted-foreground">by Elvis</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-smooth",
                    item.active && "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Upgrade card */}
          <div className="border-t border-border p-4">
            <motion.div
              className="rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 p-4 border border-blue-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Upgrade to Pro</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Get advanced analytics and real-time alerts
              </p>
              <Button
                className="mt-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
                size="sm"
              >
                Upgrade Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
