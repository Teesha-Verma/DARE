import { useState, useEffect } from "react";
import { RiskGauge } from "./RiskGauge";
import { AgentTimeline, defaultAgents, AgentStatus } from "./AgentTimeline";
import { EvidencePanel, Signal } from "./EvidencePanel";
import { DecisionCard, Decision } from "./DecisionCard";
import { AuditTrail } from "./AuditTrail";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentType } from "./UploadForm";

interface AnalysisDashboardProps {
  content: string;
  contentType: ContentType;
  onReset: () => void;
}

// Simulated analysis results
const mockTextSignals: Signal[] = [
  { id: "1", name: "Emotional Language", value: "High", severity: "high", description: "Contains highly charged emotional phrases designed to provoke reaction" },
  { id: "2", name: "Source Credibility", value: "Low", severity: "high", description: "No verifiable sources cited in the content" },
  { id: "3", name: "Clickbait Indicators", value: "Medium", severity: "medium", description: "Title uses sensationalist language patterns" },
  { id: "4", name: "Writing Consistency", value: "Normal", severity: "low", description: "Writing style is consistent throughout" },
  { id: "5", name: "Factual Claims", value: "Unverified", severity: "medium", description: "Contains claims that could not be verified" },
];

const mockImageSignals: Signal[] = [
  { id: "1", name: "EXIF Metadata", value: "Missing", severity: "high", description: "Original metadata has been stripped from the image" },
  { id: "2", name: "Editing Software Traces", value: "Detected", severity: "medium", description: "Signs of Adobe Photoshop editing detected" },
  { id: "3", name: "Resolution Anomalies", value: "None", severity: "low", description: "Image resolution appears consistent" },
  { id: "4", name: "Compression Artifacts", value: "Multiple", severity: "medium", description: "Multiple layers of compression detected" },
];

const mockVideoSignals: Signal[] = [
  { id: "1", name: "Deepfake Probability", value: "High", severity: "high", description: "Facial movement patterns suggest AI-generated content" },
  { id: "2", name: "Audio-Visual Sync", value: "Mismatch", severity: "high", description: "Lip movements don't match audio track timing" },
  { id: "3", name: "Frame Consistency", value: "Anomalies", severity: "medium", description: "Inconsistent lighting between consecutive frames" },
  { id: "4", name: "Metadata Integrity", value: "Stripped", severity: "medium", description: "Video metadata has been removed or altered" },
  { id: "5", name: "Compression Analysis", value: "Re-encoded", severity: "low", description: "Multiple encoding passes detected" },
  { id: "6", name: "Temporal Artifacts", value: "Present", severity: "medium", description: "Unnatural temporal transitions in facial regions" },
];

const mockAudioSignals: Signal[] = [
  { id: "1", name: "Voice Cloning Detection", value: "Likely", severity: "high", description: "Voice patterns suggest synthetic generation" },
  { id: "2", name: "Audio Splicing", value: "Detected", severity: "high", description: "Multiple audio segments joined together" },
  { id: "3", name: "Background Noise", value: "Inconsistent", severity: "medium", description: "Ambient noise patterns vary unnaturally" },
  { id: "4", name: "Spectral Analysis", value: "Anomalies", severity: "medium", description: "Frequency patterns show signs of manipulation" },
  { id: "5", name: "Voice Stress", value: "Normal", severity: "low", description: "Voice stress patterns appear natural" },
];

