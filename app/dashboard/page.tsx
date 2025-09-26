
import { Car, Package, TrendingUp, AlertTriangle } from "lucide-react"
import { StatsCard } from "@/features/dashboard/components/stats-card"
import { BrandChart } from "@/features/dashboard/components/brand-chart"

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-background">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-balance">Araç Silecek Stok Takip Sistemi</h1>
                    <p className="text-muted-foreground mt-2 text-pretty">Stok durumunuzu takip edin ve satışlarınızı yönetin</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Toplam Stok"
                        value="1,247"
                        description="Tüm araç silecekleri"
                        icon={Package}
                    />
                    <StatsCard
                        title="Toplam Marka"
                        value="15"
                        description="Farklı araç markası"
                        icon={Car}
                    />

                    <StatsCard
                        title="Düşük Stok"
                        value="23"
                        description="Kritik seviyede"
                        icon={AlertTriangle}
                    />
                </div>

                {/* Charts and Activity */}
                <div className="w-full">
                    <BrandChart />
                    {/* <RecentActivity /> */}
                </div>
            </main>
        </div>
    )
}
