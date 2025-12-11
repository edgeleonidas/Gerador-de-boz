import React from 'react';
import { VoiceOption, VoiceGender } from '../types';
import { AVAILABLE_VOICES } from '../constants';

interface VoiceSelectorProps {
  selectedVoice: string;
  onSelect: (voiceId: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onSelect }) => {
  const getGenderIcon = (gender: VoiceGender) => {
    switch (gender) {
      case VoiceGender.MALE: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 1-10 10 10 10 0 0 1 10-10z"></path><path d="M12 12v6"></path><path d="M12 18h6"></path><path d="M12 6v6"></path></svg>
      );
      case VoiceGender.FEMALE: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="6"></circle><path d="M12 16v6"></path><path d="M8 20h8"></path></svg>
      );
      case VoiceGender.CHILD: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"></path><path d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"></path></svg>
      );
    }
  };

  const getGenderColor = (gender: VoiceGender) => {
    switch (gender) {
      case VoiceGender.MALE: return 'bg-slate-100 text-slate-700 border-slate-200';
      case VoiceGender.FEMALE: return 'bg-rose-50 text-rose-700 border-rose-100';
      case VoiceGender.CHILD: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {AVAILABLE_VOICES.map((voice) => (
        <button
          key={voice.id}
          onClick={() => onSelect(voice.id)}
          className={`
            relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 text-left h-full
            ${selectedVoice === voice.id 
              ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-200' 
              : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-sm'}
          `}
        >
          <div className="flex justify-between items-start w-full mb-3">
            <span className="font-bold text-slate-800 text-lg">{voice.name}</span>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border ${getGenderColor(voice.gender)}`}>
              {getGenderIcon(voice.gender)}
              <span>{voice.gender}</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{voice.description}</p>
          
          {selectedVoice === voice.id && (
            <div className="absolute top-[-10px] right-[-10px] bg-orange-500 text-white p-1 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};