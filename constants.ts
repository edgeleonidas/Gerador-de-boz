import { VoiceOption, VoiceGender } from './types';

// Gemini Voices: 
// Charon (Deep/Confident) -> Ideal for Pulpit, Stage, Authority
// Zephyr (Soft/Empathetic) -> Ideal for Love, Poetry, Calm
// Fenrir (Intense/Fast) -> Ideal for Tension, Action, News
// Kore (Calm/Natural) -> Ideal for Lectures, Education
// Puck (Energetic) -> Ideal for Youth, Fun

export const AVAILABLE_VOICES: VoiceOption[] = [
  {
    id: 'anime_shonen',
    modelId: 'Fenrir',
    name: 'Narrador de Anime',
    gender: VoiceGender.MALE,
    description: 'Épica, urgente e intensa. Estilo narrador de batalhas de Naruto e animes de ação.'
  },
  {
    id: 'rock_legend',
    modelId: 'Fenrir',
    name: 'Vocalista de Rock',
    gender: VoiceGender.MALE,
    description: 'Rasgada, potente e rebelde. Cheia de atitude para textos intensos e letras de música.'
  },
  {
    id: 'funny_sloth',
    modelId: 'Puck',
    name: 'A Preguiça (Sid)',
    gender: VoiceGender.MALE,
    description: 'Voz cômica, expressiva e levemente anasalada. Perfeita para humor e falas atrapalhadas.'
  },
  {
    id: 'little_onion',
    modelId: 'Puck', 
    name: 'Garoto Travesso (Cebolinha)',
    gender: VoiceGender.CHILD, 
    description: 'Infantil e provocadora. Dica: Digite "el" no lugal de "er" pala o efeito pelfeito!'
  },
  {
    id: 'barry_soul',
    modelId: 'Charon',
    name: 'Grave Sedutor (Barry)',
    gender: VoiceGender.MALE,
    description: 'Baixo profundo, aveludado e romântico. O clássico vozeirão do Soul estilo Barry White.'
  },
  {
    id: 'flavio_lyric',
    modelId: 'Puck', 
    name: 'Tenor Lírico (Flávio)',
    gender: VoiceGender.MALE,
    description: 'Voz aguda, leve e etérea. Ideal para textos poéticos e melódicos estilo MPB.'
  },
  {
    id: 'pulpit_master',
    modelId: 'Charon',
    name: 'O Pregador',
    gender: VoiceGender.MALE,
    description: 'Voz profunda, de púlpito. Solene e com autoridade para mensagens de impacto e fé.'
  },
  {
    id: 'romance_soft',
    modelId: 'Zephyr',
    name: 'Mensagem de Amor',
    gender: VoiceGender.FEMALE,
    description: 'Suave, empática e levemente sussurrada. Perfeita para declarações emocionais e poesia.'
  },
  {
    id: 'tension_thriller',
    modelId: 'Fenrir',
    name: 'Narrador de Tensão',
    gender: VoiceGender.MALE,
    description: 'Intensa, grave e urgente. Ideal para contos de suspense, terror ou notícias urgentes.'
  },
  {
    id: 'stage_host',
    modelId: 'Charon',
    name: 'Voz de Palco',
    gender: VoiceGender.MALE,
    description: 'Projetada, potente e clássica. Estilo "Mestre de Cerimônias" para eventos e aberturas.'
  },
  {
    id: 'lecture_pro',
    modelId: 'Kore',
    name: 'A Palestrante',
    gender: VoiceGender.FEMALE,
    description: 'Equilibrada, articulada e natural. A melhor escolha para ensino, tutoriais e palestras.'
  },
  {
    id: 'youth_energy',
    modelId: 'Puck',
    name: 'Jovem Criativo',
    gender: VoiceGender.CHILD,
    description: 'Energética, curiosa e rápida. Ótima para narrativas modernas, vlogs e conteúdo dinâmico.'
  }
];

export const INITIAL_TEXT = "Atenção ninjas da aldeia! A missão começa agora. Preparem seus jutsus e protejam seus amigos!";