// Цветовая схема
export interface ColorScheme {
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  text: string;
  textSecondary: string;
  border: string;
  borderSecondary: string;
  info: string;
  infoText: string;
  success: string;
  successText: string;
  danger: string;
  dangerText: string;
  warning: string;
  warningText: string;
}

// Участник турнира
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  wins: number;
  losses: number;
  points: number;
  bracket: 'upper' | 'lower' | 'eliminated';
}

// Матч
export interface Match {
  id: string;
  p1: number | null;
  p2: number | null;
  bracket: 'upper' | 'lower' | 'final';
  round: number;
  bye?: boolean;
}

// Настройки турнира
export interface TournamentSettings {
  playerCount: number;
  gamesPerStage: number;
  tiebreak: 'rating' | 'draw' | 'extra';
  gridType: 'fixed' | 'reseed' | 'draw_each';
}

// Состояние турнира
export interface TournamentState {
  matches: Match[];
  allMatches: Match[];
  round: number;
  bracketPlayers: Player[];
}

// Новый участник (форма)
export interface NewPlayer {
  firstName: string;
  lastName: string;
  rating: string;
}

// Тип сетки с описанием
export interface GridTypeInfo {
  label: string;
  desc: string;
  color: string;
}

// Вкладка навигации
export interface Tab {
  id: 'settings' | 'players' | 'bracket' | 'standings';
  label: string;
}