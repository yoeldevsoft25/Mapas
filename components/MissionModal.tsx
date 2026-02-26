
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
      className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all text-xs font-black uppercase tracking-widest ${activeTab === id
          ? 'border-red-600 text-red-600 bg-red-50'
          : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 backdrop-blur-md bg-white/80 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

        {/* Header Section */}
        <div className="bg-white px-8 py-6 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-1">Centro de Inteligencia Estratégica</h2>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">ESTADO MAYOR STRATOS <span className="text-slate-400 font-mono text-sm ml-2">v2026.R4</span></h1>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 flex shrink-0">
          <TabButton id="strategy" label="Estrategia STRATOS" icon={Target} />
          <TabButton id="analysis" label="Análisis 2026" icon={FileText} />
          <TabButton id="order_of_battle" label="Orden de Batalla" icon={BarChart3} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-white">

          {/* TAB: STRATEGY (The Original Content) */}
          {activeTab === 'strategy' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-4xl space-y-12">
                <section>
                  <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Arquitectura del Proyecto</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    STRATOS es una plataforma de análisis geoespacial de <span className="text-slate-900 font-bold">quinta generación</span>, diseñada para anticipar el reacomodo de fuerzas tras la crisis transfronteriza de 2026.
                  </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-red-500/30 transition-all">
                    <TrendingUp className="text-red-600" size={32} />
                    <h4 className="text-xl font-bold text-slate-900 mb-3 mt-4">Escalamiento 2026</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Incremento detectado del 23.5% en la fuerza armada ilegal. STRATOS rastrea este flujo mediante inteligencia de señales y OSINT avanzado.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-500/30 transition-all">
                    <Radar className="text-emerald-600" size={32} />
                    <h4 className="text-xl font-bold text-slate-900 mb-3 mt-4">Detección de Repliegue</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Algoritmo SDRGA activo para identificar corredores fluviales y terrestres usados por el ELN en el eje Apure-Arauca.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYSIS 2026 (The New Long Content) */}
          {activeTab === 'analysis' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-4 border-red-600 pl-6 uppercase">Evolución de la Conflictividad Armada: Análisis Integral 2026</h2>

              <div className="bg-red-50 border-y border-red-100 p-6 my-8 rounded-xl">
                <p className="text-red-900 font-medium italic leading-relaxed m-0">
                  "Desde enero de 2026, la evidencia confirma una persistente fragmentación del conflicto en Colombia, donde convergen guerrillas, disidencias y organizaciones de crimen organizado, con economías ilícitas como motor territorial."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
                  <span className="text-4xl font-black text-slate-900">27,000+</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Integrantes Estructuras Armadas</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
                  <span className="text-4xl font-black text-red-600">+23.5%</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Crecimiento Interanual</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
                  <span className="text-4xl font-black text-orange-600">277</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Ataques con Drones (2025)</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">Dinámicas de Fragmentación y Reconfiguración</h3>
              <p className="text-slate-600 leading-relaxed">
                La Alerta 003-2026 describe la confluencia de EGC, ELN y disidencias en el sur de Bolívar, disputando minería ilegal y narcotráfico. En Nariño, la Alerta 005-2026 destaca el uso de drones modificados por el Frente Franco Benavides.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Operaciones de Interdicción 2026</h3>
              <p className="text-slate-600 leading-relaxed">
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
                  <Users className="text-red-600" />
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">Distribución de Actores Armados (Feb 2026)</h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase font-black tracking-widest border-b border-slate-200">
                        <th className="px-6 py-4">Grupo Armado</th>
                        <th className="px-6 py-4">Integrantes (Armas+Apoyo)</th>
                        <th className="px-6 py-4">Crecimiento</th>
                        <th className="px-6 py-4">Zonas de Consolidación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'Ejército Gaitanista (EGC)', intel: '9,500 - 11,200', growth: '+23.5%', zones: 'Risaralda, Sur de Bolívar, Caribe' },
                        { name: 'ELN', intel: '6,200 - 7,400', growth: 'Expansión Municipal', zones: 'Risaralda, Catatumbo, Sur de Bolívar' },
                        { name: 'EMC (Iván Mordisco)', intel: '4,800 - 5,600', growth: 'Uso Drones', zones: 'Nariño, Guaviare' },
                        { name: 'EMBF (Calarcá)', intel: '2,800 - 3,400', growth: 'Disputa Caquetá', zones: 'Caquetá' },
                        { name: 'Comandos de la Frontera', intel: '1,200 - 1,800', growth: 'Transfronterizo', zones: 'Putumayo, Norte de Ecuador' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                          <td className="px-6 py-4 font-mono text-red-600">{row.intel}</td>
                          <td className="px-6 py-4 font-bold text-orange-600">{row.growth}</td>
                          <td className="px-6 py-4 text-slate-600">{row.zones}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Table 2: Operation Catatumbo */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-emerald-600" />
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">Balance Operación Catatumbo (2025-2026)</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Armas Incautadas', val: '339', sub: 'Largas y Cortas', color: 'text-white' },
                    { label: 'Drones Neutralizados', val: '6', sub: 'Ataque Remoto', color: 'text-purple-400' },
                    { label: 'Cocaína Incautada', val: '39 Ton', sub: '$208 mil millones', color: 'text-emerald-400' },
                    { label: 'Explosivos Neutralizados', val: '2,514', sub: 'Minas y Cilindros', color: 'text-red-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-2">{stat.label}</p>
                      <p className={`text-3xl font-black ${stat.color === 'text-white' ? 'text-slate-900' : stat.color}`}>{stat.val}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Table 4: ZUT */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <MapIcon className="text-blue-600" />
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">Zonas de Ubicación Temporal (ZUT)</h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase font-black tracking-widest border-b border-slate-200">
                        <th className="px-6 py-4">Grupo</th>
                        <th className="px-6 py-4">Ubicación</th>
                        <th className="px-6 py-4">Vigencia / Objetivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { group: 'EGC (Clan del Golfo)', loc: 'Unguía, Chocó', obj: 'Hasta dic. 2026. Tránsito a la legalidad' },
                        { group: 'EGC (Clan del Golfo)', loc: 'Tierralta, Córdoba', obj: 'Pedagogía de paz y sometimiento' },
                        { group: 'Frente 33 (EMBF)', loc: 'Tibú, N. Santander', obj: 'Alistamiento transformación territorial' },
                        { group: 'CNEB (Marquetalia)', loc: 'Roberto Payán, Nariño', obj: 'Desescalamiento Pacífico' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-900">{row.group}</td>
                          <td className="px-6 py-4 text-blue-600">{row.loc}</td>
                          <td className="px-6 py-4 text-slate-500 font-medium">{row.obj}</td>
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
        <div className="bg-white p-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 text-[9px] text-slate-400 font-mono">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div> CLASIFICADO: NIVEL 4</span>
            <span>DATA-SOURCE: SIGINT/HUMINT/OSINT 2026</span>
          </div>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-2 rounded-lg uppercase tracking-widest text-[10px] transition-all shadow-md"
          >
            Cerrar Terminal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
