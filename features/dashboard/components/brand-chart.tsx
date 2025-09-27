"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { marka: "Toyota", adet: 45 },
    { marka: "Honda", adet: 38 },
    { marka: "Ford", adet: 32 },
    { marka: "Volkswagen", adet: 28 },
    { marka: "BMW", adet: 25 },
    { marka: "Mercedes", adet: 22 },
]

export function BrandChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Marka Dağılımı</CardTitle>
                <CardDescription>Stokta bulunan araç sileceklerinin marka bazında dağılımı</CardDescription>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} barCategoryGap={18}>
                        {/* yalnızca grafik stili */}
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                {/* oklch değişkenlerini doğrudan kullan */}
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.95} />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.55} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            opacity={0.5}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="marka"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={36}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        />

                        <Tooltip
                            wrapperStyle={{ borderRadius: 10 }}
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                            }}
                            // SVG cursor için: fill + opacity ayrı veriliyor
                            cursor={{ fill: "var(--muted)", opacity: 0.25 }}
                            formatter={(v: number) => [`${v.toLocaleString("tr-TR")} adet`, ""]}
                        />

                        <Bar
                            dataKey="adet"
                            fill="url(#barGradient)"
                            isAnimationActive
                            animationDuration={600}
                            animationBegin={80}
                            activeBar={{ fill: "var(--primary)" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
