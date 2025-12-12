import React from 'react';
import { Meters, Language } from '../types';
import { ChevronRight, Calendar, Flag } from 'lucide-react';
import MeterBar from './MeterBar';
import { TRANSLATIONS } from '../locales';

interface PhaseTransitionProps {
  phaseTitle: string;
  nextPhaseTitle: string;
  narrative: string;
  meters: Meters;
  turn: number;
  onContinue: () => void;
  language: Language;
}

const PhaseTransition: React.FC<PhaseTransitionProps> = ({ 
  phaseTitle, 
  nextPhaseTitle, 
  narrative, 
  meters, 
  turn,
  onContinue,
  language
}) => {
  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  return (
    <div className={`flex flex-col h-full w-full bg-white animate-fade-in ${isNepali ? 'font-nepali' : ''}`}>
       {/* Scrollable Content Area */}
       <div className="flex-grow overflow-y-auto px-6 py-8 flex flex-col items-center text-center max-w-lg mx-auto w-full">
          <div className="mb-6 p-4 bg-blue-50 rounded-full text-nepal-blue shrink-0 animate-bounce-slow">
            <Flag size={48} />
          </div>
          
          <h2 className="text-xl text-gray-400 font-bold uppercase tracking-widest mb-2">{t.levelCompleted}</h2>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{phaseTitle}</h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed">
            {narrative}
          </p>

          <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.currentStatus}</h3>
            <MeterBar meters={meters} language={language} />
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-nepal-red bg-red-50 px-4 py-2 rounded-full mb-4">
            <Calendar size={16} />
            <span>{t.entering} {nextPhaseTitle}</span>
          </div>
       </div>

      {/* Fixed Footer Button */}
      <div className="p-6 border-t border-gray-100 bg-white shrink-0 max-w-lg mx-auto w-full z-10">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-nepal-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2 active:scale-95 transform"
        >
          <span>{t.startNextPhase}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PhaseTransition;