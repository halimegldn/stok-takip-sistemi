"use client";

import { useActionState, useMemo, useState, useEffect } from "react";
import type { Brand, Model } from "@/lib/generated/prisma/client";
import { CarAddFunction } from "../actions";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Car, Plus } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();
const fallbackYears = Array.from({ length: 30 }, (_, i) => (CURRENT_YEAR - i).toString());

export function CarAddForm({ brands, models }: { brands: Brand[]; models: Model[] }) {
    const [state, formAction] = useActionState(CarAddFunction, null);

    const [brandId, setBrandId] = useState("");
    const [modelId, setModelId] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");

    // 1) Gösterilecek modeller: marka seçildiyse o markanın modelleri, değilse tüm modeller
    const displayModels = useMemo(
        () => (brandId ? models.filter(m => m.brandId === brandId) : models),
        [brandId, models]
    );

    // 2) Gösterilen modellere göre yıl seçenekleri
    const yearOptions = useMemo(() => {
        const ys = new Set<string>();
        displayModels.forEach((m) => ys.add(String(m.year)));
        const arr = Array.from(ys).sort((a, b) => Number(b) - Number(a));
        return arr.length ? arr : fallbackYears;
    }, [displayModels]);

    // 3) Marka değiştiğinde, model selectini güncelle
    useEffect(() => {
        if (modelId && !displayModels.some((m) => m.id === modelId)) {
            setModelId("");
        }
    }, [brandId, displayModels, modelId]);


    return (
        <Card className="max-w-2xl mx-auto my-10">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <div className="bg-accent/10 p-2 rounded-lg">
                        <Car className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                        <CardTitle>Yeni Araç Ekle</CardTitle>
                        <CardDescription>Marka zorunlu, model/yıl açık; açıklama opsiyonel.</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <form action={formAction} className="space-y-6">
                    {/* MARKA (Zorunlu) */}
                    <div className="space-y-2">
                        <Label htmlFor="brand">Marka *</Label>
                        <Select value={brandId} onValueChange={(v) => setBrandId(v)}>
                            <SelectTrigger id="brand">
                                <SelectValue placeholder="Marka seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {brands.map((b) => (
                                    <SelectItem key={b.id} value={b.id}>
                                        {b.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="brandId" value={brandId} />
                        {state?.data?.brandId?.length ? (
                            <p className="text-destructive text-sm">{state.data.brandId[0]}</p>
                        ) : null}
                    </div>

                    {/* MODEL (Her zaman açık) */}
                    <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Select value={modelId} onValueChange={setModelId}>
                            <SelectTrigger id="model">
                                <SelectValue placeholder={brandId ? "Model seçin" : "Model seçin (tümü listelenir)"} />
                            </SelectTrigger>
                            <SelectContent>
                                {displayModels.map((m) => (
                                    <SelectItem key={m.id} value={m.id}>
                                        {m.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="modelId" value={modelId} />
                    </div>

                    {/* YIL (Her zaman açık) */}
                    <div className="space-y-2">
                        <Label htmlFor="year">Yıl</Label>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger id="year">
                                <SelectValue placeholder="Yıl seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearOptions.map((y) => (
                                    <SelectItem key={y} value={y}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* AÇIKLAMA (Opsiyonel) */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Açıklama (Opsiyonel)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="İsterseniz ek bilgi girin"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                        {state?.data?.description?.length ? (
                            <p className="text-destructive text-sm">{state.data.description[0]}</p>
                        ) : null}
                    </div>

                    <Button type="submit" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Kaydet
                    </Button>

                    {state?.success === true && <p className="text-green-600 text-sm mt-2">Araç başarıyla eklendi.</p>}
                    {state?.success === false && (
                        <p className="text-destructive text-sm mt-2">{state?.message ?? "Araba eklenemedi."}</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
