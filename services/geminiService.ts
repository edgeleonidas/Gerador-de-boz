import { GoogleGenAI, Modality } from "@google/genai";
import { decodeBase64, decodeAudioData, audioBufferToWavBlob } from '../utils/audioUtils';

// Initialize the API client
// Note: We access process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini API.");
    }

    // Process the audio
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    const rawBytes = decodeBase64(base64Audio);
    
    // Decode PCM data
    const audioBuffer = await decodeAudioData(
      rawBytes,
      outputAudioContext,
      24000,
      1
    );

    // Convert to WAV Blob for easier playback in <audio> tag
    const wavBlob = audioBufferToWavBlob(audioBuffer);
    const audioUrl = URL.createObjectURL(wavBlob);

    // Clean up context context
    outputAudioContext.close();

    return audioUrl;

  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
};
