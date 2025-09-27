"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { SellByBrandSchema } from "./components/schemas";


export async function SellCarFunction(prevState: any, formData: FormData) {
    const parsed = SellByBrandSchema.safeParse({
        brandId: formData.get("id"),
        quantity: formData.get("quantity"),
    });

    if (!parsed.success) {
        return {
            success: false,
            message: "Geçersiz veri.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const { brandId, quantity } = parsed.data;

    try {
        // 1) Mevcut stok
        const current = await prisma.car.count({ where: { brandId } });
        if (current < quantity) {
            return { success: false, message: "Yetersiz stok." };
        }

        // 2) Satılacak kayıtları seçme alanı
        const toSell = await prisma.car.findMany({
            where: { brandId },
            select: { id: true },
            orderBy: { createdAt: "asc" },
            take: quantity,
        });
        if (toSell.length < quantity) {
            return { success: false, message: "Yetersiz stok." };
        }

        // 3) Stoktan silme
        const ids = toSell.map((c) => c.id);
        const { count } = await prisma.car.deleteMany({
            where: { id: { in: ids } },
        });

        if (count !== ids.length) {
            return {
                success: false,
                message: "İşlem çakışması: Bazı satırlar silinemedi. Lütfen tekrar deneyin.",
            };
        }

        revalidatePath("/stok-management");
        return { success: true, message: "Satış başarıyla işlendi." };
    } catch (err: any) {
        console.error(err);
        return { success: false, message: err?.message ?? "Satış yapılamadı." };
    }
}
