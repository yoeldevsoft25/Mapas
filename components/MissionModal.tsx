
import React, { useState } from 'react';
import { 
  X, Shield, ShieldCheck, Target, Activity, Radar, 
  Database, Zap, FileText, BarChart3, Users, Map as MapIcon, 
  AlertOctagon, TrendingUp, History
} from 'lucide-react';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'strategy' | 'analysis' | 'order_of_battle';

const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('strategy');

  if (!isOpen) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: TabType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all text-xs font-black uppercase tracking-widest ${
        activeTab === id 
        ? 'border-red-600 text-white bg-red-900/10' 
        : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 backdrop-blur-md bg-slate-950/90 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.9)] flex flex-col border-red-900/20">
        
        {/* Header Section */}
        <div className="bg-slate-950 px-8 py-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-1">Centro de Inteligencia Estratégica</h2>
              <h1 className="text-2xl font-black text-white tracking-tighter">ESTADO MAYOR STRATOS <span className="text-slate-600 font-mono text-sm ml-2">v2026.R4</span></h1>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/50 border-b border-slate-800 flex shrink-0">
          <TabButton id="strategy" label="Estrategia STRATOS" icon={Target} />
          <TabButton id="analysis" label="Análisis 2026" icon={FileText} />
          <TabButton id="order_of_battle" label="Orden de Batalla" icon={BarChart3} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,1),rgba(2,6,23,1))]">
          
          {/* TAB: STRATEGY (The Original Content) */}
          {activeTab === 'strategy' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-4xl space-y-12">
                <section>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tight">Arquitectura del Proyecto</h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    STRATOS es una plataforma de análisis geoespacial de <span className="text-white font-bold">quinta generación</span>, diseñada para anticipar el reacomodo de fuerzas tras la crisis transfronteriza de 2026.
                  </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 hover:border-red-500/30 transition-all">
                    <TrendingUp className="text-red-500 mb-4" size={32} />
                    <h4 className="text-xl font-bold text-white mb-3">Escalamiento 2026</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Incremento detectado del 23.5% en la fuerza armada ilegal. STRATOS rastrea este flujo mediante inteligencia de señales y OSINT avanzado.</p>
                  </div>
                  <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                    <Radar className="text-emerald-500 mb-4" size={32} />
                    <h4 className="text-xl font-bold text-white mb-3">Detección de Repliegue</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Algoritmo SDRGA activo para identificar corredores fluviales y terrestres usados por el ELN en el eje Apure-Arauca.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYSIS 2026 (The New Long Content) */}
          {activeTab === 'analysis' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 prose prose-invert prose-slate max-w-none">
              <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-red-600 pl-6 uppercase">Evolución de la Conflictividad Armada: Análisis Integral 2026</h2>
              
              <div className="bg-red-950/20 border-y border-red-900/30 p-6 my-8 rounded-xl">
                <p className="text-red-100 font-medium italic leading-relaxed m-0">
                  "Desde enero de 2026, la evidencia confirma una persistente fragmentación del conflicto en Colombia, donde convergen guerrillas, disidencias y organizaciones de crimen organizado, con economías ilícitas como motor territorial."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-slate-800/50 p-6 rounded-2xl text-center border border-slate-700">
                  <span className="text-4xl font-black text-white">27,000+</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Integrantes Estructuras Armadas</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl text-center border border-slate-700">
                  <span className="text-4xl font-black text-red-500">+23.5%</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Crecimiento Interanual</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl text-center border border-slate-700">
                  <span className="text-4xl font-black text-orange-500">277</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Ataques con Drones (2025)</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-12 mb-4">Dinámicas de Fragmentación y Reconfiguración</h3>
              <p className="text-slate-400 leading-relaxed">
                La Alerta 003-2026 describe la confluencia de EGC, ELN y disidencias en el sur de Bolívar, disputando minería ilegal y narcotráfico. En Nariño, la Alerta 005-2026 destaca el uso de drones modificados por el Frente Franco Benavides.
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Operaciones de Interdicción 2026</h3>
              <p className="text-slate-400 leading-relaxed">
                Destaca la operación en Catatumbo (7 bajas ELN) y la destrucción de laboratorios industriales en Guadalupe (Antioquia). En el eje andino, Ecuador reporta desmantelamiento de minería en Imbabura y Bolivia inhabilitación de pistas en el Chapare.
              </p>
            </div>
          )}

          {/* TAB: ORDER OF BATTLE (The Tables) */}
          {activeTab === 'order_of_battle' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-16">
              
              {/* Table 1: Actor Distribution */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-red-500" />
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Distribución de Actores Armados (Feb 2026)</h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/50">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 uppercase font-black tracking-widest border-b border-slate-800">
                        <th className="px-6 py-4">Grupo Armado</th>
                        <th className="px-6 py-4">Integrantes (Armas+Apoyo)</th>
                        <th className="px-6 py-4">Crecimiento</th>
                        <th className="px-6 py-4">Zonas de Consolidación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[
                        { name: 'Ejército Gaitanista (EGC)', intel: '9,500 - 11,200', growth: '+23.5%', zones: 'Risaralda, Sur de Bolívar, Caribe' },
                        { name: 'ELN', intel: '6,200 - 7,400', growth: 'Expansión Municipal', zones: 'Risaralda, Catatumbo, Sur de Bolívar' },
                        { name: 'EMC (Iván Mordisco)', intel: '4,800 - 5,600', growth: 'Uso Drones', zones: 'Nariño, Guaviare' },
                        { name: 'EMBF (Calarcá)', intel: '2,800 - 3,400', growth: 'Disputa Caquetá', zones: 'Caquetá' },
                        { name: 'Comandos de la Frontera', intel: '1,200 - 1,800', growth: 'Transfronterizo', zones: 'Putumayo, Norte de Ecuador' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{row.name}</td>
                          <td className="px-6 py-4 font-mono text-red-400">{row.intel}</td>
                          <td className="px-6 py-4 font-bold text-orange-500">{row.growth}</td>
                          <td className="px-6 py-4 text-slate-400">{row.zones}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Table 2: Operation Catatumbo */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-emerald-500" />
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Balance Operación Catatumbo (2025-2026)</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Armas Incautadas', val: '339', sub: 'Largas y Cortas', color: 'text-white' },
                    { label: 'Drones Neutralizados', val: '6', sub: 'Ataque Remoto', color: 'text-purple-400' },
                    { label: 'Cocaína Incautada', val: '39 Ton', sub: '$208 mil millones', color: 'text-emerald-400' },
                    { label: 'Explosivos Neutralizados', val: '2,514', sub: 'Minas y Cilindros', color: 'text-red-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-2">{stat.label}</p>
                      <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
                      <p className="text-[10px] text-slate-600 mt-1 font-mono">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Table 4: ZUT */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <MapIcon className="text-blue-500" />
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Zonas de Ubicación Temporal (ZUT)</h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/50">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 uppercase font-black tracking-widest border-b border-slate-800">
                        <th className="px-6 py-4">Grupo</th>
                        <th className="px-6 py-4">Ubicación</th>
                        <th className="px-6 py-4">Vigencia / Objetivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[
                        { group: 'EGC (Clan del Golfo)', loc: 'Unguía, Chocó', obj: 'Hasta dic. 2026. Tránsito a la legalidad' },
                        { group: 'EGC (Clan del Golfo)', loc: 'Tierralta, Córdoba', obj: 'Pedagogía de paz y sometimiento' },
                        { group: 'Frente 33 (EMBF)', loc: 'Tibú, N. Santander', obj: 'Alistamiento transformación territorial' },
                        { group: 'CNEB (Marquetalia)', loc: 'Roberto Payán, Nariño', obj: 'Desescalamiento Pacífico' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-bold text-white">{row.group}</td>
                          <td className="px-6 py-4 text-blue-400">{row.loc}</td>
                          <td className="px-6 py-4 text-slate-400 font-medium">{row.obj}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 text-[9px] text-slate-500 font-mono">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div> CLASIFICADO: NIVEL 4</span>
            <span>DATA-SOURCE: SIGINT/HUMINT/OSINT 2026</span>
          </div>
          <button 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white font-black px-8 py-2 rounded-lg uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-red-900/40"
          >
            Cerrar Terminal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
