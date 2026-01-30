import { AlertCircle, CheckCircle, Eye, ShieldAlert, UserCheck } from "lucide-react";

export type Decision = "safe" | "warn_user" | "human_review" | "block";

interface DecisionCardProps {
  decision: Decision;
  message: string;
  reasons: string[];
  policy?: string;
}

export const DecisionCard = ({ decision, message, reasons, policy }: DecisionCardProps) => {
  const getDecisionConfig = () => {
    switch (decision) {
      case "safe":
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          title: "Content Appears Safe",
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/30",
        };
      case "warn_user":
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          title: "User Warning Recommended",
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/30",
        };
      case "human_review":
        return {
          icon: <UserCheck className="w-6 h-6" />,
          title: "Human Review Required",
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary/30",
        };
      case "block":
        return {
          icon: <ShieldAlert className="w-6 h-6" />,
          title: "Content Flagged",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
        };
    }
  };

  const config = getDecisionConfig();

  return (
    <div className={`glass-card p-6 border-l-4 ${config.borderColor}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 p-3 rounded-lg ${config.bgColor} ${config.color}`}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${config.color}`}>{config.title}</h3>
            {policy && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {policy}
              </span>
            )}
          </div>
          
          <p className="text-foreground mb-4">{message}</p>
          
          {reasons.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Key Factors
              </h4>
              <ul className="space-y-1">
                {reasons.map((reason, index) => (
                  <li 
                    key={index}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
