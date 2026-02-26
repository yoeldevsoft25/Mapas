
import React, { useState } from 'react';
import {
  ShieldAlert,
  Map as MapIcon,
  Activity,
  Warehouse,
  Navigation,
  Building2,
  Info,
  Search,
  Filter,
  Radar,
  BrainCircuit,
  Siren,
  FileText
} from 'lucide-react';
import { IntelligenceLayer } from '../types';

interface SidebarProps {
  activeLayers: Set<IntelligenceLayer>;
  toggleLayer: (layer: IntelligenceLayer) => void;
  onAnalysisRequested: () => void;
  onPredictionRequested: () => void;
  onSDRGARequested: () => void;
  onShowMission: () => void; // New prop
  isAnalyzing: boolean;
  isPredicting: boolean;
  isRunningSDRGA: boolean;
  onSearchChange: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeLayers,
  toggleLayer,
  onAnalysisRequested,
  onPredictionRequested,
  onSDRGARequested,
  onShowMission,
  isAnalyzing,
  isPredicting,
  isRunningSDRGA,
  onSearchChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const layerButtons = [
    { id: IntelligenceLayer.FRONTS, icon: ShieldAlert, label: 'Frentes Guerrilleros', color: 'text-red-600' },
    { id: IntelligenceLayer.ACTIONS, icon: Activity, label: 'Acciones Militares', color: 'text-orange-600' },
    { id: IntelligenceLayer.INFRASTRUCTURE, icon: Warehouse, label: 'Infraestructura Ilegal', color: 'text-yellow-600' },
    { id: IntelligenceLayer.ROUTES, icon: Navigation, label: 'Rutas y Trochas', color: 'text-emerald-600' },
    { id: IntelligenceLayer.URBAN, icon: Building2, label: 'Presencia Urbana', color: 'text-blue-600' },
  ];

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
          <MapIcon className="text-red-600" />
          STRATOS <span className="text-xs font-mono font-normal bg-slate-100 px-2 py-0.5 rounded text-slate-500">INTEL-DB</span>
        </h1>
        <p className="text-xs text-slate-500 mt-2 uppercase font-semibold">Investigación Exhaustiva ELN</p>
      </div>

      <div className="p-4 border-b border-slate-200 space-y-3">
        <button
          onClick={onShowMission}
          className="w-full flex items-center gap-3 p-3 bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/50 rounded-xl transition-all group"
        >
          <div className="relative">
            <FileText size={18} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Briefing de Misión</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Buscar frente, ruta o sitio..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        {/* SDRGA SYSTEM MODULE */}
        <div className="mb-4 bg-slate-50 p-3 rounded-xl border border-red-200 shadow-sm">
          <p className="text-[10px] font-black text-red-500 uppercase px-1 mb-2 tracking-widest flex items-center gap-2">
            <Siren size={12} className={isRunningSDRGA ? 'animate-pulse' : ''} /> SISTEMA SDRGA
          </p>
          <button
            onClick={onSDRGARequested}
            disabled={isRunningSDRGA || activeLayers.has(IntelligenceLayer.SDRGA)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${activeLayers.has(IntelligenceLayer.SDRGA)
              ? 'bg-red-50 border-red-300 text-red-900 shadow-sm'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <Activity size={18} className={isRunningSDRGA ? 'animate-spin text-red-400' : 'text-red-600'} />
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase">Detectar Repliegues</span>
                {activeLayers.has(IntelligenceLayer.SDRGA) && (
                  <span className="text-[9px] text-red-400 animate-pulse">MONITOREO ACTIVO</span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Predictive Module Section */}
        <div className="mb-6 bg-slate-50 p-2 rounded-xl border border-purple-200">
          <p className="text-[10px] font-bold text-purple-400 uppercase px-2 mb-2 tracking-wider flex items-center gap-2">
            <BrainCircuit size={12} /> Algoritmo Táctico
          </p>
          <button
            onClick={onPredictionRequested}
            disabled={isPredicting || activeLayers.has(IntelligenceLayer.PREDICTIONS)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border ${activeLayers.has(IntelligenceLayer.PREDICTIONS)
              ? 'bg-purple-50 border-purple-300 text-purple-900'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <Radar size={18} className={isPredicting ? 'animate-spin text-purple-400' : 'text-purple-500'} />
              <span className="text-sm font-bold">
                {isPredicting ? 'TRIANGULANDO...' : 'PROYECTAR MISIONES'}
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between px-2 mb-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Capas de Inteligencia</p>
          <Filter size={12} className="text-slate-600" />
        </div>

        {layerButtons.map(({ id, icon: Icon, label, color }) => (
          <button
            key={id}
            onClick={() => toggleLayer(id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${activeLayers.has(id)
              ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className={activeLayers.has(id) ? color : 'text-slate-500'} />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {activeLayers.has(id) && (
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            )}
          </button>
        ))}

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-4 tracking-wider">Módulo de Síntesis</p>
          <button
            onClick={onAnalysisRequested}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white p-4 rounded-xl font-bold text-sm shadow-lg shadow-red-900/40 flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-50 border border-red-500/30 group"
          >
            <div className="flex items-center gap-2">
              <Activity size={18} className={isAnalyzing ? 'animate-spin' : 'group-hover:scale-110 transition-transform'} />
              <span>{isAnalyzing ? 'ANALIZANDO DATOS...' : 'GENERAR REPORTE IA'}</span>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
