import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, TrendingDown, TrendingUp } from "lucide-react"

const activities = [
  {
    id: 1,
    action: "Satış",
    item: "Toyota Corolla 2020 Silecek",
    quantity: 2,
    time: "5 dakika önce",
    type: "sale",
  },
  {
    id: 2,
    action: "Stok Eklendi",
    item: "Honda Civic 2019 Silecek",
    quantity: 10,
    time: "1 saat önce",
    type: "stock",
  },
  {
    id: 3,
    action: "Satış",
    item: "BMW X5 2021 Silecek",
    quantity: 1,
    time: "3 saat önce",
    type: "sale",
  },
  {
    id: 4,
    action: "Düşük Stok Uyarısı",
    item: "Ford Focus 2018 Silecek",
    quantity: 3,
    time: "5 saat önce",
    type: "warning",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Aktiviteler</CardTitle>
        <CardDescription>Son stok hareketleri ve satışlar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  activity.type === "sale"
                    ? "bg-success/10"
                    : activity.type === "stock"
                      ? "bg-accent/10"
                      : "bg-warning/10"
                }`}
              >
                {activity.type === "sale" ? (
                  <TrendingDown className="h-4 w-4 text-success" />
                ) : activity.type === "stock" ? (
                  <TrendingUp className="h-4 w-4 text-accent" />
                ) : (
                  <Package className="h-4 w-4 text-warning" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.item}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant={activity.type === "sale" ? "destructive" : activity.type === "stock" ? "default" : "secondary"}
              >
                {activity.type === "warning" ? activity.quantity + " kaldı" : activity.quantity + " adet"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
