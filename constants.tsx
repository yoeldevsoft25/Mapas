
import { IntelligencePoint, MovementRoute, IntelligenceLayer } from './types';

// Centered to view the whole conflict theater (Colombia + Venezuela + Ecuador + Brazil border)
export const COLOMBIA_CENTER: [number, number] = [4.5709, -74.2973];

export const INTEL_FRONTS: IntelligencePoint[] = [
  // ==================== ELN ====================
  {
    id: 'eln-suroccidental',
    name: 'Frente de Guerra Suroccidental (ELN)',
    description: 'Defensa territorial contra EMC y EGC. Control de minería ilegal y flujos de cocaína hacia el Pacífico. Extorsión generalizada y control social.',
    type: 'Guerrilla (ELN)',
    category: IntelligenceLayer.FRONTS,
    lat: 1.7986,
    lng: -78.7584,
    intensity: 'high',
    commanders: ['Carlos Alberto Troches Zuleta'],
    influenceZones: ['Cauca', 'Nariño', 'Macizo Colombiano'],
    intelConfidence: 'Alta',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'eln-norte',
    name: 'Frente de Guerra Norte (ELN)',
    description: 'Operaciones de aniquilamiento contra F33. Uso masivo de francotiradores, campos minados y drones explosivos. Reclutamiento forzado y contrabando binacional.',
    type: 'Guerrilla (ELN)',
    category: IntelligenceLayer.FRONTS,
    lat: 8.6390,
    lng: -72.7350,
    intensity: 'high',
    commanders: ['Comando Colegiado Rotativo', 'José Manuel Martínez Quiroz'],
    influenceZones: ['Catatumbo', 'Zulia (Venezuela)'],
    intelConfidence: 'Crítica',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'eln-oriental',
    name: 'Frente de Guerra Oriental (ELN)',
    description: 'Fuerza bélica y financiera más poderosa del ELN. Atentados sistemáticos a oleoductos y cobro de impuestos de guerra.',
    type: 'Guerrilla (ELN)',
    category: IntelligenceLayer.FRONTS,
    lat: 7.0270,
    lng: -71.4267,
    intensity: 'medium',
    commanders: ['Mando Colegiado (Línea Dura)'],
    influenceZones: ['Arauca', 'Casanare', 'Boyacá', 'Apure (Venezuela)'],
    intelConfidence: 'Alta',
    source: 'Informe Estratégico Andino 2026'
  },

  // ==================== DISIDENCIAS FARC (EMC / EMBF) ====================
  {
    id: 'emc-mordisco',
    name: 'Estado Mayor Central - Facción Iván Mordisco',
    description: 'Hostigamiento sistemático con uso avanzado de enjambres de drones explosivos. Reclutamiento forzado indígena y operaciones transnacionales.',
    type: 'Disidencia FARC (EMC)',
    category: IntelligenceLayer.FRONTS,
    lat: 2.3926,
    lng: -76.9900,
    intensity: 'high',
    tactics: ['Enjambres de Drones (UAV)', 'Campos Minados'],
    commanders: ['Néstor Gregorio Vera (Iván Mordisco)'],
    influenceZones: ['Cauca', 'Nariño', 'Valle del Cauca'],
    intelConfidence: 'Crítica',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'emc-frente-primero',
    name: 'Frente Primero (EMC)',
    description: 'Hegemonía basada en la minería ilegal de oro mediante megadragas fluviales. Subyugación de comunidades indígenas para extracción aurífera.',
    type: 'Disidencia FARC (EMC)',
    category: IntelligenceLayer.FRONTS,
    lat: -1.0000,
    lng: -69.5000,
    intensity: 'medium',
    illegalEconomy: ['Minería Ilegal (Oro)'],
    influenceZones: ['Amazonas', 'Vaupés', 'Trapecio Amazónico (Frontera Brasil)'],
    intelConfidence: 'Confirmada',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'embf-calarca',
    name: 'Estado Mayor de Bloques y Frentes (EMBF)',
    description: 'Consolidación de control territorial blando bajo escudo de acuerdos de paz (ZUT). Expansión de milicias urbanas y cobro de impuestos.',
    type: 'Disidencia FARC (EMBF)',
    category: IntelligenceLayer.FRONTS,
    lat: 2.1100,
    lng: -74.7600,
    intensity: 'low',
    commanders: ['Alexander Díaz Mendoza (Calarcá)'],
    influenceZones: ['Caquetá', 'Guaviare', 'Meta', 'Sabanas del Yarí'],
    intelConfidence: 'Alta',
    source: 'Informe Estratégico Andino 2026'
  },

  // ==================== SEGUNDA MARQUETALIA Y CF ====================
  {
    id: 'smarquetalia-central',
    name: 'Segunda Marquetalia (Línea Central)',
    description: 'Alianzas mercenarias con el ELN para repeler al EMC en el Pacífico. Retaguardia estratégica absoluta y mando central en Venezuela.',
    type: 'Segunda Marquetalia',
    category: IntelligenceLayer.FRONTS,
    lat: 1.7986,
    lng: -78.7584,
    intensity: 'medium',
    commanders: ['Luciano Marín (Iván Márquez)', 'Zarco Aldinever', 'Walter Mendoza'],
    influenceZones: ['Nariño', 'Amazonas (VEN)', 'Apure (VEN)'],
    intelConfidence: 'Confirmada',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'comandos-frontera',
    name: 'Comandos de la Frontera (Ejército Bolivariano)',
    description: 'Fuerza cuasi-hegemónica de choque e infantería. Violencia cruda e incursiones contra militares en Ecuador. Monopolio del narcotráfico sur.',
    type: 'Crimen Transnacional',
    category: IntelligenceLayer.FRONTS,
    lat: 0.5133,
    lng: -76.5007,
    intensity: 'high',
    influenceZones: ['Putumayo', 'Sucumbíos (ECU)', 'Carchi (ECU)'],
    intelConfidence: 'Crítica',
    source: 'Informe Estratégico Andino 2026'
  },

  // ==================== CLAN DEL GOLFO / EGC ====================
  {
    id: 'egc-mando-central',
    name: 'Estado Mayor Conjunto EGC (Clan del Golfo)',
    description: 'Comando corporativo y macro-estrategia militar. Negociación socio-jurídica para repliegue hacia ZUT en Chocó y Córdoba.',
    type: 'Grupo Armado Organizado (EGC)',
    category: IntelligenceLayer.FRONTS,
    lat: 8.1730,
    lng: -76.0590,
    intensity: 'medium',
    commanders: ['Jobanis de Jesús Ávila (Chiquito Malo)', 'Jerónimo', 'Rodrigo'],
    influenceZones: ['Chocó (Belén de Bajirá, Unguía)', 'Córdoba (Tierralta)'],
    intelConfidence: 'Alta',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'egc-bloque-central',
    name: 'Bloque Central Gaitanista',
    description: 'Uso del terror y masacres. Guerra de exterminio contra disidencias por el control aurífero del país. Explotación ecocida y extorsión.',
    type: 'Grupo Armado Organizado (EGC)',
    category: IntelligenceLayer.FRONTS,
    lat: 7.5950,
    lng: -74.8050,
    intensity: 'high',
    commanders: ['José Gonzalo Sánchez (Gonzalito)'],
    illegalEconomy: ['Minería Ilegal del Oro'],
    influenceZones: ['Bajo Cauca Antioqueño', 'Sur de Córdoba'],
    intelConfidence: 'Crítica',
    source: 'Informe Estratégico Andino 2026'
  },
  {
    id: 'egc-edwin-roman',
    name: 'Estructura Edwin Román Velásquez Valle',
    description: 'Hostigamientos tácticos contra la Cuarta Brigada del Ejército. Uso de camuflaje privativo militar para inteligencia y custodia de cristalizaderos.',
    type: 'Grupo Armado Organizado (EGC)',
    category: IntelligenceLayer.FRONTS,
    lat: 6.0600,
    lng: -75.7900,
    intensity: 'high',
    tactics: ['Camuflaje y Engaño', 'Hostigamiento Suroeste'],
    influenceZones: ['Antioquia', 'Suroeste Antioqueño'],
    intelConfidence: 'Confirmada',
    source: 'Informe Estratégico Andino 2026'
  }
];


