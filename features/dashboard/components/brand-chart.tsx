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
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="marka" className="text-xs" tick={{ fontSize: 12 }} />
                        <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                        />
                        <Bar dataKey="adet" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
