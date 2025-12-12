import React from 'react';
import { Concept, Language } from '../types';
import { X, ExternalLink, BookOpen } from 'lucide-react';
import { TRANSLATIONS } from '../locales';

interface EducationModalProps {
  concept: Concept;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const EducationModal: React.FC<EducationModalProps> = ({ concept, isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const isNepali = language === 'ne';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in ${isNepali ? 'font-nepali' : ''}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-nepal-blue">
            <BookOpen size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">{t.educationContext}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{isNepali ? concept.titleNe : concept.title}</h2>
          <h3 className="text-lg font-medium text-gray-500 mb-6 font-serif italic">{!isNepali ? concept.titleNe : concept.title}</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-nepal-blue uppercase mb-2">{t.definition}</h4>
              <p className="text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                {isNepali ? (concept.definitionNe || concept.definition) : concept.definition}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-nepal-red uppercase mb-2">{t.contextInNepal}</h4>
              <p className="text-gray-700 leading-relaxed">
                {isNepali ? (concept.nepalContextNe || concept.nepalContext) : concept.nepalContext}
              </p>
            </div>
            
            {concept.links && concept.links.length > 0 && (
               <div className="pt-2 border-t border-gray-100">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t.furtherReading}</h4>
                 <div className="flex flex-col gap-1">
                   {concept.links.map((link, idx) => (
                     <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                       <span>{t.readMore}</span>
                       <ExternalLink size={14} />
                     </a>
                   ))}
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;