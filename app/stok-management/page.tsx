import { GetBrands, GetCars, GetModels, getTotals } from "@/features/car-add/data";
import { StokManagementComponent } from "@/features/stok-management/components/stok-management";
import { StokFilter } from "@/features/stok-management/components/stok-filter";

export default async function StokManagementPage({ searchParams }: { searchParams?: { brand?: string, year?: string, model?: string } }) {
    //Total veriler
    const [{ totalCars, totalBrands, totalModels }, [brands, cars, models]] = await Promise.all([
        getTotals(),
        Promise.all([GetBrands(), GetCars(), GetModels()]),
    ]);

    // Stok bilgileri 
    const brandStockMap = new Map<string, number>();
    for (const c of cars) {
        const id = c.brand.id;
        brandStockMap.set(id, (brandStockMap.get(id) ?? 0) + 1);
    }

    // Kart bilgileri
    const items = brands.map((b) => ({
        id: b.id,
        brandName: b.name,
        stock: brandStockMap.get(b.id) ?? 0,
    }));

    // Filtre seçenekleri
    const brandNames = brands.map((b) => b.name);
    const years = Array.from(new Set(models.map((m) => m.year))).sort((a, b) => b - a);

    // Fİltre değerleri
    const filters = {
        brand: searchParams?.brand ?? "all",
        year: searchParams?.year ?? "all",
        model: searchParams?.model ?? "",
    };

    // Filtreleme 
    const filteredItems = items.filter((it) => {
        // Marka filtresi
        if (filters.brand !== "all" && it.brandName !== filters.brand) return false;

        // Yıl filtresi 
        if (filters.year !== "all") {
            const y = Number(filters.year);
            const hasYearForBrand = models.some((m) => m.brandId === it.id && m.year === y);
            if (!hasYearForBrand) return false;
        }

        // Model filtresi 
        if (filters.model?.trim()) {
            const q = filters.model.trim().toLowerCase();
            const hasModel = models.some(
                (m) => m.brandId === it.id && m.name.toLowerCase().includes(q)
            );
            if (!hasModel) return false;
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
                    <p className="text-muted-foreground mt-2">Marka bazlı stok (Car adetleri)</p>
                </div>

                {/* Özet kartları */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Toplam Marka</div>
                        <div className="text-2xl font-semibold mt-1">{totalBrands}</div>
                    </div>
                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Toplam Model</div>
                        <div className="text-2xl font-semibold mt-1">{totalModels}</div>
                    </div>
                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Toplam Araç</div>
                        <div className="text-2xl font-semibold mt-1">{totalCars}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    {/* Filtre: GET form; state yok */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-24">
                            <StokFilter brands={brandNames} years={years} current={filters} />
                        </div>
                    </div>

                    {/* Liste */}
                    <div className="lg:col-span-4">
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">{filteredItems.length} marka bulundu</p>
                        </div>

                        {filteredItems.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Arama kriterlerinize uygun marka bulunamadı.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredItems.map((item) => (
                                    <StokManagementComponent key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
