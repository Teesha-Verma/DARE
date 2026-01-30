import { Search, Brain, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";

export type AgentStatus = "pending" | "running" | "complete";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  message?: string;
  icon: React.ReactNode;
  colorClass: string;
}

interface AgentTimelineProps {
  agents: Agent[];
}

export const defaultAgents: Agent[] = [
  {
    id: "evidence",
    name: "Evidence Extraction",
    role: "EXECUTOR",
    status: "pending",
    icon: <Search className="w-5 h-5" />,
    colorClass: "agent-badge-evidence",
  },
  {
    id: "reasoning",
    name: "Risk Reasoning",
    role: "PLANNER",
    status: "pending",
    icon: <Brain className="w-5 h-5" />,
    colorClass: "agent-badge-reasoning",
  },
  {
    id: "safety",
    name: "Safety & Ethics",
    role: "EVALUATOR",
    status: "pending",
    icon: <ShieldCheck className="w-5 h-5" />,
    colorClass: "agent-badge-safety",
  },
];

export const AgentTimeline = ({ agents }: AgentTimelineProps) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Agent Pipeline
      </h3>
      
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <div key={agent.id} className="relative">
            {/* Connection line */}
            {index < agents.length - 1 && (
              <div className={`absolute left-6 top-14 w-0.5 h-8 ${
                agent.status === "complete" ? "bg-primary/50" : "bg-muted"
              }`} />
            )}
            
            <div className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
              agent.status === "running" 
                ? "bg-primary/5 border border-primary/20" 
                : agent.status === "complete"
                ? "bg-muted/30"
                : "bg-transparent"
            }`}>
              {/* Status indicator */}
              <div className={`relative flex-shrink-0 p-2.5 rounded-lg ${agent.colorClass}`}>
                {agent.status === "running" && (
                  <div className="absolute inset-0 rounded-lg animate-ping opacity-30 bg-current" />
                )}
                {agent.icon}
              </div>
              
              {/* Agent info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{agent.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                    {agent.role}
                  </span>
                </div>
                
                {agent.status === "running" && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Processing...
                  </p>
                )}
                
                {agent.status === "complete" && agent.message && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    {agent.message}
                  </p>
                )}
                
                {agent.status === "pending" && (
                  <p className="text-sm text-muted-foreground">Waiting...</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
