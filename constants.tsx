
import { IntelligencePoint, MovementRoute, IntelligenceLayer } from './types';

// Centered to view the whole conflict theater (Colombia + Venezuela + Ecuador + Brazil border)
export const COLOMBIA_CENTER: [number, number] = [4.0000, -72.0000];

export const INTEL_FRONTS: IntelligencePoint[] = [
  {
    id: 'eln-boche-2026',
    name: 'ELN - Frente Manuel Hernández "El Boche"',
    description: 'Consolidación territorial en Risaralda. Adscrito al Frente de Guerra Occidental. Enfoque en control social y expansión municipal.',
    type: 'Guerrilla (ELN)',
    category: IntelligenceLayer.FRONTS,
    lat: 5.25,
    lng: -75.90,
    intensity: 'high',
    commanders: ['Antonio García (Liderazgo Nacional)'],
    influenceZones: ['Risaralda', 'Chocó'],
    intelConfidence: 'Alta',
    source: 'Alerta Temprana 001-2026'
  },
  {
    id: 'emc-benavides-2026',
    name: 'EMC - Frente Franco Benavides',
    description: 'Uso intensivo de drones con explosivos como repertorio principal. Disputa activa en Nariño.',
    type: 'Disidencia FARC (EMC)',
    category: IntelligenceLayer.FRONTS,
    lat: 1.65,
    lng: -77.55,
    intensity: 'high',
    tactics: ['Drones con explosivos', 'Artefactos improvisados'],
    influenceZones: ['Nariño (El Peñol, El Tambo)'],
    intelConfidence: 'Alta',
    source: 'Alerta Temprana 005-2026'
  },
  {
    id: 'frente-oliver-sinisterra',
    name: 'Frente Oliver Sinisterra',
    description: 'Articulado a Segunda Marquetalia. Control de rutas de salida en el Pacífico nariñense.',
    type: 'Segunda Marquetalia',
    category: IntelligenceLayer.FRONTS,
    lat: 1.80,
    lng: -78.70,
    intensity: 'high',
    influenceZones: ['Tumaco', 'Francisco Pizarro'],
    intelConfidence: 'Alta',
    source: 'Indepaz 2026'
  },
  {
    id: 'frente-alfonso-cano',
    name: 'Frente Alfonso Cano',
    description: 'Estructura de la Segunda Marquetalia con fuerte presencia en el litoral pacífico.',
    type: 'Segunda Marquetalia',
    category: IntelligenceLayer.FRONTS,
    lat: 2.10,
    lng: -78.40,
    intensity: 'medium',
    influenceZones: ['Mosquera', 'Olaya Herrera'],
    intelConfidence: 'Alta',
    source: 'Indepaz 2026'
  },
  {
    id: 'frente-comuneros-sur',
    name: 'ELN - Frente Comuneros del Sur',
    description: 'Histórica presencia en el pie de monte costero y zona andina de Nariño.',
    type: 'Guerrilla (ELN)',
    category: IntelligenceLayer.FRONTS,
    lat: 1.20,
    lng: -77.80,
    intensity: 'high',
    influenceZones: ['Ricaurte', 'Mallama', 'Cumbitara'],
    intelConfidence: 'Alta',
    source: 'Indepaz 2026'
  }
];

export const INTEL_ACTIONS: IntelligencePoint[] = [
  {
    id: 'act-catatumbo-2026',
    name: 'Operación de Alta Precisión Catatumbo',
    description: 'Operación aérea y terrestre del Ejército. Incautación de armas, explosivos y destrucción de drones.',
    type: 'Operación Militar',
    category: IntelligenceLayer.ACTIONS,
    lat: 8.64,
    lng: -72.74,
    date: '04/02/2026',
    intensity: 'high',
    tactics: ['Bombardeo', 'Operación combinada'],
    source: 'EFE / Ejército de Colombia',
    intelConfidence: 'Alta'
  },
  {
    id: 'act-retorno-2026',
    name: 'Enfrentamiento Intra-Disidencias El Retorno',
    description: 'Choque letal entre facciones de Iván Mordisco y Calarcá Córdoba. 27 bajas confirmadas.',
    type: 'Combate Grupos Armados',
    category: IntelligenceLayer.ACTIONS,
    lat: 2.33,
    lng: -72.63,
    date: '19/01/2026',
    intensity: 'high',
    tactics: ['Choque armado directo'],
    source: 'Reuters / Fuentes Militares',
    intelConfidence: 'Alta'
  }
];

