// features/dashboard/components/brand-chart.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from "recharts"

type BrandWithCarsCount = {
    name: string
    _count: { cars: number }
}

export function BrandChart({ data }: { data: BrandWithCarsCount[] }) {
    const safe = Array.isArray(data) ? data : []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Marka Dağılımı</CardTitle>
                <CardDescription>Stoktaki araç sileceklerinin marka bazındaki dağılımı</CardDescription>
            </CardHeader>

            <CardContent>
                {safe.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Gösterilecek veri yok.</div>
                ) : (
                    <div className="w-full min-w-0">
                        <ResponsiveContainer width="100%" height={300} debounce={200}>
                            <BarChart data={safe} barCategoryGap={18}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.95} />
                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.55} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                                <YAxis axisLine={false} tickLine={false} width={36} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />

                                <Tooltip
                                    wrapperStyle={{ borderRadius: 10 }}
                                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                                    cursor={{ fill: "var(--muted)", opacity: 0.25 }}
                                    formatter={(v: number | string) => [`${Number(v).toLocaleString("tr-TR")} adet`, "Araç"]}
                                />

                                <Bar
                                    dataKey="_count.cars"
                                    fill="url(#barGradient)"
                                    radius={[10, 10, 8, 8]}
                                    isAnimationActive
                                    animationDuration={600}
                                    animationBegin={80}
                                    activeBar={<Rectangle radius={[10, 10, 8, 8]} fill="var(--primary)" />}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
