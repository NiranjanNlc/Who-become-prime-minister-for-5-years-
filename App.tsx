import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Choice, GameEvent, Language } from './types';
import { INITIAL_METERS, INITIAL_FACTIONS, EVENTS, CONCEPTS, ENDINGS } from './data';
import { TRANSLATIONS } from './locales';
import MeterBar from './components/MeterBar';
import EventCard from './components/EventCard';
import EducationModal from './components/EducationModal';
import EndScreen from './components/EndScreen';
import PhaseTransition from './components/PhaseTransition';
import ProgressBar from './components/ProgressBar';
import SettingsModal from './components/SettingsModal';
import StatusModal from './components/StatusModal';
import WelcomeScreen from './components/WelcomeScreen';
import { Info, Settings } from 'lucide-react';

// Total turns: 30
// Level 1: 1-10 (First 100 Days)
// Level 2: 11-20 (Mid-Term)
// Level 3: 21-30 (Final Tenure)
const MAX_TURNS = 30;
const PHASE_2_START = 11;
const PHASE_3_START = 21;

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ne');
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const t = TRANSLATIONS[language];

  const [gameState, setGameState] = useState<GameState>({
    turn: 1,
    maxTurns: MAX_TURNS,
    alive: true,
    ending: null,
    meters: { ...INITIAL_METERS },
    factions: { ...INITIAL_FACTIONS },
    flags: {},
    history: [],
    currentEventId: null,
    lastEventId: null,
  });

  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [animating, setAnimating] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  
  // Phase Transition State
  const [transitioning, setTransitioning] = useState<{
    show: boolean;
    phaseTitle: string;
    nextPhaseTitle: string;
    narrative: string;
  }>({
    show: false,
    phaseTitle: '',
    nextPhaseTitle: '',
    narrative: ''
  });

  // Initialize game
  useEffect(() => {
    // Only initialize the game logic when the component mounts, 
    // but we don't show it until gameStarted is true.
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewGame = () => {
    setTransitioning({ show: false, phaseTitle: '', nextPhaseTitle: '', narrative: '' });
    setShowEducation(false);
    setShowStatus(false);
    const firstEvent = selectNextEvent([], {}, 1);
    setGameState({
      turn: 1,
      maxTurns: MAX_TURNS,
      alive: true,
      ending: null,
      meters: { ...INITIAL_METERS },
      factions: { ...INITIAL_FACTIONS },
      flags: {},
      history: [],
      currentEventId: firstEvent.id,
      lastEventId: null,
    });
    setCurrentEvent(firstEvent);
  };

  const selectNextEvent = (history: string[], flags: Record<string, boolean>, turn: number, forcedId?: string): GameEvent => {
    // 1. Check forced next event
    if (forcedId) {
      const forced = EVENTS.find(e => e.id === forcedId);
      if (forced) return forced;
    }

    // 2. Get all valid events for this turn based on Phase (min/max turn) and Flags
    const validEvents = EVENTS.filter(e => {
      // Phase Check
      if (e.minTurn && turn < e.minTurn) return false;
      if (e.maxTurn && turn > e.maxTurn) return false;

      // Check flags
      if (e.requiredFlags && !e.requiredFlags.every(f => flags[f])) return false;
      if (e.forbiddenFlags && e.forbiddenFlags.some(f => flags[f])) return false;

      return true;
    });

    // Safety fallback: if no valid events for this turn (unlikely), pick any flag-compatible event
    if (validEvents.length === 0) {
       const emergencyPool = EVENTS.filter(e => {
          if (e.requiredFlags && !e.requiredFlags.every(f => flags[f])) return false;
          if (e.forbiddenFlags && e.forbiddenFlags.some(f => flags[f])) return false;
          return true;
       });
       // Pick a random one, preferably one not recently played if possible
       const playable = emergencyPool.filter(e => !history.slice(-2).includes(e.id));
       const pool = playable.length > 0 ? playable : emergencyPool;
       return pool[Math.floor(Math.random() * pool.length)];
    }

    // 3. Priority: Unseen events
    const unseenEvents = validEvents.filter(e => !history.includes(e.id));
    if (unseenEvents.length > 0) {
      const r = Math.floor(Math.random() * unseenEvents.length);
      return unseenEvents[r];
    }

    // 4. Fallback: Events seen least recently
    // Sort validEvents by their last index in history (ascending -> oldest first)
    const sortedByRecency = [...validEvents].sort((a, b) => {
      const lastA = history.lastIndexOf(a.id);
      const lastB = history.lastIndexOf(b.id);
      return lastA - lastB;
    });

    // Pick from top 2 least recent to add variety but avoid immediate repetition
    const poolSize = Math.min(2, sortedByRecency.length);
    const candidates = sortedByRecency.slice(0, poolSize);
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const getCurrentPhaseTitle = (turn: number) => {
    if (turn < PHASE_2_START) return t.phase1;
    if (turn < PHASE_3_START) return t.phase2;
    return t.phase3;
  };

  const handlePhaseCheck = (nextTurn: number, meters: any) => {
    // Check for transition to Phase 2
    if (nextTurn === PHASE_2_START) {
      setTransitioning({
        show: true,
        phaseTitle: t.phase1,
        nextPhaseTitle: t.phase2,
        narrative: language === 'ne' 
          ? "तपाईंले हनिमुन पिरियड पार गर्नुभएको छ। सुरुवाती उत्साह सेलाएको छ, र गठबन्धन राजनीति र दैनिक शासनका वास्तविक चुनौतीहरू अब सुरु हुन्छन्।" 
          : "You've survived the honeymoon period. The initial excitement has faded, and the real challenges of coalition politics and daily governance begin now."
      });
      return true;
    }
    // Check for transition to Phase 3
    if (nextTurn === PHASE_3_START) {
      setTransitioning({
        show: true,
        phaseTitle: t.phase2,
        nextPhaseTitle: t.phase3,
        narrative: language === 'ne' 
          ? "तपाईं अन्तिम चरणमा प्रवेश गर्दै हुनुहुन्छ। चुनाव नजिकिँदैछ। अबको हरेक निर्णयले तपाईंको विरासत निर्धारण गर्नेछ। के तपाईंलाई राजनेताको रूपमा सम्झिनेछ वा असफल?"
          : "You are entering the final stretch. Elections are looming. Every decision now will define your legacy. Will you be remembered as a statesman or a failure?"
      });
      return true;
    }
    return false;
  };

  const handleContinuePhase = () => {
    setTransitioning(prev => ({ ...prev, show: false }));
  };

  const handleChoice = useCallback((choice: Choice) => {
    if (animating || !gameState.alive || transitioning.show) return;
    setAnimating(true);

    const effect = choice.effect;
    const newMeters = { ...gameState.meters };
    const newFactions = { ...gameState.factions };
    const newFlags = { ...gameState.flags };

    // Apply Meter Changes
    if (effect.meters) {
      (Object.keys(effect.meters) as (keyof typeof newMeters)[]).forEach(key => {
        const delta = effect.meters![key] || 0;
        newMeters[key] = Math.max(0, Math.min(100, newMeters[key] + delta));
      });
    }

    // Apply Faction Changes
    if (effect.factions) {
      (Object.keys(effect.factions) as (keyof typeof newFactions)[]).forEach(key => {
        const delta = effect.factions![key] || 0;
        newFactions[key] = Math.max(-100, Math.min(100, newFactions[key] + delta));
      });
    }

    // Apply Flags
    effect.setFlags?.forEach(f => newFlags[f] = true);
    effect.clearFlags?.forEach(f => delete newFlags[f]);

    // Check Immediate Defeat Conditions
    let endingId: string | null = null;
    if (newMeters.trust <= 0) endingId = 'trust_low';
    else if (newMeters.economy <= 0) endingId = 'economy_low';
    else if (newMeters.liberty <= 0) endingId = 'liberty_low';
    else if (newMeters.environment <= 0) endingId = 'environment_low';
    
    const nextTurn = gameState.turn + 1;

    setTimeout(() => {
      setAnimating(false);
      
      if (endingId) {
         setGameState(prev => ({
           ...prev, 
           meters: newMeters, 
           factions: newFactions, 
           flags: newFlags, 
           ending: endingId, 
           alive: false
         }));
         return;
      }

      // Check Victory Condition (survived all turns)
      if (gameState.turn >= gameState.maxTurns) {
          let victoryId = 'survivor';
          if (newMeters.trust > 60 && newMeters.liberty > 60) victoryId = 'pragmatist';
          
          setGameState(prev => ({
              ...prev,
              meters: newMeters, 
              factions: newFactions, 
              flags: newFlags,
              ending: victoryId,
              alive: false
          }));
          return;
      }

      // Check Phase Transition
      handlePhaseCheck(nextTurn, newMeters);

      // Select Next Event
      const historyWithCurrent = [...gameState.history, gameState.currentEventId!];
      const nextEvent = selectNextEvent(
        historyWithCurrent,
        newFlags,
        nextTurn,
        effect.nextEventId
      );
      
      setGameState(prev => ({
        ...prev,
        meters: newMeters,
        factions: newFactions,
        flags: newFlags,
        turn: nextTurn,
        history: historyWithCurrent,
        currentEventId: nextEvent.id,
        lastEventId: prev.currentEventId
      }));
      setCurrentEvent(nextEvent);

    }, 800); // Animation delay
  }, [gameState, animating, transitioning.show, language, t]);

  if (!gameStarted) {
    return <WelcomeScreen language={language} setLanguage={setLanguage} onStart={() => setGameStarted(true)} />;
  }

  if (!currentEvent) return <div className="h-screen flex items-center justify-center font-sans">{t.loading}</div>;

  return (
    <div className={`h-screen w-full bg-gray-100 flex flex-col font-sans ${language === 'ne' ? 'font-nepali' : ''}`}>
      
      {/* Top Bar */}
      <MeterBar 
        meters={gameState.meters} 
        language={language} 
        onOpenStatus={() => setShowStatus(true)}
      />

      {/* Main Content Area */}
      <div className="flex-grow relative overflow-hidden flex flex-col">
        {gameState.ending ? (
          <EndScreen 
            ending={ENDINGS[gameState.ending]} 
            gameState={gameState} 
            onRestart={startNewGame} 
            language={language}
          />
        ) : transitioning.show ? (
          <PhaseTransition 
            phaseTitle={transitioning.phaseTitle}
            nextPhaseTitle={transitioning.nextPhaseTitle}
            narrative={transitioning.narrative}
            meters={gameState.meters}
            turn={gameState.turn}
            onContinue={handleContinuePhase}
            language={language}
          />
        ) : (
          <EventCard 
            event={currentEvent} 
            onChoice={handleChoice} 
            disabled={animating}
            language={language}
          />
        )}
      </div>

      {/* Bottom Bar */}
      {!gameState.ending && !transitioning.show && (
        <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-4 shrink-0 z-10 gap-4">
          
          {/* Left: Learn More Button */}
          <div className="shrink-0">
             {currentEvent && CONCEPTS[currentEvent.conceptTag] && (
               <button 
                  onClick={() => setShowEducation(true)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-50 text-nepal-blue rounded-full hover:bg-blue-100 transition-colors shadow-sm"
                  aria-label={t.learnMore}
                >
                  <Info size={20} />
               </button>
            )}
          </div>

          {/* Center: Progress Bar */}
          <div className="flex-grow max-w-sm">
             <ProgressBar currentTurn={gameState.turn} maxTurns={gameState.maxTurns} language={language} />
          </div>

          {/* Right: Settings/Menu */}
          <div className="shrink-0">
             <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
             >
                <Settings size={20} />
             </button>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducation && currentEvent && CONCEPTS[currentEvent.conceptTag] && (
        <EducationModal 
          isOpen={showEducation}
          onClose={() => setShowEducation(false)}
          concept={CONCEPTS[currentEvent.conceptTag]}
          language={language}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        language={language}
        setLanguage={setLanguage}
      />

      {/* Status Modal (Factions) */}
      <StatusModal
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        factions={gameState.factions}
        language={language}
      />
    </div>
  );
};

export default App;