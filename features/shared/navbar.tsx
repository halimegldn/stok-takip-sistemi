"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, BarChart3, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./theme-button"

export function Navbar() {
    const pathname = usePathname()

    const navigation = [
        { name: "Dashboard", href: "/", icon: BarChart3 },
        { name: "Araç Ekle", href: "/car-add", icon: Plus },
        { name: "Stok Yönetimi", href: "/stok-management", icon: Filter },
    ]

    return (
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                                <Car className="h-6 w-6" />
                            </div>
                            <span className="font-bold text-xl">StokTakip</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Button
                                    key={item.name}
                                    variant={isActive ? "default" : "ghost"}
                                    asChild
                                    className={cn("flex items-center space-x-2", isActive && "bg-accent text-accent-foreground")}
                                >

                                    <Link href={item.href}>
                                        <Icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                </Button>
                            )
                        })}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}
