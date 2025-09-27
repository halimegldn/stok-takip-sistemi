"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export function StokFilter({ brands, years, current, }: { brands: string[]; years: number[]; current: { brand: string; year: string; model: string }; }) {
    const [brand, setBrand] = useState(current.brand ?? "all");
    const [year, setYear] = useState(current.year ?? "all");

    const hasActive =
        (brand && brand !== "all") ||
        (year && year !== "all") ||
        (current.model && current.model.trim().length > 0);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-accent" />
                        <CardTitle>Filtrele</CardTitle>
                    </div>
                    {hasActive && (
                        <Button variant="outline" size="sm" asChild>
                            <a href="?">
                                <X className="h-4 w-4 mr-1" />
                                Temizle
                            </a>
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <form method="GET" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Marka */}
                        <div className="space-y-2">
                            <Label>Marka</Label>
                            <Select value={brand} onValueChange={setBrand}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tüm markalar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm markalar</SelectItem>
                                    {brands.map((b) => (
                                        <SelectItem key={b} value={b}>
                                            {b}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="brand" value={brand} />
                        </div>

                        {/* Yıl */}
                        <div className="space-y-2">
                            <Label>Yıl</Label>
                            <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tüm yıllar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm yıllar</SelectItem>
                                    {years.map((y) => (
                                        <SelectItem key={y} value={String(y)}>
                                            {y}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="year" value={year} />
                        </div>
                    </div>

                    {/* Model arama */}
                    <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            name="model"
                            placeholder="Model ara..."
                            defaultValue={current.model ?? ""}
                        />
                    </div>

                    <Button type="submit" className="w-full">Uygula</Button>
                </form>
            </CardContent>
        </Card>
    );
}
