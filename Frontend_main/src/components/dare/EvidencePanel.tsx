import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

export interface Signal {
  id: string;
  name: string;
  value: string;
  severity: "low" | "medium" | "high" | "info";
  description?: string;
}

interface EvidencePanelProps {
  signals: Signal[];
}

export const EvidencePanel = ({ signals }: EvidencePanelProps) => {
  const getSeverityStyles = (severity: Signal["severity"]) => {
    switch (severity) {
      case "high":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          icon: <XCircle className="w-4 h-4 text-destructive" />,
          text: "text-destructive",
        };
      case "medium":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          icon: <AlertTriangle className="w-4 h-4 text-warning" />,
          text: "text-warning",
        };
      case "low":
        return {
          bg: "bg-success/10",
          border: "border-success/30",
          icon: <CheckCircle className="w-4 h-4 text-success" />,
          text: "text-success",
        };
      default:
        return {
          bg: "bg-muted",
          border: "border-muted",
          icon: <Info className="w-4 h-4 text-muted-foreground" />,
          text: "text-muted-foreground",
        };
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Extracted Signals</h3>
      </div>

      <div className="grid gap-3">
        {signals.map((signal, index) => {
          const styles = getSeverityStyles(signal.severity);
          return (
            <div
              key={signal.id}
              className={`flex items-start gap-3 p-4 rounded-lg border ${styles.bg} ${styles.border} animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{signal.name}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${styles.text} ${styles.bg}`}>
                    {signal.value}
                  </span>
                </div>
                {signal.description && (
                  <p className="text-xs text-muted-foreground">{signal.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {signals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No signals extracted yet</p>
        </div>
      )}
    </div>
  );
};
