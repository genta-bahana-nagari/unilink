import { Card } from "@/components/ui/card";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card className="p-6 border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1 text-foreground">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && trendValue && (
            <p
              className={`text-sm mt-2 font-medium ${
                trend === "up"
                  ? "text-success"
                  : trend === "down"
                  ? "text-danger"
                  : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? "+" : trend === "down" ? "-" : ""}
              {trendValue}
            </p>
          )}
        </div>
        <div className="p-3 bg-brand-50 rounded-lg">
          <Icon size={24} className="text-brand-600" />
        </div>
      </div>
    </Card>
  );
}