export const INTEL_ACTIONS: IntelligencePoint[] = [
  {
    id: 'act-catatumbo-2026',
    name: 'Operación Catatumbo (Bombardeo Aéreo)',
    description: 'Ofensiva conjunta. Primer bombardeo en 5 años contra ELN y disidencias. Destrucción de drones explosivos y hallazgo de trincheras subterráneas. Saldo: 7 neutralizados.',
    type: 'Operación Militar',
    category: IntelligenceLayer.ACTIONS,
    lat: 8.6333,
    lng: -72.9333,
    date: '04/02/2026',
    intensity: 'high',
    tactics: ['Bombardeo Aéreo', 'Artillería Pesada', 'Asalto Helitransportado'],
    source: 'Infobae / RTVC Noticias / Ejército Nacional',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'act-sardinata-2026',
    name: 'Decapitación alias "Tajoy Yuca" (Sardinata)',
    description: 'Asalto de Grupo de Operaciones Especiales (Policía) y FAC contra el Frente Juan Fernando Porras (ELN). Abatido el cabecilla de finanzas.',
    type: 'Operación de Asalto',
    category: IntelligenceLayer.ACTIONS,
    lat: 8.0833,
    lng: -72.8,
    date: '05/02/2026',
    intensity: 'high',
    tactics: ['Inserción Helitransportada', 'Combate Cerrado'],
    source: 'Director Policía Nacional',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'act-pacifico-2026',
    name: 'Interdicción Marítima de Aguas Profundas',
    description: 'Persecución naval a embarcación "go-fast" en el Pacífico. Incautación de 2.3 toneladas de clorhidrato de cocaína pura.',
    type: 'Interdicción Naval',
    category: IntelligenceLayer.ACTIONS,
    lat: 1.8,
    lng: -78.75,
    date: '14/02/2026',
    intensity: 'high',
    tactics: ['Persecución Naval', 'Radar Anómalo'],
    source: 'Armada de Colombia',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'act-tumaco-2026',
    name: 'Interdicción Costera Tumaco',
    description: 'Decomiso de 1.1 toneladas de cocaína mediante operación de guardacostas orientada a la asfixia de organizaciones en el Pacífico sur.',
    type: 'Interdicción Naval',
    category: IntelligenceLayer.ACTIONS,
    lat: 1.8067,
    lng: -78.7647,
    date: '09/02/2026',
    intensity: 'medium',
    tactics: ['Control Marítimo'],
    source: 'Prensa Latina / RTVC Noticias',
    intelConfidence: 'Alta'
  },
  {
    id: 'act-tunja-2026',
    name: 'Atentado Fallido con VBIED en Tunja',
    description: 'Volqueta cargada con 24 tatucos explotó accidentalmente durante proceso de desactivación cerca al Batallón Bolívar. Iniciador electrónico temporizado.',
    type: 'Ataque Terrorista',
    category: IntelligenceLayer.ACTIONS,
    lat: 5.5325,
    lng: -73.3617,
    date: '15/11/2025',
    intensity: 'high',
    tactics: ['VBIED', 'Tatucos / Cilindros Bomba'],
    source: 'Noticias Caracol',
    intelConfidence: 'Alta'
  },
  {
    id: 'act-tame-2026',
    name: 'Hostigamiento Aéreo No Tripulado (Tame)',
    description: 'Infantería de la 18.ª Brigada neutralizó un dron explosivo y capturó a combatiente del ELN durante barrido de control territorial.',
    type: 'Operación Militar / Combate',
    category: IntelligenceLayer.ACTIONS,
    lat: 6.4333,
    lng: -71.7333,
    date: '30/01/2026',
    intensity: 'high',
    tactics: ['Drones Explosivos', 'Guerra Electrónica'],
    source: 'Arauca Online / Ejército Nacional',
    intelConfidence: 'Alta'
  },
  {
    id: 'act-buenaventura-2026',
    name: 'Operación Sometimiento y Rescate (Buenaventura)',
    description: 'Presión en zona rural causó sometimiento de combatientes del Fte Jaime Martínez y rescate de menores. En la Comuna 7 se capturó a alias "Minuto" de "Los Shottas".',
    type: 'Operación Combinada Urbano-Rural',
    category: IntelligenceLayer.ACTIONS,
    lat: 3.8833,
    lng: -77.0667,
    date: '10/02/2026',
    intensity: 'medium',
    tactics: ['Cerco Militar', 'Allanamientos Urbanos'],
    source: 'Armada de Colombia / Policía Nacional',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'act-zulia-2026',
    name: 'Operación Relámpago del Catatumbo (Venezuela)',
    description: 'La FANB de Venezuela ejecutó destrucción de laboratorios y campamentos de cárteles transnacionales en el estado Zulia, adyacente al Catatumbo.',
    type: 'Operación Extranjera',
    category: IntelligenceLayer.ACTIONS,
    lat: 9.0,
    lng: -72.6667,
    date: '20/01/2026',
    intensity: 'high',
    tactics: ['Destrucción de Laboratorios', 'Antinarcóticos'],
    source: 'Ministerio de Relaciones Interiores (Venezuela)',
    intelConfidence: 'Crítica'
  }
];

