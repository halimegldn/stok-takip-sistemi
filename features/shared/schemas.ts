import z from "zod";

const CURRENT_YEAR = new Date().getFullYear();

export const CarSchema = z.object({
    description: z.string().trim().optional(),
    brandId: z.string().cuid({ message: "Geçersiz marka kimliği" }),
});

export const ModelSchema = z.object({
    name: z.string().trim().min(2, { message: "En az 2 karakter giriniz" }).max(50, { message: "En fazla 50 karakter girebilirsiniz" }),
    year: z.coerce.number().int().min(1900, { message: "1900'den büyük bir yıl giriniz" }).max(CURRENT_YEAR, { message: `En fazla ${CURRENT_YEAR} yılı girebilirsiniz` }),
    brandId: z.string().cuid({ message: "Geçersiz marka kimliği" }),
});

export const BrandSchema = z.object({
    name: z.string().trim().min(2, { message: "En az 2 karakter giriniz" }).max(50, { message: "En fazla 50 karakter girebilirsiniz" }),
});
