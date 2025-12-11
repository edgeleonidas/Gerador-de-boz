export enum VoiceGender {
  MALE = 'Masculina',
  FEMALE = 'Feminina',
  CHILD = 'Jovem/Infantil'
}

export interface VoiceOption {
  id: string; // Unique ID for the UI selection
  modelId: string; // The actual API voice name (e.g., 'Kore', 'Puck')
  name: string; // Display name (e.g., "O Pregador")
  gender: VoiceGender;
  description: string;
}

export interface GeneratedAudio {
  id: string;
  text: string;
  voiceName: string;
  audioUrl: string;
  timestamp: number;
}
