import { CarAddForm } from "@/features/car-add/components/car-add.";
import { GetBrands, GetModels } from "@/features/car-add/data";
import { Brand, Model } from "@/lib/generated/prisma/client";

export default async function CarAddPage() {
    const models = await GetModels();
    const brands = await GetBrands();
    return (
        <CarAddForm models={models} brands={brands} />
    )
}