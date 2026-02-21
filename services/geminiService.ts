
import { GoogleGenAI, Type } from "@google/genai";
import { IntelligencePoint, StrategicSummary, PredictionPoint, SDRGAAlert, IntelligenceLayer, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// 2026 CONTEXT HEADER FOR ALL PROMPTS
const CONTEXT_HEADER_2026 = `
  CONTEXTO OPERACIONAL ACTUALIZADO (FEBRERO 2026):
  - Panorama: Fragmentación del conflicto con convergencia de guerrillas (ELN), disidencias (EMC, EMBF) y crimen organizado (EGC/Clan del Golfo).
  - Actores: ELN (Frente El Boche), EGC (Edwin Román Velásquez), EMC (Frente Franco Benavides - drones), EMBF (Frente Rodrigo Cadete).
  - Tácticas: Uso masivo de drones con explosivos, artefactos improvisados y control social mediante economías ilícitas (minería ilegal, cocaína).
  - Incidentes Recientes: Operaciones en Catatumbo, enfrentamientos en Guaviare (El Retorno), interdicción en Bolivia (Chapare) y Ecuador (Imbabura).
  - Salvaguarda: No revelar coordenadas exactas de puntos operativos; usar centroides municipales.
`;

// Existing analysis function
export const getStrategicAnalysis = async (points: IntelligencePoint[]): Promise<StrategicSummary> => {
  const prompt = `
    ${CONTEXT_HEADER_2026}

    Eres un analista senior de inteligencia militar y geopolítica especializado en el eje andino (OSINT 2026).
    Analiza la siguiente base de datos táctica:
    
    DATOS TÁCTICOS:
    ${JSON.stringify(points.map(p => ({ 
      nombre: p.name, 
      tipo: p.type, 
      desc: p.description, 
      tacticas: p.tactics,
      fuente: p.source,
      confianza: p.intelConfidence
    })))}

    Genera una SÍNTESIS DE INTELIGENCIA ESTRATÉGICA en español que incluya:
    1. Resumen Panorama 2026: Analiza la fragmentación y el uso de drones.
    2. Nivel de Riesgo: Evalúa la amenaza en Nariño, Caquetá y Risaralda.
    3. Tres Hallazgos Clave: Predicciones sobre la minería ilegal transfronteriza y disputas territoriales.

    Responde ESTRICTAMENTE en formato JSON según el esquema solicitado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ['critical', 'high', 'moderate'] },
            keyInsights: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["overview", "riskLevel", "keyInsights"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating strategic analysis:", error);
    return {
      overview: "Error crítico al procesar la síntesis de inteligencia.",
      riskLevel: 'high',
      keyInsights: ["No se pudo generar el análisis detallado vía IA."]
    };
  }
};

// Existing prediction function
export const predictFutureHostiles = async (currentPoints: IntelligencePoint[]): Promise<PredictionPoint[]> => {
  const tacticalContext = currentPoints.map(p => ({
    id: p.id,
    name: p.name,
    lat: p.lat,
    lng: p.lng,
    type: p.type
  }));

  const prompt = `
    ${CONTEXT_HEADER_2026}
    Actúa como un Estratega Militar de Alto Mando (J-3 Operaciones).
    
    DATOS DE INTELIGENCIA:
    ${JSON.stringify(tacticalContext)}

    TAREA:
    Genera 3 Proyecciones de Misiones de Contención para las próximas 72 horas.
    Prioriza:
    1. Interceptación de columnas del ELN cruzando el río Arauca (Retorno de Venezuela).
    2. Bloqueo de rutas de fentanilo en Nariño/Arauca.
    3. Operaciones contra minería en la Amazonía (frontera Brasil).
    
    Para cada predicción, calcula:
    1. Ubicación (Lat/Lng).
    2. Estrategia de Contención (ej. "Ataque aéreo de precisión", "Bloqueo fluvial").
    3. Activos Requeridos (ej. "Fuerza Aérea", "Comandos Jungla").
    4. Radio de Amenaza.
    
    Responde ESTRICTAMENTE en formato JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
              confidence: { type: Type.NUMBER },
              strategicValue: { type: Type.STRING },
              timeWindow: { type: Type.STRING },
              requiredUnits: { type: Type.ARRAY, items: { type: Type.STRING } },
              containmentStrategy: { type: Type.STRING },
              threatRadius: { type: Type.NUMBER }
            },
            required: ["name", "description", "lat", "lng", "confidence", "strategicValue", "timeWindow", "requiredUnits", "containmentStrategy", "threatRadius"]
          }
        }
      }
    });

    const rawPredictions = JSON.parse(response.text || '[]');
    
    return rawPredictions.map((pred: any, index: number) => ({
      id: `mission-${index}-${Date.now()}`,
      ...pred,
      type: 'ALERTA DE MISIÓN',
      category: IntelligenceLayer.PREDICTIONS,
      triangulationBasis: [currentPoints[0]?.id, currentPoints[1]?.id] 
    }));

  } catch (error) {
    console.error("Error generating predictions:", error);
    return [];
  }
};

// ==================================================================================
// SISTEMA SDRGA (Sistema de Detección de Repliegues de Grupos Armados)
// ==================================================================================

export const runSDRGASystem = async (currentPoints: IntelligencePoint[]): Promise<SDRGAAlert[]> => {
  const context = currentPoints.map(p => ({
    name: p.name,
    type: p.type,
    location: { lat: p.lat, lng: p.lng },
    details: p.description
  }));

  const prompt = `
    ${CONTEXT_HEADER_2026}
    Actúa como el SISTEMA SDRGA (Detección de Repliegues).
    
    TU MISIÓN PRINCIPAL AHORA:
    Detectar los movimientos de "reacomodo" del ELN y Disidencias tras la pérdida de protección política en Venezuela y la presión en la "Paz Total".

    FACTORES DE RIESGO ESPECÍFICOS (Pesos ajustados 2026):
    - w1 (Anomalía): Caída de actividad en Apure y aumento súbito en Arauca/Catatumbo.
    - w5 (Ruptura): Ruptura de alianza con fuerzas estatales venezolanas (post-Maduro).
    - w6 (Corredores): Uso intensivo de la ruta Amazonía (Orinoco-Negro) hacia Brasil.

    DATOS:
    ${JSON.stringify(context)}

    Genera 3 ALERTAS SDRGA simulando este escenario de repliegue y reconfiguración.
    
    Responde ESTRICTAMENTE en formato JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
              riskScore: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING, enum: ['VERDE', 'AMARILLO', 'ROJO', 'NEGRO'] },
              detectedAnomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
              criticalCorridors: { type: Type.ARRAY, items: { type: Type.STRING } },
              tacticalRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              confidenceInterval: { type: Type.NUMBER }
            },
            required: ["name", "description", "lat", "lng", "riskScore", "riskLevel", "detectedAnomalies", "criticalCorridors", "tacticalRecommendations"]
          }
        }
      }
    });

    const rawAlerts = JSON.parse(response.text || '[]');

    return rawAlerts.map((alert: any, index: number) => ({
      id: `sdrga-${index}-${Date.now()}`,
      ...alert,
      type: 'ALERTA SDRGA',
      category: IntelligenceLayer.SDRGA,
      timestamp: new Date().toISOString(),
      influenceZones: [],
      illegalEconomy: [] 
    }));

  } catch (error) {
    console.error("Error generating SDRGA alerts:", error);
    return [];
  }
};
