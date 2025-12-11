import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { VoiceSelector } from './components/VoiceSelector';
import { generateSpeech } from './services/geminiService';
import { GeneratedAudio } from './types';
import { AVAILABLE_VOICES, INITIAL_TEXT } from './constants';

const App: React.FC = () => {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  // Default to 'anime_shonen' to showcase the new request
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('anime_shonen');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedAudio[]>([]);
  
  // Reference to scroll to result
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Por favor, digite algum texto para gerar o áudio.");
      return;
    }

    setLoading(true);
    setError(null);

    // Find the full voice object to get the modelId (for API) and name (for history)
    const voiceOption = AVAILABLE_VOICES.find(v => v.id === selectedVoiceId);
    
    if (!voiceOption) {
      setError("Voz selecionada inválida.");
      return;
    }

    try {
      // Pass voiceOption.modelId (e.g., 'Charon') to the API
      const audioUrl = await generateSpeech(text, voiceOption.modelId);
      
      const newItem: GeneratedAudio = {
        id: Date.now().toString(),
        text: text,
        voiceName: voiceOption.name,
        audioUrl: audioUrl,
        timestamp: Date.now(),
      };

      setHistory(prev => [newItem, ...prev]);
      
      // Auto-scroll to result after a short delay to ensure render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      console.error(err);
      setError("Ocorreu um erro ao gerar o áudio. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* Main Interface */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            
            {/* Voice Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-sm">1</span>
                Escolha o Estilo da Voz
              </h2>
              <VoiceSelector selectedVoice={selectedVoiceId} onSelect={setSelectedVoiceId} />
            </div>

            {/* Text Input */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-sm">2</span>
                Digite sua Mensagem
              </h2>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Digite aqui o sermão, poema, palestra ou história..."
                  className="w-full h-40 p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:ring-0 resize-none text-slate-800 text-lg leading-relaxed transition-colors placeholder-slate-400"
                  maxLength={1000}
                />
                <div className="absolute bottom-4 right-4 text-xs font-semibold text-slate-400">
                  {text.length}/1000
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
                className={`
                  w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg shadow-orange-200
                  flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0
                  ${loading 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'}
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gerando Áudio...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Gerar Voz
                  </>
                )}
              </button>
              {error && (
                <span className="text-red-500 font-medium text-sm animate-pulse">
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div ref={resultRef}>
          {history.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 px-2">Histórico de Gerações</h3>
              
              {history.map((item, index) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 animate-fade-in-up">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        {item.voiceName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-2 md:line-clamp-none italic">"{item.text}"</p>
                  </div>
                  
                  <div className="flex-shrink-0 w-full md:w-auto min-w-[300px] flex flex-col justify-center bg-slate-50 rounded-lg p-3">
                    <audio 
                      controls 
                      src={item.audioUrl} 
                      className="w-full h-10"
                      autoPlay={index === 0} // Autoplay only the most recent one
                    />
                    <a 
                      href={item.audioUrl} 
                      download={`bael-vox-${item.id}.wav`}
                      className="mt-2 text-center text-xs font-medium text-orange-600 hover:text-orange-800 hover:underline"
                    >
                      Baixar .WAV
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Bael Vox. Powered by Google Gemini 2.5 Flash.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;