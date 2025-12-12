import React from 'react';
import { Star, Crown, Landmark } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales';

interface ProgressBarProps {
  currentTurn: number;
  maxTurns: number;
  language: Language;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTurn, maxTurns, language }) => {
  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  // Calculate percentage
  const progress = Math.min(100, Math.max(0, ((currentTurn - 1) / maxTurns) * 100));

  // Determine milestone states
  const phase1Complete = currentTurn > 10;
  const phase2Complete = currentTurn > 20;
  const gameComplete = currentTurn >= 30;

  return (
    <div className={`w-full flex flex-col justify-center select-none pt-4 pb-1 ${isNepali ? 'font-nepali' : ''}`}>
      <div className="relative h-4 w-full mb-1">
        {/* Labels positioned absolutely to match checkpoints */}
        <div className="absolute -top-5 left-0 -translate-x-1/3 text-[9px] font-bold text-gray-400 uppercase tracking-tighter whitespace-nowrap">
            {t.day1}
        </div>
        <div className={`absolute -top-5 left-[33%] -translate-x-1/2 text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap transition-colors ${phase1Complete ? "text-nepal-blue" : "text-gray-400"}`}>
            {t.days100}
        </div>
        <div className={`absolute -top-5 left-[66%] -translate-x-1/2 text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap transition-colors ${phase2Complete ? "text-nepal-blue" : "text-gray-400"}`}>
            {t.midTerm}
        </div>
        <div className={`absolute -top-5 right-0 translate-x-1/4 text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap transition-colors ${gameComplete ? "text-nepal-red" : "text-gray-400"}`}>
            {t.end}
        </div>

        {/* Background Track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-3 bg-gray-200 rounded-full"></div>

        {/* Fill Track */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-0 h-3 bg-nepal-blue rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>

        {/* Start Point */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 left-0 transform -translate-x-1/2 z-10 
            w-4 h-4 rounded-full border-2 flex items-center justify-center bg-nepal-blue border-nepal-blue
          `}
        >
        </div>

        {/* Checkpoint 1 (Turn 10) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 left-[33%] transform -translate-x-1/2 z-10 
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500
            ${phase1Complete ? 'bg-yellow-400 border-yellow-500 text-white shadow-sm scale-110' : 'bg-gray-100 border-gray-300 text-gray-400'}
          `}
        >
          <Star size={12} fill={phase1Complete ? "currentColor" : "none"} />
        </div>

        {/* Checkpoint 2 (Turn 20) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 left-[66%] transform -translate-x-1/2 z-10 
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500
            ${phase2Complete ? 'bg-yellow-400 border-yellow-500 text-white shadow-sm scale-110' : 'bg-gray-100 border-gray-300 text-gray-400'}
          `}
        >
          <Landmark size={12} fill={phase2Complete ? "currentColor" : "none"} />
        </div>

        {/* Final Goal (Turn 30) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-1/2 z-10 
            w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500
            ${gameComplete ? 'bg-nepal-red border-nepal-red text-white animate-bounce-slow' : 'bg-white border-gray-300 text-gray-300'}
          `}
        >
          <Crown size={16} fill={gameComplete ? "currentColor" : "none"} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;