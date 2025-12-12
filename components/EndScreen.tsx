import React from 'react';
import { Ending, GameState, Language } from '../types';
import { RotateCcw, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TRANSLATIONS } from '../locales';

interface EndScreenProps {
  ending: Ending;
  gameState: GameState;
  onRestart: () => void;
  language: Language;
}

const EndScreen: React.FC<EndScreenProps> = ({ ending, gameState, onRestart, language }) => {
  const isVictory = ending.type === 'victory';
  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  const data = [
    { name: t.trust, value: gameState.meters.trust, color: '#DC143C' },
    { name: t.economy, value: gameState.meters.economy, color: '#CA8A04' },
    { name: t.liberty, value: gameState.meters.liberty, color: '#16A34A' },
    { name: t.environment, value: gameState.meters.environment, color: '#2563EB' },
  ];

  return (
    <div className={`flex flex-col h-full max-w-lg mx-auto p-6 bg-white overflow-y-auto animate-fade-in ${isNepali ? 'font-nepali' : ''}`}>
      <div className="flex-grow flex flex-col items-center text-center">
        
        <div className="mt-8 mb-6 text-7xl animate-pulse">
          {isVictory ? '🇳🇵' : '🏛️'}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{isNepali ? (ending.titleNe || ending.title) : ending.title}</h1>
        <p className="text-xl text-gray-500 font-medium mb-8 uppercase tracking-wide">{isNepali ? (ending.subtitleNe || ending.subtitle) : ending.subtitle}</p>

        <div className={`p-6 rounded-xl border-l-4 mb-8 text-left shadow-sm ${isVictory ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <p className="text-gray-800 leading-relaxed text-lg">
            {isNepali ? (ending.narrativeNe || ending.narrative) : ending.narrative}
          </p>
        </div>

        <div className="w-full mb-8">
            <div className="flex items-center gap-2 mb-4 text-gray-400 font-bold uppercase text-xs tracking-widest">
                <BarChart2 size={16} />
                <span>{t.finalStats}</span>
            </div>
            <div className="h-48 w-full bg-gray-50 rounded-lg p-2 border border-gray-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" tick={{fontSize: 12, fontFamily: isNepali ? '"Noto Sans Devanagari", sans-serif' : 'sans-serif'}} width={50} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full text-center text-sm text-gray-600 mb-8">
            <div className="bg-gray-100 p-3 rounded-lg">
                <span className="block font-bold text-xl text-gray-900">{gameState.turn} / {gameState.maxTurns}</span>
                <span className="uppercase text-xs">{t.turnsSurvived}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
                <span className="block font-bold text-xl text-gray-900">{Object.keys(gameState.flags).length}</span>
                <span className="uppercase text-xs">{t.keyDecisions}</span>
            </div>
        </div>

      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 bg-nepal-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        <RotateCcw size={20} />
        {t.startNewGame}
      </button>
    </div>
  );
};

export default EndScreen;