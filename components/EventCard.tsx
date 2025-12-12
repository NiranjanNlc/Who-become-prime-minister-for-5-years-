import React from 'react';
import { GameEvent, Choice, Language } from '../types';

interface EventCardProps {
  event: GameEvent;
  onChoice: (choice: Choice) => void;
  disabled: boolean;
  language: Language;
}

const EventCard: React.FC<EventCardProps> = ({ event, onChoice, disabled, language }) => {
  const isNepali = language === 'ne';

  return (
    <div className={`flex flex-col h-full max-w-lg mx-auto p-4 animate-fade-in-right ${isNepali ? 'font-nepali' : ''}`}>
      {/* Event Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex-grow flex flex-col items-center text-center relative overflow-hidden mb-4 transition-transform duration-300 hover:scale-[1.01]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-nepal-blue to-nepal-red"></div>
        
        <div className="mt-4 mb-6 text-6xl animate-bounce-slow">
          {event.icon}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
          {isNepali ? (event.titleNe || event.title) : event.title}
        </h2>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
          {isNepali ? (event.descriptionNe || event.description) : event.description}
        </p>

        <div className="mt-auto w-full">
           <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full uppercase tracking-wider font-semibold">
             {event.category}
           </span>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="flex flex-col gap-3 mt-auto pb-4">
        {event.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice)}
            disabled={disabled}
            className={`
              w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-md
              transform transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:-translate-y-1 hover:shadow-lg active:scale-95'}
              first:bg-nepal-blue last:bg-nepal-red
            `}
          >
            {isNepali ? (choice.labelNe || choice.label) : choice.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventCard;