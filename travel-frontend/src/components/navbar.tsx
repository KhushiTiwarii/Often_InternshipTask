"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Plane } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Create Itinerary", href: "/create" },
    { name: "View Itineraries", href: "/itineraries" },
    { name: "Recommendations", href: "/recommendations" },
    {name: "AI-Recommendation", href:"/ai-itineraries"}
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <Link href="/" className="font-bold text-xl">
            Travel Planner
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/create" className="hidden md:block">
            <Button>Create Itinerary</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
