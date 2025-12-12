import React from 'react';
import { Factions, Language } from '../types';
import { TRANSLATIONS } from '../locales';
import { X, Users, Briefcase, Building2, Megaphone, Activity } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  factions: Factions;
  language: Language;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, factions, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  const factionList = [
    { key: 'youth', label: t.youth, icon: <Users size={20} />, value: factions.youth },
    { key: 'business', label: t.business, icon: <Briefcase size={20} />, value: factions.business },
    { key: 'bureaucrats', label: t.bureaucrats, icon: <Building2 size={20} />, value: factions.bureaucrats },
    { key: 'activists', label: t.activists, icon: <Megaphone size={20} />, value: factions.activists },
  ];

  const getSentimentColor = (val: number) => {
    if (val > 20) return 'bg-green-500';
    if (val < -20) return 'bg-red-500';
    return 'bg-gray-400';
  };

  const getSentimentText = (val: number) => {
     if (val > 50) return isNepali ? 'अत्यन्त सकारात्मक' : 'Very High';
     if (val > 10) return isNepali ? 'सकारात्मक' : 'Positive';
     if (val < -50) return isNepali ? 'अत्यन्त नकारात्मक' : 'Hostile';
     if (val < -10) return isNepali ? 'नकारात्मक' : 'Negative';
     return isNepali ? 'तटस्थ' : 'Neutral';
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in ${isNepali ? 'font-nepali' : ''}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800">
             <Activity size={20} className="text-nepal-blue" />
             <span className="font-bold text-lg">{t.statusReport}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          <div className="mb-2">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.factions}</h3>
             
             <div className="space-y-6">
               {factionList.map((f) => (
                 <div key={f.key} className="relative">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${f.value > 0 ? 'bg-green-50 text-green-600' : f.value < 0 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}>
                                {f.icon}
                            </div>
                            <span className="font-bold text-gray-800">{f.label}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${f.value > 0 ? 'bg-green-100 text-green-700' : f.value < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                            {getSentimentText(f.value)}
                        </span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-gray-100 rounded-full relative overflow-hidden flex items-center justify-center">
                        <div className="absolute w-0.5 h-full bg-gray-300 z-10"></div> {/* Center Marker */}
                        
                        {/* Bar */}
                        <div 
                           className={`absolute h-full rounded-full transition-all duration-500 ${getSentimentColor(f.value)}`}
                           style={{
                             left: f.value < 0 ? `${50 + (f.value / 2)}%` : '50%',
                             width: `${Math.abs(f.value) / 2}%` // Divide by 2 because range is -100 to 100 mapped to 0-100 width, effectively mostly using half width from center
                           }}
                        ></div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;