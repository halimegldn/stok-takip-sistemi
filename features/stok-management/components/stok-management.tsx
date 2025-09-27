"use client";

import { useActionState, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Package, Plus, ShoppingCart, SquaresExclude } from "lucide-react";
import { SellCarFunction } from "@/features/stok-management/actions";

export type StockCardItem = {
    id: string;
    brandName: string;
    stock: number;
};

export function StokManagementComponent({ item }: { item: StockCardItem }) {
    const [state, formAction] = useActionState(SellCarFunction, null);

    const { id, brandName, stock } = item;

    const stockStatus = useMemo(() => {
        if (stock === 0) return { variant: "destructive" as const, label: "Tükendi" };
        if (stock <= 5) return { variant: "secondary" as const, label: "Az Stok" };
        return { variant: "default" as const, label: "Stokta" };
    }, [stock]);

    const [saleQuantity, setSaleQuantity] = useState(1);
    const dec = () => setSaleQuantity((q) => Math.max(1, q - 1));
    const inc = () => setSaleQuantity((q) => Math.min(stock, q + 1));

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-semibold text-lg">{brandName}</h3>
                    </div>
                    <Badge variant={stockStatus.variant} className="flex items-center space-x-1">
                        <SquaresExclude className="h-3 w-3" />
                        <span>{stockStatus.label}</span>
                    </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Stok: {stock} adet</span>
                    </div>
                </div>

                {stock > 0 && (
                    <form action={formAction} className="space-y-3">
                        <input type="hidden" name="id" value={id} />
                        <input type="hidden" name="quantity" value={saleQuantity} />

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Satış Adedi:</span>
                            <div className="flex items-center space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={dec}
                                    disabled={saleQuantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{saleQuantity}</span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={inc}
                                    disabled={saleQuantity >= stock}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Satış Yap ({saleQuantity} adet)
                        </Button>

                        {state?.success === false && (
                            <p className="text-destructive text-sm">{state.message ?? "Satış yapılamadı."}</p>
                        )}
                        {state?.success === true && (
                            <p className="text-green-600 text-sm">{state.message}</p>
                        )}
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
