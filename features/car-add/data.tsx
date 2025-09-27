import { prisma } from "@/prisma/prisma";


export async function GetBrands() {
    const brands = await prisma.brand.findMany({
        select: { id: true, name: true },
        orderBy: { createdAt: "desc" },
    });
    return brands;
}

export async function GetCars() {
    const cars = await prisma.car.findMany({
        select: {
            id: true,
            description: true,
            brand: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    return cars;
}

export async function GetModels() {
    const models = await prisma.model.findMany({
        select: {
            id: true,
            name: true,
            year: true,
            brandId: true,
        },
        orderBy: { createdAt: "desc" },
    });
    return models;
}

export async function GetBrandsWithCarCounts() {
    const brands = await prisma.brand.findMany({
        select: {
            id: true,
            name: true,
            _count: { select: { cars: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    return brands;
}

export async function getTotals() {
    const [totalCars, totalBrands, totalModels] = await Promise.all([
        prisma.car.count(),
        prisma.brand.count(),
        prisma.model.count(),
    ]);

    return { totalCars, totalBrands, totalModels };
}
