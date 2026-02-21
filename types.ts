
export enum IntelligenceLayer {
  FRONTS = 'fronts',
  ACTIONS = 'actions',
  INFRASTRUCTURE = 'infrastructure',
  ROUTES = 'routes',
  URBAN = 'urban',
  PREDICTIONS = 'predictions',
  SDRGA = 'sdrga' // New Layer for the Withdrawal Detection System
}

export enum RiskLevel {
  VERDE = 'VERDE',     // 0-20
  AMARILLO = 'AMARILLO', // 21-50
  ROJO = 'ROJO',       // 51-75
  NEGRO = 'NEGRO'      // 76-100
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface IntelligencePoint extends GeoPoint {
  id: string;
  name: string;
  description: string;
  type: string;
  category: IntelligenceLayer;
  intensity?: 'low' | 'medium' | 'high';
  date?: string;
  commanders?: string[];
  influenceZones?: string[];
  illegalEconomy?: string[];
  historicalContext?: string;
  relatedStructures?: string[];
  source?: string;
  tactics?: string[];
  intelConfidence?: 'Alta' | 'Media' | 'Baja';
}

// Existing Prediction Point (Standard)
export interface PredictionPoint extends IntelligencePoint {
  confidence: number;
  triangulationBasis: string[]; 
  strategicValue: string;
  timeWindow: string;
  requiredUnits: string[];
  containmentStrategy: string;
  threatRadius: number;
}

// NEW: SDRGA Specific Alert Interface
export interface SDRGAAlert extends IntelligencePoint {
  riskScore: number; // 0-100 based on the w1-w6 formula
  riskLevel: RiskLevel;
  detectedAnomalies: string[]; // e.g., "Caída abrupta de violencia", "Movimiento de civiles"
  probableDestination: GeoPoint; // Centroid of withdrawal
  criticalCorridors: string[]; // Routes being used
  tacticalRecommendations: string[]; // From the Response Matrix
  confidenceInterval: number; // e.g., 0.85
  timestamp: string;
}

export interface MovementRoute {
  id: string;
  name: string;
  path: GeoPoint[];
  type: 'legal' | 'illegal' | 'trocha';
  description: string;
  details?: string;
}

export interface StrategicSummary {
  overview: string;
  riskLevel: 'critical' | 'high' | 'moderate';
  keyInsights: string[];
}
