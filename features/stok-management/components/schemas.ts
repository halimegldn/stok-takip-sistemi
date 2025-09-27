import z from "zod";

export const SellByBrandSchema = z.object({
    brandId: z.string().cuid(),
    quantity: z.coerce.number().int().positive(),
});