export const AnalysisDashboard = ({ content, contentType, onReset }: AnalysisDashboardProps) => {
  const [agents, setAgents] = useState(defaultAgents.map(a => ({ ...a, status: "pending" as AgentStatus })));
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [auditEntries, setAuditEntries] = useState<Array<{ timestamp: string; agent: string; action: string; details?: string }>>([]);

  useEffect(() => {
    // Simulate agent pipeline execution
    const runAnalysis = async () => {
      const caseId = `DARE-${Date.now().toString(36).toUpperCase()}`;
      
      // Evidence Agent
      setAgents(prev => prev.map(a => a.id === "evidence" ? { ...a, status: "running" as AgentStatus } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Evidence Agent",
        action: "Started signal extraction",
        details: `Processing ${contentType} content`
      }]);
      
      await new Promise(r => setTimeout(r, 2000));
      
      const getSignals = () => {
        switch (contentType) {
          case "text": return mockTextSignals;
          case "image": return mockImageSignals;
          case "video": return mockVideoSignals;
          case "audio": return mockAudioSignals;
          default: return mockTextSignals;
        }
      };
      const extractedSignals = getSignals();
      setSignals(extractedSignals);
      setAgents(prev => prev.map(a => a.id === "evidence" ? { ...a, status: "complete" as AgentStatus, message: `Extracted ${extractedSignals.length} signals` } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Evidence Agent",
        action: "Completed signal extraction",
        details: `Found ${extractedSignals.length} signals`
      }]);

      // Reasoning Agent
      setAgents(prev => prev.map(a => a.id === "reasoning" ? { ...a, status: "running" as AgentStatus } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Reasoning Agent",
        action: "Started risk analysis"
      }]);
      
      await new Promise(r => setTimeout(r, 1500));
      
      const getScore = () => {
        switch (contentType) {
          case "text": return 71;
          case "image": return 58;
          case "video": return 82;
          case "audio": return 67;
          default: return 50;
        }
      };
      const calculatedScore = getScore();
      setRiskScore(calculatedScore);
      setAgents(prev => prev.map(a => a.id === "reasoning" ? { ...a, status: "complete" as AgentStatus, message: `Risk score: ${calculatedScore}` } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Reasoning Agent",
        action: "Completed risk assessment",
        details: `Score: ${calculatedScore}/100`
      }]);

      // Safety Agent
      setAgents(prev => prev.map(a => a.id === "safety" ? { ...a, status: "running" as AgentStatus } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Safety Agent",
        action: "Evaluating safety policies"
      }]);
      
      await new Promise(r => setTimeout(r, 1000));
      
      setAgents(prev => prev.map(a => a.id === "safety" ? { ...a, status: "complete" as AgentStatus, message: "Decision: warn_user" } : a));
      setAuditEntries(prev => [...prev, {
        timestamp: new Date().toISOString().slice(11, 19),
        agent: "Safety Agent",
        action: "Generated recommendation",
        details: `Case ID: ${caseId}`
      }]);
      
      setAnalysisComplete(true);
    };

    runAnalysis();
  }, [content, contentType]);

  const getDecision = (): Decision => {
    if (riskScore <= 30) return "safe";
    if (riskScore <= 60) return "warn_user";
    if (riskScore <= 80) return "human_review";
    return "block";
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Button>
        <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-mono text-primary capitalize">
          {contentType} Analysis
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Risk & Agents */}
        <div className="space-y-6">
          {/* Risk Score */}
          <div className="glass-card p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-6 self-start">Risk Assessment</h3>
            <RiskGauge score={riskScore} size="lg" />
            {analysisComplete && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-lg font-semibold">
                  {riskScore > 60 ? "Potential Misinformation" : riskScore > 30 ? "Suspicious Content" : "Likely Authentic"}
                </p>
              </div>
            )}
          </div>

          {/* Confidence Score - Separate Prominent Section */}
          {analysisComplete && (
            <div className="glass-card p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 self-start">Analysis Confidence</h3>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="px-6 py-4 rounded-xl bg-primary/20 border-2 border-primary/40 shadow-xl shadow-primary/20">
                  <span className="text-4xl font-bold font-mono text-primary">76%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Model certainty in this assessment</p>
              </div>
            </div>
          )}

          {/* Agent Timeline */}
          <AgentTimeline agents={agents} />
        </div>

        {/* Center Column - Evidence & Decision */}
        <div className="lg:col-span-2 space-y-6">
          {/* Evidence Panel */}
          <EvidencePanel signals={signals} />

          {/* Decision Card */}
          {analysisComplete && (
            <DecisionCard
              decision={getDecision()}
              message={
                riskScore > 60
                  ? "This content shows multiple signs of manipulation and lacks reliable sources. Users should exercise caution."
                  : riskScore > 30
                  ? "Some elements of this content require additional verification before trusting."
                  : "This content appears to be authentic based on our analysis."
              }
              reasons={
                contentType === "text"
                  ? ["High emotional manipulation detected", "Missing source attribution", "Clickbait patterns identified"]
                  : contentType === "image"
                  ? ["Missing EXIF metadata", "Signs of digital editing", "Multiple compression layers"]
                  : contentType === "video"
                  ? ["High deepfake probability", "Audio-visual sync mismatch", "Temporal artifacts in facial regions"]
                  : ["Voice cloning patterns detected", "Audio splicing identified", "Inconsistent background noise"]
              }
              policy="DARE_SAFETY_v1"
            />
          )}

          {/* Audit Trail */}
          <AuditTrail entries={auditEntries} caseId={`DARE-${Date.now().toString(36).toUpperCase().slice(0, 6)}`} />
        </div>
      </div>
    </div>
  );
};