export const INTEL_INFRASTRUCTURE: IntelligencePoint[] = [
  // Cristalizaderos a Escala Industrial
  {
    id: 'inf-orito-putumayo',
    name: 'Complejo Cocacolero Orito-Putumayo',
    description: 'Mega-laboratorio escalonado con capacidad de cristalización superior a 3 toneladas mensuales. Planta eléctrica industrial y sistema de destilación de éter.',
    type: 'Instalación de Transformación',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 0.662,
    lng: -76.871,
    illegalEconomy: ['Cocaína'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'inf-samaniego-eln',
    name: 'Cristalizadero Fortificado ELN Samaniego',
    description: 'Instalación gigantesca con infraestructura de secado por microondas, barracas para 50 operarios y anillos de seguridad con minería antipersonal.',
    type: 'Instalación de Transformación',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 1.341,
    lng: -77.592,
    illegalEconomy: ['Cocaína', 'Tráfico de Armas'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-argelia-micay',
    name: 'Enclave Químico Argelia-Micay',
    description: 'Red de tres laboratorios interconectados bajo dosel selvático. Capacidad de procesamiento continuo abasteciendo semisumergibles en el Pacífico.',
    type: 'Instalación de Transformación',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 2.275,
    lng: -77.214,
    illegalEconomy: ['Cocaína', 'Extorsión'],
    source: 'Fiscalía General',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-tarapaca',
    name: 'Acopio Fluvial y Procesamiento Tarapacá',
    description: 'Bodegas subterráneas y cristalizadero secundario acoplado a ribera. Capacidad de almacenamiento superior a 2 toneladas antes de envío a Brasil/Perú.',
    type: 'Instalación Logística Clandestina',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -2.905,
    lng: -69.752,
    illegalEconomy: ['Cocaína'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-catatumbo-tibu',
    name: 'Centro de Cristalización Catatumbo-Tibú',
    description: 'Infraestructura transnacional a escasos kilómetros de la frontera. Capacidad de 4 toneladas/mes, integrado a rutas de exportación hacia el Caribe venezolano.',
    type: 'Instalación de Transformación',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 8.641,
    lng: -72.730,
    illegalEconomy: ['Cocaína'],
    source: 'Inteligencia Compartida',
    intelConfidence: 'Crítica'
  },

  // Eje Transfronterizo Ecuador-Colombia
  {
    id: 'inf-shushufindi',
    name: 'Complejo Aurífero Shushufindi',
    description: 'Campamento minero mecanizado equipado con retroexcavadoras y bombas de agua industriales. Capacidad de extracción de 50 g de oro/día.',
    type: 'Complejo Extractivo',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -0.180,
    lng: -76.645,
    illegalEconomy: ['Minería Ilegal (Oro)', 'Lavado de Activos'],
    source: 'Inteligencia Ecuador/Colombia',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'inf-putumayo-logistico',
    name: 'Hub Logístico Fluvial Río Putumayo',
    description: 'Zonas de bodegaje camufladas en la ribera para acopio de toneladas de narcóticos y adaptación de lanchas de doble fondo.',
    type: 'Instalación Logística Clandestina',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 0.121,
    lng: -76.315,
    illegalEconomy: ['Cocaína', 'Tráfico de Armas'],
    source: 'Inteligencia Naval',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-cuyabeno',
    name: 'Plantación Industrial Cuyabeno Sur',
    description: 'Sector agrícola deforestado albergando más de 10.000 arbustos maduros de coca. Protegido por guardia armada de los Comandos de la Frontera.',
    type: 'Plantación Ilegal',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -0.118,
    lng: -76.331,
    illegalEconomy: ['Cultivo Ilegal'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'inf-gerente',
    name: 'Central de Operaciones Financieras "Gerente"',
    description: 'Red de edificaciones e infraestructuras fachada (103 bienes allanados) utilizadas para la integración de oro ilegal y drogas al sistema financiero.',
    type: 'Estructura Financiera',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 0.083,
    lng: -76.883,
    illegalEconomy: ['Lavado de Activos', 'Economías Fachada'],
    source: 'Fiscalía',
    intelConfidence: 'Crítica'
  },
  {
    id: 'inf-e10',
    name: 'Campamento de Interdicción Ruta E10',
    description: 'Base de control de paso logístico para maquinaria amarilla y precursores provenientes del norte. Infraestructura de extorsión a transportistas.',
    type: 'Campamento Base',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 0.055,
    lng: -77.218,
    illegalEconomy: ['Extorsión', 'Logística Minera'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Alta'
  },

  // Minería Ilegal Fluvial y a Cielo Abierto
  {
    id: 'inf-nanay',
    name: 'Enjambre de Tracas Río Nanay (Puca Urco)',
    description: 'Flotilla superior a 5 estructuras pesadas operando simultáneamente. Equipadas con Starlink, vigilancia por drones y tuberías para destrucción de riberas.',
    type: 'Complejo Extractivo Fluvial',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -3.425,
    lng: -74.318,
    illegalEconomy: ['Minería Ilegal (Oro)', 'Trata de Personas'],
    source: 'Monitoreo Ambiental Perú',
    intelConfidence: 'Crítica'
  },
  {
    id: 'inf-pure',
    name: 'Complejo Extractivo Río Puré',
    description: 'Flota de 27 dragas satelitales con techos de camuflaje. Capacidad productiva consolidada de 81 kg de oro/mes (aprox. USD 7.4 millones).',
    type: 'Complejo Extractivo Fluvial',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -1.258,
    lng: -69.585,
    illegalEconomy: ['Minería Ilegal (Oro)'],
    source: 'MAAP #228',
    intelConfidence: 'Crítica'
  },
  {
    id: 'inf-cotuhe',
    name: 'Asentamiento Minero Río Cotuhé',
    description: 'Enclave de 5 dragas tecnificadas operando cerca del límite del PN Amacayacu. Riesgo biológico crítico para aislados Yurí-Passé.',
    type: 'Complejo Extractivo Fluvial',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -2.891,
    lng: -69.940,
    illegalEconomy: ['Minería Ilegal (Oro)'],
    source: 'MAAP',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-yapacana-frente',
    name: 'Frente a Cielo Abierto Tepuy Yapacana',
    description: 'Sector B de deforestación mecanizada. Expansión acelerada de 22,4 ha en 18 meses con retroexcavadoras y bombas de alta presión.',
    type: 'Complejo Extractivo',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 3.668,
    lng: -66.815,
    illegalEconomy: ['Minería Ilegal (Oro)', 'Contrabando de Combustible'],
    source: 'MAAP #234',
    intelConfidence: 'Crítica'
  },
  {
    id: 'inf-yapacana-cumbre',
    name: 'Campamento Cumbre Tepuy Yapacana',
    description: 'Asentamiento logísticamente complejo en la cima de la montaña. Destrucción de 0,09 ha de flora endémica irreemplazable.',
    type: 'Campamento Base',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 3.655,
    lng: -66.820,
    illegalEconomy: ['Minería Ilegal (Oro)'],
    source: 'MAAP #234',
    intelConfidence: 'Alta'
  },

  // Parques Nacionales Ecuatorianos
  {
    id: 'inf-podocarpus',
    name: 'Enclave a Cielo Abierto PN Podocarpus',
    description: 'Destrucción de más de 43 hectáreas mecanizadas controladas por Los Lobos/R7. Alteración de cursos hídricos y campamentos armados.',
    type: 'Complejo Extractivo',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -4.135,
    lng: -78.968,
    illegalEconomy: ['Minería Ilegal (Oro)', 'Lavado de Activos'],
    source: 'Global Forest Watch',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'inf-sangay',
    name: 'Frente de Deforestación PN Sangay',
    description: 'Sector Sucúa. Tumba mecanizada de 806 hectáreas para expansión ganadera de fachada y vías clandestinas rústicas.',
    type: 'Desmonte Ilegal',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -2.466,
    lng: -78.166,
    illegalEconomy: ['Lavado de Activos', 'Acaparamiento de Tierras'],
    source: 'Global Forest Watch',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-nangaritza',
    name: 'Complejo Extractivo Río Nangaritza',
    description: 'Devastación de centenares de hectáreas en territorios Shuar (Chai, Shaime). Redireccionamiento del cauce fluvial con dragas pesadas.',
    type: 'Complejo Extractivo Fluvial',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -4.271,
    lng: -78.648,
    illegalEconomy: ['Minería Ilegal (Oro)'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Confirmada'
  },

  // Mega-Campamentos de Gobernanza Criminal
  {
    id: 'inf-mega-zulia',
    name: 'Mega-Base Retaguardia Zulia-Catatumbo (ELN)',
    description: 'Complejo militar transnacional fortificado con capacidad superior a 200 combatientes. Polígonos de tiro, arsenales antiaéreos y pistas de abastecimiento.',
    type: 'Mega-Campamento Militarizado',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 9.145,
    lng: -72.812,
    illegalEconomy: ['Extorsión', 'Tráfico de Armas', 'Narcotráfico'],
    source: 'Inteligencia Transnacional',
    intelConfidence: 'Crítica'
  },
  {
    id: 'inf-mega-uraba',
    name: 'Centro de Acantonamiento Clan del Golfo (Urabá)',
    description: 'Instalaciones escalonadas tipo barraca con logística para el entrenamiento masivo de reclutas y soporte logístico fluvial. Gobernanza social paralela.',
    type: 'Mega-Campamento Militarizado',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 7.910,
    lng: -77.018,
    illegalEconomy: ['Narcotráfico', 'Tráfico de Migrantes'],
    source: 'Reporte de Inteligencia',
    intelConfidence: 'Alta'
  },
  {
    id: 'inf-mega-argelia',
    name: 'Campamento de Reclutamiento EMC Argelia',
    description: 'Base operativa focalizada en el control del cañón del Micay. Centros de adoctrinamiento de menores (NNA) y custodia de cristalizaderos asociados.',
    type: 'Mega-Campamento Militarizado',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: 2.268,
    lng: -77.205,
    illegalEconomy: ['Narcotráfico (Cocaína)', 'Secuestro'],
    source: 'Indepaz',
    intelConfidence: 'Confirmada'
  },
  {
    id: 'inf-mega-carolina',
    name: 'Central Operativa Frente Carolina Ramírez',
    description: 'Mega-campamento selvático. Red de comunicaciones encriptada y centro de peaje fluvial para control de insumos mineros y narcóticos.',
    type: 'Mega-Campamento Militarizado',
    category: IntelligenceLayer.INFRASTRUCTURE,
    lat: -0.191,
    lng: -74.780,
    illegalEconomy: ['Narcotráfico', 'Extorsión Minera'],
    source: 'Reporte de Inteligencia',
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
  },
  {
    id: 'rt-norte-catatumbo',
    name: 'Ruta de Contrabando Catatumbo-Zulia',
    type: 'illegal',
    description: 'Extensa red de trochas para movimiento de precursores químicos y narcóticos.',
    path: [
      { lat: 8.20, lng: -73.00 },
      { lat: 8.40, lng: -72.80 },
      { lat: 8.60, lng: -72.60 },
      { lat: 8.90, lng: -72.50 },
      { lat: 9.10, lng: -72.30 }
    ]
  },
  {
    id: 'rt-naya-pacifico',
    name: 'Cuenca del Río Naya a Puerto Merizalde',
    type: 'fluvial',
    description: 'Ruta de semi-sumergibles y lanchas go-fast.',
    path: [
      { lat: 3.15, lng: -76.80 },
      { lat: 3.20, lng: -77.10 },
      { lat: 3.25, lng: -77.40 },
      { lat: 3.22, lng: -77.75 }
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
  },
  {
    id: 'urb-buenaventura-2026',
    name: 'Nodo Portuario Buenaventura',
    description: 'Disputa barrial activa entre Shottas y Espartanos, permeada por carteles transnacionales.',
    type: 'Enclave Logístico Urbano',
    category: IntelligenceLayer.URBAN,
    lat: 3.88,
    lng: -77.02,
    source: 'Alerta Temprana Urbana 2026'
  },
  {
    id: 'urb-cucuta-2026',
    name: 'Eje Fronterizo Cúcuta',
    description: 'Centro de coordinación de lavado de activos y contrabando de recursos de frontera.',
    type: 'Centro Coordinador',
    category: IntelligenceLayer.URBAN,
    lat: 7.89,
    lng: -72.50,
    source: 'Inteligencia Policial'
  }
];

export const MOCK_FRONTS = INTEL_FRONTS;
export const MOCK_ACTIONS = INTEL_ACTIONS;
export const MOCK_INFRASTRUCTURE = INTEL_INFRASTRUCTURE;
export const MOCK_ROUTES = INTEL_ROUTES;
export const MOCK_URBAN = INTEL_URBAN;