export const INTEL_INFRASTRUCTURE: IntelligencePoint[] = [
  {
    id: 'inf-guadalupe-2026',
    name: 'Laboratorio Industrial Guadalupe',
    description: 'Infraestructura de producción de clorhidrato de cocaína a escala industrial. Capacidad semanal masiva.',
    type: 'Instalación de Transformación',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 6.81,
    lng: -75.24,
    illegalEconomy: ['Cocaína'],
    source: 'El Tiempo / Fiscalía',
    intelConfidence: 'Alta'
  }
];

export const INTEL_ROUTES: MovementRoute[] = [
  {
    id: 'rt-venezuela-arauca',
    name: 'Corredor Fronterizo Arauca-Apure',
    type: 'illegal',
    description: 'Ruta de repliegue y movilidad siguiendo el lindero del río Arauca.',
    path: [
      { lat: 7.08, lng: -70.75 },
      { lat: 7.05, lng: -70.95 },
      { lat: 7.01, lng: -71.12 },
      { lat: 6.98, lng: -71.45 },
      { lat: 6.95, lng: -71.87 },
      { lat: 7.05, lng: -72.10 }
    ],
    details: 'Tránsito fluvial nocturno altamente vigilado.'
  },
  {
    id: 'rt-amazonas-pacifico',
    name: 'Eje Estratégico Amazonas-Pacífico',
    type: 'illegal',
    description: 'Corredor de movilidad transnacional desde Leticia hacia el litoral nariñense.',
    path: [
      { lat: -4.21, lng: -69.94 },
      { lat: -2.50, lng: -71.50 },
      { lat: -1.00, lng: -74.00 },
      { lat: 0.00, lng: -75.50 },
      { lat: 0.50, lng: -76.80 },
      { lat: 1.20, lng: -77.50 },
      { lat: 1.80, lng: -78.76 }
    ],
    details: 'Ruta de economías ilícitas y repliegue estratégico.'
  },
  {
    id: 'rt-narino-cordillera',
    name: 'Corredor Táctico Mpios Cordillera',
    type: 'trocha',
    description: 'Ruta de movilidad interna en la subregión Cordillera de Nariño.',
    path: [
      { lat: 1.90, lng: -77.30 },
      { lat: 1.75, lng: -77.45 },
      { lat: 1.65, lng: -77.55 },
      { lat: 1.55, lng: -77.65 }
    ]
  },
  {
    id: 'rt-narino-abades',
    name: 'Corredor Táctico Abades',
    type: 'trocha',
    description: 'Ruta de movilidad interna en la subregión Abades de Nariño.',
    path: [
      { lat: 1.40, lng: -77.35 },
      { lat: 1.50, lng: -77.50 },
      { lat: 1.65, lng: -77.55 }
    ]
  }
];

export const INTEL_URBAN: IntelligencePoint[] = [
  {
    id: 'urb-tumaco-2026',
    name: 'Nodo Tumaco',
    description: 'Punto crítico de convergencia de rutas del Pacífico y el Amazonas.',
    type: 'Enclave Logístico',
    category: IntelligenceLayer.URBAN,
    lat: 1.80,
    lng: -78.76,
    source: 'Indepaz 2026'
  }
];

export const MOCK_FRONTS = INTEL_FRONTS;
export const MOCK_ACTIONS = INTEL_ACTIONS;
export const MOCK_INFRASTRUCTURE = INTEL_INFRASTRUCTURE;
export const MOCK_ROUTES = INTEL_ROUTES;
export const MOCK_URBAN = INTEL_URBAN;
