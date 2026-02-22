
import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-polylinedecorator';
import { IntelligenceLayer, IntelligencePoint, MovementRoute, PredictionPoint, SDRGAAlert, RiskLevel } from '../types';
import {
  COLOMBIA_CENTER,
  MOCK_FRONTS,
  MOCK_ACTIONS,
  MOCK_INFRASTRUCTURE,
  MOCK_ROUTES,
  MOCK_URBAN
} from '../constants';

const createIcon = (color: string, pulse = true) => L.divIcon({
  html: `<div class="group relative">
           <div class="w-4 h-4 rounded-full bg-${color}-500 border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-125"></div>
           ${pulse ? `<div class="absolute inset-0 w-4 h-4 rounded-full bg-${color}-500 animate-ping opacity-25"></div>` : ''}
         </div>`,
  className: 'custom-div-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Advanced Threat Scope Icon
const predictionIcon = L.divIcon({
  html: `
    <div class="relative w-0 h-0 flex items-center justify-center">
        <div class="absolute w-4 h-4 bg-purple-600 rounded-full shadow-[0_0_15px_#a855f7] z-20 border-2 border-white"></div>
        <div class="absolute w-12 h-12 border border-purple-400/50 rounded-full animate-spin-slow z-10"></div>
        <div class="absolute w-20 h-[1px] bg-purple-500/30"></div>
        <div class="absolute h-20 w-[1px] bg-purple-500/30"></div>
    </div>
  `,
  className: 'prediction-icon',
  iconSize: [0, 0],
});

// SDRGA Alert Icon Generator
const getSDRGAIcon = (level: RiskLevel) => {
  let colorClass = 'bg-green-500';
  let borderClass = 'border-green-400';
  let shadowColor = '#22c55e';

  if (level === RiskLevel.AMARILLO) {
    colorClass = 'bg-yellow-500';
    borderClass = 'border-yellow-400';
    shadowColor = '#eab308';
  } else if (level === RiskLevel.ROJO) {
    colorClass = 'bg-red-600';
    borderClass = 'border-red-500';
    shadowColor = '#dc2626';
  } else if (level === RiskLevel.NEGRO) {
    colorClass = 'bg-slate-950';
    borderClass = 'border-red-600'; // Black alert has red border
    shadowColor = '#000000';
  }

  return L.divIcon({
    html: `
        <div class="relative w-0 h-0 flex items-center justify-center">
            <div class="absolute w-6 h-6 ${colorClass} rounded-sm rotate-45 border-2 ${borderClass} shadow-[0_0_20px_${shadowColor}] z-20 flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <div class="absolute w-16 h-16 border-2 ${borderClass} border-dashed rounded-full animate-spin-slow opacity-60"></div>
        </div>
        `,
    className: 'sdrga-icon',
    iconSize: [0, 0],
  });
};

const getLevelColor = (level: RiskLevel) => {
  switch (level) {
    case RiskLevel.VERDE: return '#22c55e';
    case RiskLevel.AMARILLO: return '#eab308';
    case RiskLevel.ROJO: return '#dc2626';
    case RiskLevel.NEGRO: return '#000000';
    default: return '#000000';
  }
}


const frontIcon = createIcon('red');
const actionIcon = createIcon('orange');
const infraIcon = createIcon('yellow', false);
const urbanIcon = createIcon('blue');

interface TacticalMapProps {
  activeLayers: Set<IntelligenceLayer>;
  searchTerm: string;
  onPointSelect: (point: IntelligencePoint | null) => void;
  predictedPoints: PredictionPoint[];
  sdrgaAlerts: SDRGAAlert[]; // New prop
}

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => { map.invalidateSize(); }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  useEffect(() => { map.setView(center); }, [center, map]);
  return null;
};

const RouteDecorator: React.FC<{ positions: [number, number][], color: string }> = ({ positions, color }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length < 2) return;
    const polyline = L.polyline(positions);
    const decorator = L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: '10%',
          repeat: '20%',
          symbol: L.Symbol.arrowHead({
            pixelSize: 12,
            polygon: false,
            pathOptions: { stroke: true, color, weight: 3, opacity: 0.8 }
          })
        }
      ]
    }).addTo(map);
    return () => { map.removeLayer(decorator); };
  }, [map, positions, color]);
  return null;
};

