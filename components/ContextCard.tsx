import React from 'react';
import { Concept } from '../types';
import { BookOpen, ChevronRight, ExternalLink } from 'lucide-react';

interface ContextCardProps {
  concept: Concept;
  onContinue: () => void;
}

const ContextCard: React.FC<ContextCardProps> = ({ concept, onContinue }) => {
  return (
    <div className="flex flex-col h-full max-w-lg mx-auto p-4 animate-fade-in-right">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex-grow flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-full text-nepal-blue shadow-sm">
                <BookOpen size={20} />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{concept.title}</h2>
                <p className="text-xs text-nepal-blue font-bold uppercase tracking-wider">Did you know?</p>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
            <h3 className="text-xl font-medium text-gray-400 mb-6 font-serif italic border-b border-gray-100 pb-2">{concept.titleNe}</h3>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Definition</h4>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {concept.definition}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-xs font-bold text-nepal-red uppercase tracking-widest mb-2">Context in Nepal</h4>
                    <p className="text-gray-800 leading-relaxed">
                        {concept.nepalContext}
                    </p>
                </div>
                
                 {concept.links && concept.links.length > 0 && (
                    <div className="pt-2">
                        <div className="flex flex-col gap-2">
                        {concept.links.map((link, idx) => (
                            <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-nepal-blue hover:underline text-sm font-semibold">
                            <ExternalLink size={14} />
                            <span>Read More</span>
                            </a>
                        ))}
                        </div>
                    </div>
                 )}
            </div>
        </div>
        
        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
                onClick={onContinue}
                className="w-full py-4 bg-nepal-blue text-white font-bold rounded-xl shadow-md hover:bg-blue-800 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
                <span>Continue</span>
                <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ContextCard;