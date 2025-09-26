import Link from "next/link"
import { Car } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                                <Car className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-lg">StokTakip</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Araç silecekleri için profesyonel stok takip ve yönetim sistemi. Stoklarınızı kolayca yönetin,
                            satışlarınızı takip edin.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/arac-ekle" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Araç Ekle
                                </Link>
                            </li>
                            <li>
                                <Link href="/stok-yonetimi" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Stok Yönetimi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">İstatistikler</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Toplam Stok: 1,247 adet</li>
                            <li>Aktif Markalar: 15</li>
                            <li>Bu Ay Satış: 342 adet</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 StokTakip. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    )
}
