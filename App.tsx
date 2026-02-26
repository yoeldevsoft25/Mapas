
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TacticalMap from './components/TacticalMap';
import IntelligencePanel from './components/IntelligencePanel';
import MissionModal from './components/MissionModal';
import { IntelligenceLayer, StrategicSummary, IntelligencePoint, PredictionPoint, SDRGAAlert } from './types';
import { MOCK_FRONTS, MOCK_ACTIONS, MOCK_INFRASTRUCTURE, MOCK_URBAN, MOCK_ROUTES } from './constants';
import { getStrategicAnalysis, predictFutureHostiles, runSDRGASystem } from './services/geminiService';

const App: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<Set<IntelligenceLayer>>(
    new Set([IntelligenceLayer.FRONTS, IntelligenceLayer.ROUTES, IntelligenceLayer.INFRASTRUCTURE])
  );
  const [summary, setSummary] = useState<StrategicSummary | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<IntelligencePoint | null>(null);
  const [predictedPoints, setPredictedPoints] = useState<PredictionPoint[]>([]);
  const [sdrgaAlerts, setSDRGAAlerts] = useState<SDRGAAlert[]>([]);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isRunningSDRGA, setIsRunningSDRGA] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleLayer = useCallback((layer: IntelligenceLayer) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer)
      else next.add(layer);
      return next;
    });
  }, []);

  const handleAnalysisRequested = async () => {
    setIsAnalyzing(true);
    setSelectedPoint(null);
    const allPoints: IntelligencePoint[] = [
      ...MOCK_FRONTS,
      ...MOCK_ACTIONS,
      ...MOCK_INFRASTRUCTURE,
      ...MOCK_URBAN
    ];

    const result = await getStrategicAnalysis(allPoints);
    setSummary(result);
    setIsAnalyzing(false);
  };

  const handlePredictionRequested = async () => {
    setIsPredicting(true);
    const allKnownPoints: IntelligencePoint[] = [
      ...MOCK_FRONTS,
      ...MOCK_ACTIONS,
      ...MOCK_INFRASTRUCTURE
    ];

    const predictions = await predictFutureHostiles(allKnownPoints);
    setPredictedPoints(predictions);
    setActiveLayers(prev => new Set(prev).add(IntelligenceLayer.PREDICTIONS));
    setIsPredicting(false);
  };

  const handleSDRGARequested = async () => {
    setIsRunningSDRGA(true);

    const routePoints: IntelligencePoint[] = MOCK_ROUTES.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      type: 'Ruta ' + r.type,
      category: IntelligenceLayer.ROUTES,
      lat: r.path[0]?.lat || 0,
      lng: r.path[0]?.lng || 0,
      intensity: 'medium',
      influenceZones: [],
      illegalEconomy: []
    }));

    const allKnownPoints: IntelligencePoint[] = [
      ...MOCK_FRONTS,
      ...MOCK_ACTIONS,
      ...routePoints
    ];

    const alerts = await runSDRGASystem(allKnownPoints);
    setSDRGAAlerts(alerts);
    setActiveLayers(prev => new Set(prev).add(IntelligenceLayer.SDRGA));
    setIsRunningSDRGA(false);
  };

  const handlePointSelect = (point: IntelligencePoint | null) => {
    setSelectedPoint(point);
    if (point) setSummary(null);
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden font-sans selection:bg-red-500/30 text-slate-900">
      <Sidebar
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
        onAnalysisRequested={handleAnalysisRequested}
        onPredictionRequested={handlePredictionRequested}
        onSDRGARequested={handleSDRGARequested}
        onShowMission={() => setIsMissionModalOpen(true)}
        isAnalyzing={isAnalyzing}
        isPredicting={isPredicting}
        isRunningSDRGA={isRunningSDRGA}
        onSearchChange={setSearchTerm}
      />

      <main className="flex-1 relative flex flex-col">
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.2em]">Live Intelligence Feed</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sector:</span>
              <span className="text-xs text-slate-300 font-medium">Eje Andino y Fronteras Amazónicas</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-bold uppercase leading-none">Algoritmo</span>
              <span className="text-[11px] font-bold text-red-500">SDRGA AGENT SWARM</span>
            </div>
            <div className="h-8 w-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => setIsMissionModalOpen(true)}>
              <span className="text-xs font-black text-red-600">S</span>
            </div>
          </div>
        </header>

        <div className="flex-1 relative">
          <TacticalMap
            activeLayers={activeLayers}
            searchTerm={searchTerm}
            onPointSelect={handlePointSelect}
            predictedPoints={predictedPoints}
            sdrgaAlerts={sdrgaAlerts}
          />

          <IntelligencePanel
            summary={summary}
            selectedPoint={selectedPoint}
            onClose={() => {
              setSummary(null);
              setSelectedPoint(null);
            }}
          />
        </div>

        <footer className="h-8 bg-slate-50 border-t border-slate-200 flex items-center px-6 text-[9px] text-slate-500 font-mono overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            <span className="flex items-center gap-2 italic"><span className="text-red-700 font-bold">[SDRGA]</span> Monitoreando 212 municipios. Escaneo de anomalías iniciado.</span>
            <span className="flex items-center gap-2 italic"><span className="text-purple-500 font-bold">[AI]</span> Recalculando vectores de probabilidad.</span>
          </div>
        </footer>
      </main>

      <MissionModal isOpen={isMissionModalOpen} onClose={() => setIsMissionModalOpen(false)} />

      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .tactical-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          color: #0f172a;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        .tactical-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
        .leaflet-container {
          cursor: crosshair !important;
        }
      `}</style>
    </div>
  );
};

export default App;
