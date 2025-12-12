import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales';
import { Crown, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, language, setLanguage }) => {
  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  return (
    <div className={`h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden ${isNepali ? 'font-nepali' : 'font-sans'}`}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-nepal-blue to-nepal-red"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-nepal-red to-nepal-blue"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#003893 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }}></div>

      {/* Hero Section */}
      <div className="mb-12 animate-fade-in relative z-10">
         <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10rem] opacity-5 select-none font-serif">🇳🇵</div>
         
         <div className="w-24 h-24 bg-nepal-blue rounded-3xl rotate-45 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-blue-200 relative z-10 ring-4 ring-white">
            <div className="-rotate-45 text-white">
                <Crown size={48} fill="currentColor" />
            </div>
         </div>
         
         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            {t.welcomeTitle}
         </h1>
         <p className="text-xl text-gray-500 max-w-xs mx-auto leading-relaxed font-medium">
            {t.welcomeSubtitle}
         </p>
      </div>

      {/* Language Selection */}
      <div className="flex gap-4 mb-12 animate-fade-in relative z-10" style={{animationDelay: '0.1s'}}>
        <button
          onClick={() => setLanguage('en')}
          className={`px-6 py-3 rounded-xl border-2 font-bold transition-all ${
            language === 'en'
              ? 'border-nepal-blue bg-blue-50 text-nepal-blue shadow-md scale-105'
              : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('ne')}
          className={`px-6 py-3 rounded-xl border-2 font-bold transition-all font-nepali ${
            language === 'ne'
              ? 'border-nepal-red bg-red-50 text-nepal-red shadow-md scale-105'
              : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'
          }`}
        >
          नेपाली
        </button>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="group relative w-full max-w-xs py-5 bg-gray-900 text-white font-bold text-xl rounded-2xl shadow-xl hover:bg-gray-800 transition-all active:scale-95 animate-fade-in z-10"
        style={{animationDelay: '0.2s'}}
      >
        <span className="flex items-center justify-center gap-3">
            {t.enterBaluwatar}
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      <p className="mt-8 text-sm text-gray-400 animate-pulse font-medium z-10">
        {t.howToPlay}
      </p>
    </div>
  );
};

export default WelcomeScreen;