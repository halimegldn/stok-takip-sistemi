import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="bg-accent/10 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-accent" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
                {trend && (
                    <div className={`text-xs mt-1 ${trend.isPositive ? "text-success" : "text-destructive"}`}>
                        {trend.isPositive ? "+" : ""}
                        {trend.value}% önceki aya göre
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
