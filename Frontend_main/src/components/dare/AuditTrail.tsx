import { Clock, FileText, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

interface AuditEntry {
  timestamp: string;
  agent: string;
  action: string;
  details?: string;
}

interface AuditTrailProps {
  entries: AuditEntry[];
  caseId?: string;
}

export const AuditTrail = ({ entries, caseId }: AuditTrailProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = JSON.stringify({ caseId, entries }, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Audit Trail
        </h3>
        <div className="flex items-center gap-3">
          {caseId && (
            <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
              Case: {caseId}
            </span>
          )}
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Copy audit log"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 text-sm"
          >
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {entry.timestamp}
                </span>
                <span className="px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary">
                  {entry.agent}
                </span>
              </div>
              <p className="text-foreground">{entry.action}</p>
              {entry.details && (
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {entry.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No audit entries yet</p>
        </div>
      )}
    </div>
  );
};
