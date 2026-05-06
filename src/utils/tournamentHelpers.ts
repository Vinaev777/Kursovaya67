import { Player, Match, TournamentSettings } from '../types';

// Перемешивание массива (фишер-йетс)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Сортировка по рейтингу (посев)
export function seedSort(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.rating - a.rating);
}

// Создание пар для тура
export function createPairs(
  players: Player[],
  gridType: TournamentSettings['gridType'],
  previousPairs: Match[]
): Player[] {
  if (gridType === "draw_each") return shuffle(players);
  if (gridType === "reseed") return seedSort(players);
  return players;
}

// Получение метки для сетки
export function getBracketLabel(bracket: string): string {
  const labels: Record<string, string> = {
    upper: "Верхняя сетка",
    lower: "Нижняя сетка",
    final: "Финал",
    eliminated: "Выбыл"
  };
  return labels[bracket] || bracket;
}

// Получение цвета для сетки
export function getBracketColor(bracket: string): string {
  const colors: Record<string, string> = {
    upper: "#1D9E75",
    lower: "#378ADD",
    final: "#D85A30",
    eliminated: "#888780"
  };
  return colors[bracket] || "#888";
}

// Настройки по умолчанию
export const DEFAULT_SETTINGS: TournamentSettings = {
  playerCount: 8,
  gamesPerStage: 1,
  tiebreak: "rating",
  gridType: "fixed",
};

// Информация о типах сеток
export const GRID_TYPES: Array<{ label: string; desc: string; color: string }> = [
  { label: "Жёсткая сетка", desc: "Пары определяются один раз по посеву и не меняются.", color: "#1D9E75" },
  { label: "Перепосев", desc: "После каждого тура участники заново ранжируются и формируются новые пары.", color: "#378ADD" },
  { label: "Жеребьёвка", desc: "Пары определяются случайно перед каждым туром.", color: "#D85A30" },
];

// Вкладки навигации
export const TABS = [
  { id: "settings" as const, label: "Параметры" },
  { id: "players" as const, label: "Участники" },
  { id: "bracket" as const, label: "Сетка / Туры" },
  { id: "standings" as const, label: "Таблица" },
];