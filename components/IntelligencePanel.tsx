
import React from 'react';
import { 
  X, ShieldAlert, Target, Zap, Users, Info, TrendingUp, MapPin, 
  Siren, Clock, Crosshair, ShieldCheck, Plane, AlertTriangle, FileWarning
} from 'lucide-react';
import { StrategicSummary, IntelligencePoint, PredictionPoint, IntelligenceLayer, SDRGAAlert, RiskLevel } from '../types';

interface IntelligencePanelProps {
  summary: StrategicSummary | null;
  selectedPoint: IntelligencePoint | PredictionPoint | SDRGAAlert | null;
  onClose: () => void;
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ summary, selectedPoint, onClose }) => {
  if (!summary && !selectedPoint) return null;

  const riskColors = {
    critical: 'text-red-500 border-red-500 bg-red-500/10',
    high: 'text-orange-500 border-orange-500 bg-orange-500/10',
    moderate: 'text-yellow-500 border-yellow-500 bg-yellow-500/10'
  };

  const isPrediction = selectedPoint?.category === IntelligenceLayer.PREDICTIONS;
  const isSDRGA = selectedPoint?.category === IntelligenceLayer.SDRGA;

  return (
    <div className="absolute top-6 right-6 bottom-6 w-96 bg-slate-950/95 backdrop-blur-xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[1000] flex flex-col rounded-3xl overflow-hidden animate-in fade-in slide-in-from-right-10 border-slate-700/50">
      
      {/* Header */}
      <div className={`p-5 border-b flex items-center justify-between ${
          isSDRGA ? 'bg-red-950/40 border-red-500/30' :
          isPrediction ? 'bg-purple-950/30 border-purple-500/30' : 'bg-slate-900/50 border-slate-800'
      }`}>
        <h2 className={`font-bold flex items-center gap-2 text-sm ${
            isSDRGA ? 'text-red-400' :
            isPrediction ? 'text-purple-400' : 'text-slate-200'
        }`}>
          {isSDRGA ? (
             <><FileWarning size={18} className="animate-pulse" /> ALERTA DE REPLIEGUE</>
          ) : isPrediction ? (
            <><Siren size={18} className="animate-pulse" /> PROTOCOLO DE CONTENCIÓN</>
          ) : selectedPoint ? (
            <><Target size={18} className="text-red-500" /> INSPECTOR DE OBJETIVO</>
          ) : (
            <><ShieldAlert size={18} className="text-red-500" /> ANÁLISIS ESTRATÉGICO IA</>
          )}
        </h2>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-500 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* === SDRGA MODE === */}
        {selectedPoint && isSDRGA && (
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-black text-white tracking-tight uppercase leading-tight mb-3">{selectedPoint.name}</h3>
                
                <div className="grid grid-cols-2 gap-2">
                   <div className="bg-slate-900 border border-slate-800 rounded-lg p-2">
                       <p className="text-[9px] text-slate-500 uppercase font-bold">Risk Score</p>
                       <p className="text-2xl font-mono font-bold text-white">{(selectedPoint as SDRGAAlert).riskScore}</p>
                   </div>
                   <div className={`border rounded-lg p-2 flex flex-col justify-center items-center ${(selectedPoint as SDRGAAlert).riskLevel === RiskLevel.NEGRO ? 'bg-black border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                       <p className="text-[9px] text-slate-500 uppercase font-bold">Nivel Alerta</p>
                       <p className={`text-lg font-black uppercase ${(selectedPoint as SDRGAAlert).riskLevel === RiskLevel.NEGRO ? 'text-red-600 animate-pulse' : 'text-white'}`}>
                           {(selectedPoint as SDRGAAlert).riskLevel}
                       </p>
                   </div>
                </div>
              </div>

              <section className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <AlertTriangle size={12} /> Anomalías Detectadas (Signos)
                  </h4>
                  <ul className="space-y-2">
                      {(selectedPoint as SDRGAAlert).detectedAnomalies.map((anom, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">●</span> {anom}
                          </li>
                      ))}
                  </ul>
              </section>

              <section className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Corredores Críticos Identificados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedPoint as SDRGAAlert).criticalCorridors.map((corr, i) => (
                    <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-700">
                      {corr}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl">
                 <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <ShieldCheck size={12} /> Matriz de Respuesta
                 </h4>
                 <ul className="space-y-2">
                      {(selectedPoint as SDRGAAlert).tacticalRecommendations.map((rec, i) => (
                          <li key={i} className="text-[11px] text-red-100/80 font-medium flex items-start gap-2 border-b border-red-900/20 pb-1 last:border-0">
                              <span className="text-red-500 font-bold">{i+1}.</span> {rec}
                          </li>
                      ))}
                  </ul>
              </section>
            </>
        )}

        {/* === MISSION CONTROL MODE (PREDICTIONS) === */}
        {selectedPoint && isPrediction && !isSDRGA && (
          <>
             <div className="text-center mb-4">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">{selectedPoint.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                   <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/50">
                     PROBABILIDAD: {(selectedPoint as PredictionPoint).confidence}%
                   </span>
                   <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-bold border border-red-500/50 animate-pulse">
                     ALTA PRIORIDAD
                   </span>
                </div>
             </div>

             <section className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Clock size={12} /> Ventana de Operación
                </h4>
                <p className="text-lg font-mono text-white">
                  {(selectedPoint as PredictionPoint).timeWindow}
                </p>
             </section>

             <section className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} /> Estrategia de Contención
                </h4>
                <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl">
                  <p className="text-sm text-purple-100 leading-relaxed font-medium">
                    "{(selectedPoint as PredictionPoint).containmentStrategy}"
                  </p>
                </div>
             </section>

             <section className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Plane size={12} /> Activos Requeridos
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {(selectedPoint as PredictionPoint).requiredUnits?.map((unit, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700">
                       <span className="text-xs text-slate-300 font-bold">{unit}</span>
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                    </div>
                  ))}
                </div>
             </section>
          </>
        )}


        {/* === STANDARD INTELLIGENCE MODE === */}
        {selectedPoint && !isPrediction && !isSDRGA && (
          <>
            <section>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white leading-tight">{selectedPoint.name}</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-slate-400 border border-slate-700 uppercase">
                  {selectedPoint.type}
                </span>
                {selectedPoint.intensity && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedPoint.intensity === 'high' ? 'bg-red-950 text-red-500' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Amenaza: {selectedPoint.intensity}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {selectedPoint.description}
              </p>

              {selectedPoint.tactics && selectedPoint.tactics.length > 0 && (
                <section className="space-y-2 mb-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={12} /> Tácticas y Medios
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPoint.tactics.map(tactic => (
                      <span key={tactic} className="bg-red-950/30 border border-red-900/50 px-2 py-1 rounded text-[10px] text-red-400 font-bold">
                        {tactic}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                {selectedPoint.intelConfidence && (
                  <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Confianza</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedPoint.intelConfidence === 'Alta' ? 'bg-green-500' : 
                        selectedPoint.intelConfidence === 'Media' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-xs font-bold text-slate-200">{selectedPoint.intelConfidence}</span>
                    </div>
                  </div>
                )}
                {selectedPoint.source && (
                  <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Fuente</p>
                    <p className="text-[10px] font-medium text-slate-300 truncate" title={selectedPoint.source}>
                      {selectedPoint.source}
                    </p>
                  </div>
                )}
              </div>
            </section>
            
            {/* Standard Intel Sections (Zones, Commanders, Economy) - Kept brief for diff clarity */}
             {selectedPoint.influenceZones && (
              <section className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Zonas de Influencia
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPoint.influenceZones.map(zone => (
                    <span key={zone} className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg text-[11px] text-slate-300">
                      {zone}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* === GLOBAL SUMMARY MODE === */}
        {!selectedPoint && summary && (
          <>
            <section>
              <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-bold uppercase mb-4 ${riskColors[summary.riskLevel]}`}>
                Nivel de Riesgo Global: {summary.riskLevel}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-red-500 pl-4 py-1">
                "{summary.overview}"
              </p>
            </section>
             <section>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Target size={14} className="text-red-500" /> Hallazgos de Inteligencia
              </h3>
              <ul className="space-y-3">
                {summary.keyInsights.map((insight, idx) => (
                  <li key={idx} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 flex gap-4 hover:border-slate-700 transition-colors">
                    <span className="text-red-600 font-black shrink-0 text-sm">{String(idx + 1).padStart(2, '0')}</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      <div className="p-5 bg-slate-900/80 border-t border-slate-800">
        <div className="flex items-center justify-center gap-2 text-[9px] text-slate-600 font-mono uppercase tracking-tighter">
          <Info size={10} />
          <span>Sistema de Visualización de Datos Clasificados</span>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
