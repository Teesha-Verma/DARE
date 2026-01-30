import { useEffect, useState } from "react";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const RiskGauge = ({ score, size = "md", showLabel = true }: RiskGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-56 h-56",
  };

  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const radius = size === "sm" ? 40 : size === "md" ? 68 : 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference * 0.75;

  const getRiskColor = () => {
    if (score <= 30) return "stroke-success";
    if (score <= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  const getRiskLabel = () => {
    if (score <= 30) return "Low Risk";
    if (score <= 60) return "Medium Risk";
    return "High Risk";
  };

  const getRiskBgColor = () => {
    if (score <= 30) return "text-success";
    if (score <= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background glow */}
        <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${getRiskBgColor()}`} 
          style={{ backgroundColor: "currentColor" }} 
        />
        
        {/* SVG Gauge */}
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 200 200">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            className="text-muted/30"
          />
          
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            className={`${getRiskColor()} transition-all duration-1000 ease-out`}
            style={{
              filter: "drop-shadow(0 0 8px currentColor)",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono font-bold ${size === "sm" ? "text-2xl" : size === "md" ? "text-4xl" : "text-5xl"} ${getRiskBgColor()}`}>
            {Math.round(animatedScore)}
          </span>
          {size !== "sm" && (
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Risk Score
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
          score <= 30 ? "risk-low" : score <= 60 ? "risk-medium" : "risk-high"
        }`}>
          {getRiskLabel()}
        </div>
      )}
    </div>
  );
};