const TacticalMap: React.FC<TacticalMapProps> = ({
  activeLayers,
  searchTerm,
  onPointSelect,
  predictedPoints,
  sdrgaAlerts
}) => {

  const filterPoints = (points: IntelligencePoint[]) => {
    if (!searchTerm) return points;
    const term = searchTerm.toLowerCase();
    return points.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  };

  const handleRouteClick = (r: MovementRoute) => {
    // Determine a center point for the panel logic (although lines are spread out)
    const centerIdx = Math.floor(r.path.length / 2);
    const centerPt = r.path[centerIdx] || { lat: 0, lng: 0 };

    const routeAsPoint: IntelligencePoint = {
      id: r.id,
      name: r.name,
      description: r.description + (r.details ? ` - ${r.details}` : ''),
      type: r.type === 'illegal' ? 'CORREDOR ILEGAL' : r.type === 'trocha' ? 'TROCHA FRONTERIZA' : 'RUTA FLUVIAL',
      category: IntelligenceLayer.ROUTES,
      lat: centerPt.lat,
      lng: centerPt.lng,
      intensity: 'medium',
      influenceZones: [],
      illegalEconomy: []
    };
    onPointSelect(routeAsPoint);
  };

  const renderMarker = (p: IntelligencePoint, icon: L.DivIcon) => (
    <Marker
      key={p.id}
      position={[p.lat, p.lng]}
      icon={icon}
      eventHandlers={{ click: () => onPointSelect(p) }}
    >
      <Popup className="tactical-popup">
        <div className="p-1">
          <h3 className="font-bold text-slate-100 mb-0.5">{p.name}</h3>
          <p className="text-[9px] text-red-500 font-black uppercase tracking-tighter mb-1">{p.type}</p>
          <button
            className="w-full bg-slate-800 hover:bg-slate-700 py-1.5 rounded text-[10px] text-slate-200 font-bold transition-colors"
            onClick={() => onPointSelect(p)}
          >
            VER FICHA
          </button>
        </div>
      </Popup>
    </Marker>
  );

  return (
    <div className="relative flex-1 h-full w-full">
      <MapContainer
        center={COLOMBIA_CENTER}
        zoom={6}
        style={{ height: '100%', width: '100%', background: '#f8fafc' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Standard Layers */}
        {activeLayers.has(IntelligenceLayer.FRONTS) && filterPoints(MOCK_FRONTS).map(p => (
          <React.Fragment key={p.id}>
            {renderMarker(p, frontIcon)}
            <Circle
              center={[p.lat, p.lng]}
              radius={35000}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.1, dashArray: '10, 10', weight: 1 }}
            />
          </React.Fragment>
        ))}

        {activeLayers.has(IntelligenceLayer.ACTIONS) && filterPoints(MOCK_ACTIONS).map(p => renderMarker(p, actionIcon))}
        {activeLayers.has(IntelligenceLayer.INFRASTRUCTURE) && filterPoints(MOCK_INFRASTRUCTURE).map(p => renderMarker(p, infraIcon))}
        {activeLayers.has(IntelligenceLayer.URBAN) && filterPoints(MOCK_URBAN).map(p => renderMarker(p, urbanIcon))}

        {/* Prediction Layer */}
        {activeLayers.has(IntelligenceLayer.PREDICTIONS) && predictedPoints.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={predictionIcon} eventHandlers={{ click: () => onPointSelect(p) }} />
        ))}

        {/* SDRGA SYSTEM LAYER */}
        {activeLayers.has(IntelligenceLayer.SDRGA) && sdrgaAlerts.map(alert => (
          <React.Fragment key={alert.id}>
            {/* Alert Marker */}
            <Marker
              position={[alert.lat, alert.lng]}
              icon={getSDRGAIcon(alert.riskLevel)}
              eventHandlers={{ click: () => onPointSelect(alert) }}
            >
              <Popup className="tactical-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-white uppercase text-xs">ALERTA {alert.riskLevel}</h3>
                    <span className="text-[10px] font-mono font-bold text-red-400">SCORE: {alert.riskScore}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight mb-2">{alert.name}</p>
                  <button
                    className="w-full bg-red-900 hover:bg-red-800 py-1.5 rounded text-[9px] text-white font-bold transition-colors uppercase"
                    onClick={() => onPointSelect(alert)}
                  >
                    PROTOCOLO DE RESPUESTA
                  </button>
                </div>
              </Popup>
            </Marker>

            {/* Threat Zones */}
            <Circle
              center={[alert.lat, alert.lng]}
              radius={alert.riskLevel === RiskLevel.NEGRO ? 80000 : 40000}
              pathOptions={{
                color: getLevelColor(alert.riskLevel),
                fillColor: getLevelColor(alert.riskLevel),
                fillOpacity: 0.12,
                weight: 2,
                dashArray: '20, 10'
              }}
            />

            {/* AI Retreat Paths & Destinations */}
            {alert.retreatRoutes && alert.retreatRoutes.map((route, idx) => {
              const positions: [number, number][] = route.map(pt => [pt.lat, pt.lng]);
              if (positions.length < 2) return null;

              return (
                <React.Fragment key={`retreat-${alert.id}-${idx}`}>
                  {/* Animated Escape Route */}
                  <Polyline
                    positions={positions}
                    pathOptions={{
                      color: '#ef4444',
                      weight: 3,
                      dashArray: '10, 15',
                      className: 'animate-retreat-pulse'
                    }}
                  />
                  <RouteDecorator positions={positions} color="#ef4444" />
                </React.Fragment>
              );
            })}

            {/* Probable Destination Marker (Crosshair) */}
            {alert.probableDestination && (
              <Marker
                position={[alert.probableDestination.lat, alert.probableDestination.lng]}
                icon={L.divIcon({
                  html: `<div class="relative w-0 h-0 flex items-center justify-center">
                           <div class="absolute w-4 h-4 rounded-full border-2 border-red-500 animate-ping"></div>
                           <div class="absolute w-2 h-2 bg-red-600 rounded-full"></div>
                           <div class="absolute w-8 h-[1px] bg-red-400"></div>
                           <div class="absolute h-8 w-[1px] bg-red-400"></div>
                         </div>`,
                  className: 'destination-icon',
                  iconSize: [0, 0]
                })}
              >
                <Popup className="tactical-popup">
                  <div className="p-1">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-1">Punto de Acantonamiento Previsto</p>
                    <p className="text-[9px] text-slate-300">Lat: {alert.probableDestination.lat.toFixed(4)}, Lng: {alert.probableDestination.lng.toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </React.Fragment>
        ))}

        {/* Routes */}
        {activeLayers.has(IntelligenceLayer.ROUTES) && MOCK_ROUTES.map(r => (
          <React.Fragment key={r.id}>
            {/* Invisible thicker polyline for easier touching/clicking */}
            <Polyline
              positions={r.path.map(pt => [pt.lat, pt.lng] as [number, number])}
              pathOptions={{ weight: 20, opacity: 0 }}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  handleRouteClick(r);
                }
              }}
            />
            {/* Visible polyline */}
            <Polyline
              positions={r.path.map(pt => [pt.lat, pt.lng] as [number, number])}
              pathOptions={{
                color: r.type === 'illegal' ? '#059669' : r.type === 'fluvial' ? '#0284c7' : '#d97706',
                weight: 4,
                opacity: 0.8,
                dashArray: r.type === 'trocha' ? '5, 10' : undefined
              }}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  handleRouteClick(r);
                }
              }}
            >
              <Popup className="tactical-popup">
                <div className="p-1">
                  <h3 className="font-bold text-slate-100 mb-0.5">{r.name}</h3>
                  <p className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter mb-1">
                    {r.type === 'illegal' ? 'CORREDOR ILEGAL' : r.type === 'fluvial' ? 'RUTA FLUVIAL' : 'TROCHA'}
                  </p>
                  <button
                    className="w-full bg-slate-800 hover:bg-slate-700 py-1.5 rounded text-[10px] text-slate-200 font-bold transition-colors"
                    onClick={() => handleRouteClick(r)}
                  >
                    VER DETALLES
                  </button>
                </div>
              </Popup>
            </Polyline>
            <RouteDecorator
              positions={r.path.map(pt => [pt.lat, pt.lng] as [number, number])}
              color={r.type === 'illegal' ? '#059669' : r.type === 'fluvial' ? '#0284c7' : '#d97706'}
            />
          </React.Fragment>
        ))}

        <MapUpdater center={COLOMBIA_CENTER} />
      </MapContainer>

      {/* Leyenda SDRGA (Only if Active) */}
      {
        activeLayers.has(IntelligenceLayer.SDRGA) && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-xl px-6 py-3 rounded-full border border-red-900/50 z-[1000] shadow-[0_0_50px_rgba(220,38,38,0.3)] flex items-center gap-6">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> SISTEMA SDRGA ACTIVO
            </span>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex gap-4 text-[9px] font-bold text-slate-400">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-sm"></div> VERDE</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-sm"></div> AMARILLO</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-600 rounded-sm"></div> ROJO</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-black border border-red-500 rounded-sm"></div> NEGRO</span>
            </div>
          </div>
        )
      }

      <style>{`
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
      `}</style>
    </div >
  );
};

export default TacticalMap;
