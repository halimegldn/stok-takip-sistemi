"use server";

import { prisma } from "@/prisma/prisma";
import { CarSchema } from "../shared/schemas";


export async function CarAddFunction(prevState: any, formData: FormData) {
    const parsed = CarSchema.safeParse({
        description: formData.get("description"),
        brandId: formData.get("brandId"),
    });

    if (!parsed.success) {
        return {
            success: false,
            data: parsed.error.flatten().fieldErrors,
            message: "Araba eklenemedi.",
        };
    }

    const { description, brandId } = parsed.data;

    try {
        const car = await prisma.car.create({
            data: { description: description, brandId },
        });

        return { success: true, data: car, message: "Araba eklendi." };
    } catch (error) {
        console.error(error);
        return { success: false, data: null, message: "Araba eklenemedi." };
    }
}