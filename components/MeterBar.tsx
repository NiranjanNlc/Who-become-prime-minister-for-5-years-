import React from 'react';
import { Shield, Coins, Scale, Leaf } from 'lucide-react';
import { Meters, Language } from '../types';
import { TRANSLATIONS } from '../locales';

interface MeterBarProps {
  meters: Meters;
  language: Language;
}

const MeterBar: React.FC<MeterBarProps> = ({ meters, language }) => {
  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  const getMeterColor = (value: number) => {
    if (value <= 25) return 'text-red-600';
    if (value <= 50) return 'text-yellow-600';
    if (value <= 75) return 'text-green-600';
    return 'text-blue-600';
  };

  const getBarColor = (value: number) => {
    if (value <= 25) return 'bg-red-500';
    if (value <= 50) return 'bg-yellow-500';
    if (value <= 75) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const renderMeter = (icon: React.ReactNode, value: number, label: string) => (
    <div className="flex flex-col items-center flex-1 mx-1">
      <div className={`mb-1 ${getMeterColor(value)} transition-colors duration-500`}>
        {icon}
      </div>
      <div className="h-16 w-3 bg-gray-200 rounded-full relative overflow-hidden border border-gray-300">
        <div
          className={`absolute bottom-0 w-full rounded-b-full transition-all duration-1000 ease-in-out ${getBarColor(value)}`}
          style={{ height: `${value}%` }}
        />
      </div>
      <span className={`text-[10px] font-bold mt-1 text-gray-500 uppercase tracking-tighter ${isNepali ? 'font-nepali' : ''}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex justify-between items-end px-4 py-2 bg-white shadow-sm border-b border-gray-200 w-full max-w-lg mx-auto">
      {renderMeter(<Shield size={20} />, meters.trust, t.trust)}
      {renderMeter(<Coins size={20} />, meters.economy, t.economy)}
      {renderMeter(<Scale size={20} />, meters.liberty, t.liberty)}
      {renderMeter(<Leaf size={20} />, meters.environment, t.environment)}
    </div>
  );
};

export default MeterBar;