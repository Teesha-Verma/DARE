import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }: StatsCardProps) => {
  return (
    <div className="glass-card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && trendValue && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend === "up" ? "bg-success/10 text-success" :
            trend === "down" ? "bg-destructive/10 text-destructive" :
            "bg-muted text-muted-foreground"
          }`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
