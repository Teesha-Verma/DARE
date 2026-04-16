import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { InputSection } from './components/InputSection';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { RiskDashboard } from './components/dashboard/RiskDashboard';
import { Landing } from './components/landing/Landing';
import { AssessmentResult, EvidenceSignal, AgentLog } from './types';

type AppState = 'landing' | 'input' | 'processing' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [processingStep, setProcessingStep] = useState(-1);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);

  // Simulate processing pipeline
  useEffect(() => {
    if (appState === 'processing') {
      setProcessingStep(0);
      
      const timer1 = setTimeout(() => setProcessingStep(1), 1500);
      const timer2 = setTimeout(() => setProcessingStep(2), 3500);
      const timer3 = setTimeout(() => setProcessingStep(3), 5500);
      const timer4 = setTimeout(() => {
        setProcessingStep(4);
        setAppState('results');
      }, 7000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [appState]);

  const generateMockResult = (inputType: 'text' | 'image', contentPreview: string): AssessmentResult => {
    // Randomize slightly for demo purposes
    const isHighRisk = Math.random() > 0.5;
    const riskScore = isHighRisk ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 10;
    
    const evidence: EvidenceSignal[] = isHighRisk ? [
      { id: '1', label: 'Emotional Language', confidence: 85, level: 'high', explanation: 'High density of emotionally charged words designed to provoke outrage.' },
      { id: '2', label: 'Source Credibility', confidence: 92, level: 'high', explanation: 'Origin traces back to known low-reputation domains.' },
      { id: '3', label: 'Sensationalism', confidence: 78, level: 'moderate', explanation: 'Use of hyperbolic phrasing and absolute claims.' }
    ] : [
      { id: '1', label: 'Factual Consistency', confidence: 88, level: 'low', explanation: 'Claims align with established consensus.' },
      { id: '2', label: 'Source Credibility', confidence: 75, level: 'low', explanation: 'Origin appears to be a standard user account with normal history.' },
      { id: '3', label: 'Manipulation Traces', confidence: 95, level: 'low', explanation: 'No obvious signs of digital manipulation or synthetic generation.' }
    ];

    const logs: AgentLog[] = [
      { agentName: 'IngestionAgent', action: 'Content normalized', timestamp: '0.01s', details: 'Extracted raw text and metadata. Stripped formatting.' },
      { agentName: 'LinguisticAnalyzer', action: 'Sentiment & Tone mapped', timestamp: '0.45s', details: 'Detected elevated emotional valence. Flagged potential hyperbole.' },
      { agentName: 'SourceTracer', action: 'Origin verification', timestamp: '1.20s', details: 'Cross-referenced domain/user history against known databases.' },
      { agentName: 'ConsensusEngine', action: 'Evidence synthesized', timestamp: '2.10s', details: 'Aggregated signals. Calculated base risk score.' },
      { agentName: 'PolicyEvaluator', action: 'Decision formulated', timestamp: '2.55s', details: 'Applied platform safety guidelines to final score.' }
    ];

    return {
      id: `DARE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date(),
      inputType,
      contentPreview: contentPreview.substring(0, 60) + (contentPreview.length > 60 ? '...' : ''),
      riskScore,
      riskLevel: riskScore > 75 ? 'high' : riskScore > 40 ? 'moderate' : 'low',
      riskType: isHighRisk ? 'Potential Misinformation / Manipulation' : 'Standard User Content',
      uncertaintyLevel: Math.random() > 0.7 ? 'Medium' : 'Low',
      decision: riskScore > 85 ? 'Human Required' : riskScore > 60 ? 'Flag for Review' : riskScore > 40 ? 'Warn User' : 'Allow',
      decisionExplanation: isHighRisk 
        ? 'Multiple high-confidence signals indicate potential manipulation or coordinated inauthentic behavior. Content violates baseline trust thresholds.'
        : 'Content falls within acceptable parameters. No significant risk signals detected across primary evaluation vectors.',
      suggestedAction: isHighRisk
        ? 'Route to Tier 2 Trust & Safety team for manual review. Temporarily reduce algorithmic amplification.'
        : 'Allow standard distribution.',
      evidence,
      logs
    };
  };

  const handleTextSubmit = (text: string) => {
    const result = generateMockResult('text', text);
    setCurrentResult(result);
    setHistory(prev => [result, ...prev]);
    setAppState('processing');
  };

  const handleImageSubmit = (file: File) => {
    const result = generateMockResult('image', `Image: ${file.name}`);
    setCurrentResult(result);
    setHistory(prev => [result, ...prev]);
    setAppState('processing');
  };

  const handleReset = () => {
    setAppState('input');
    setCurrentResult(null);
  };

  if (appState === 'landing') {
    return (
      <Layout 
        history={history} 
        onSelectHistory={(result) => {
          setCurrentResult(result);
          setAppState('results');
        }}
        onNewAssessment={handleReset}
        onNavigateHome={() => setAppState('landing')}
      >
        <Landing onStart={() => setAppState('input')} />
      </Layout>
    );
  }

  return (
    <Layout 
      history={history} 
      onSelectHistory={(result) => {
        setCurrentResult(result);
        setAppState('results');
      }}
      onNewAssessment={handleReset}
      onNavigateHome={() => setAppState('landing')}
    >
      {appState === 'input' && (
        <div className="pt-12 pb-24">
          <InputSection 
            onSubmitText={handleTextSubmit} 
            onSubmitImage={handleImageSubmit} 
          />
        </div>
      )}

      {appState === 'processing' && (
        <div className="pt-24">
          <ProcessingPipeline currentStep={processingStep} />
        </div>
      )}

      {appState === 'results' && currentResult && (
        <div className="pt-6">
          <RiskDashboard result={currentResult} onReset={handleReset} />
        </div>
      )}
    </Layout>
  );
}
