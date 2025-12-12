
export type MeterType = 'trust' | 'economy' | 'liberty' | 'environment';

export type FactionType = 'youth' | 'business' | 'bureaucrats' | 'activists';

export type Language = 'en' | 'ne';

export interface Meters {
  trust: number;
  economy: number;
  liberty: number;
  environment: number;
}

export interface Factions {
  youth: number;
  business: number;
  bureaucrats: number;
  activists: number;
}

export interface GameState {
  turn: number;
  maxTurns: number;
  alive: boolean;
  ending: string | null;
  meters: Meters;
  factions: Factions;
  flags: Record<string, boolean>;
  history: string[]; // Log of event IDs
  currentEventId: string | null;
  lastEventId: string | null; // For education context
}

export interface Effect {
  meters?: Partial<Record<MeterType, number>>;
  factions?: Partial<Record<FactionType, number>>;
  setFlags?: string[];
  clearFlags?: string[];
  nextEventId?: string;
  ending?: string;
}

export interface Choice {
  id: string;
  label: string;
  labelNe?: string;
  summary: string;
  effect: Effect;
}

export interface GameEvent {
  id: string;
  title: string;
  titleNe?: string;
  description: string;
  descriptionNe?: string;
  conceptTag: string;
  icon: string; // Emoji or identifier
  minTurn?: number;
  maxTurn?: number;
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  category: 'Corruption' | 'Rights' | 'Economy' | 'Environmental' | 'Party' | 'Health' | 'Diplomacy';
  choices: Choice[];
}

export interface Concept {
  id: string;
  title: string;
  titleNe: string;
  definition: string;
  definitionNe?: string;
  nepalContext: string;
  nepalContextNe?: string;
  globalContext?: string;
  links?: string[];
}

export interface Ending {
  id: string;
  title: string;
  titleNe?: string;
  subtitle: string;
  subtitleNe?: string;
  narrative: string;
  narrativeNe?: string;
  type: 'victory' | 'defeat';
}