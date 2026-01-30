import { Shield } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl animate-pulse-glow" />
        <div className="relative p-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30">
          <Shield className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight gradient-text">DARE</h1>
        <p className="text-xs text-muted-foreground tracking-wider">Digital Authenticity Risk Engine</p>
      </div>
    </div>
  );
};
