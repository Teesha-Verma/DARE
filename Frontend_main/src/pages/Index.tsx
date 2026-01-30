import { useState } from "react";
import { Logo } from "@/components/dare/Logo";
import { UploadForm, ContentType } from "@/components/dare/UploadForm";
import { AnalysisDashboard } from "@/components/dare/AnalysisDashboard";
import { StatsCard } from "@/components/dare/StatsCard";
import { Shield, Scan, AlertTriangle, CheckCircle, Github, BookOpen } from "lucide-react";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<{ content: string; type: ContentType } | null>(null);

  const handleSubmit = (content: string, type: ContentType) => {
    setIsAnalyzing(true);
    // Simulate a brief processing delay before showing dashboard
    setTimeout(() => {
      setAnalysisData({ content, type });
      setIsAnalyzing(false);
    }, 500);
  };

  const handleReset = () => {
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        {!analysisData ? (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-up">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
                <Scan className="w-4 h-4" />
                Multi-Agent AI Analysis System
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Assess Digital Content
                <span className="gradient-text block mt-2">Authenticity Risk</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                DARE uses multiple autonomous agents to extract signals, reason about risk, 
                and recommend responsible next steps — with full transparency and human-in-the-loop safety.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Analyses Today"
                value="1,247"
                icon={Scan}
                trend="up"
                trendValue="12%"
              />
              <StatsCard
                title="Threats Detected"
                value="89"
                icon={AlertTriangle}
                trend="down"
                trendValue="8%"
              />
              <StatsCard
                title="Safe Content"
                value="94.2%"
                icon={CheckCircle}
                trend="up"
                trendValue="2%"
              />
              <StatsCard
                title="Active Agents"
                value="3"
                icon={Shield}
              />
            </div>

            {/* Upload Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">Analyze Content</h2>
              <UploadForm onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl agent-badge-evidence flex items-center justify-center mx-auto mb-4">
                  <Scan className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Evidence Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Extracts signals like emotional language, source credibility, and metadata anomalies.
                </p>
              </div>
              <div className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl agent-badge-reasoning flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Risk Reasoning</h3>
                <p className="text-sm text-muted-foreground">
                  Weighs conflicting signals and computes a risk score with uncertainty quantification.
                </p>
              </div>
              <div className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl agent-badge-safety flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Safety & Ethics</h3>
                <p className="text-sm text-muted-foreground">
                  Applies platform safety rules and generates human-friendly recommendations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <AnalysisDashboard
            content={analysisData.content}
            contentType={analysisData.type}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-xl mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 DARE — Digital Authenticity Risk Engine</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                All systems operational
              </span>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
