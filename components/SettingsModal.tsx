import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales';
import { X, Languages, Volume2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, language, setLanguage }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-nepali">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">{t.settings}</span>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Language Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-nepal-blue">
                <Languages size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">{t.language}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                        language === 'en' 
                        ? 'border-nepal-blue bg-blue-50 text-nepal-blue' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('ne')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                        language === 'ne' 
                        ? 'border-nepal-red bg-red-50 text-nepal-red' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                >
                    नेपाली
                </button>
            </div>
          </div>

          {/* Sound (Placeholder) */}
           <div>
            <div className="flex items-center gap-2 mb-3 text-gray-400">
                <Volume2 size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Sound</h3>
            </div>
             <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="w-2/3 h-full bg-gray-300 rounded-full"></div>
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

export default SettingsModal;