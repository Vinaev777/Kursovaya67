import React, { useState, useCallback } from 'react';
import { Player, Match, TournamentSettings, TournamentState, NewPlayer } from '../types';
import { styles, getNavBtnStyle } from '../styles/globalStyles';
import { COLORS } from '../utils/colors';
import { DEFAULT_SETTINGS, seedSort, shuffle, TABS, createPairs } from '../utils/tournamentHelpers';
import SettingsTab from '../components/SettingsTab';
import PlayersTab from '../components/PlayersTab';
import BracketTab from '../components/BracketTab';
import StandingsTab from '../components/StandingsTab';

export default function TournamentPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'settings' | 'players' | 'bracket' | 'standings'>('settings');
  const [settings, setSettings] = useState<TournamentSettings>(DEFAULT_SETTINGS);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState<NewPlayer>({ firstName: "", lastName: "", rating: "" });
  const [tournament, setTournament] = useState<TournamentState | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [results, setResults] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState<boolean>(false);

  // Добавление участника
  const addPlayer = useCallback((): void => {
    const { firstName, lastName, rating } = newPlayer;
    if (!firstName.trim() || !lastName.trim()) return;
    if (players.length >= settings.playerCount) return;
    
    setPlayers(prev => [...prev, {
      id: Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      rating: parseInt(rating) || 1200,
      wins: 0,
      losses: 0,
      points: 0,
      bracket: "upper"
    }]);
    setNewPlayer({ firstName: "", lastName: "", rating: "" });
  }, [newPlayer, players.length, settings.playerCount]);

  // Удаление участника
  const removePlayer = useCallback((id: number): void => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  }, []);

  // Получение игрока по ID
  const getPlayer = useCallback((id: number | null): Player | null | undefined => {
    if (!id) return null;
    if (tournament) {
      return tournament.bracketPlayers.find(p => p.id === id);
    }
    return players.find(p => p.id === id);
  }, [tournament, players]);

  // Запуск турнира
  const startTournament = useCallback((): void => {
    if (players.length < 2) return;
    
    const seeded = settings.gridType === "fixed" || settings.gridType === "reseed"
      ? seedSort(players)
      : shuffle(players);

    const upper: Match[] = [];
    for (let i = 0; i < seeded.length; i += 2) {
      if (seeded[i + 1]) {
        upper.push({
          p1: seeded[i].id,
          p2: seeded[i + 1].id,
          bracket: "upper",
          round: 0,
          id: `u0_${i}`
        });
      } else {
        upper.push({
          p1: seeded[i].id,
          p2: null,
          bracket: "upper",
          round: 0,
          id: `u0_${i}`,
          bye: true
        });
      }
    }

    setTournament({
      matches: upper,
      allMatches: upper,
      round: 0,
      bracketPlayers: seeded.map(p => ({ ...p }))
    });
    setCurrentRound(0);
    setResults({});
    setFinished(false);
    setActiveTab("bracket");
  }, [players, settings.gridType]);

  // Установка результата матча
  const setResult = useCallback((matchId: string, winnerId: number): void => {
    setResults(prev => ({ ...prev, [matchId]: winnerId }));
  }, []);

  // Переход к следующему туру
  const advanceRound = useCallback((): void => {
    if (!tournament) return;
    
    const bracketPlayers = tournament.bracketPlayers.map(p => ({ ...p }));
    const allMatches = [...tournament.allMatches];
    const newRound = currentRound + 1;

    const roundMatchesFull = allMatches.filter(m => m.round === currentRound && !m.bye);

    roundMatchesFull.forEach(m => {
      const winnerId = results[m.id];
      const loserId = m.p1 === winnerId ? m.p2 : m.p1;
      const winner = bracketPlayers.find(p => p.id === winnerId);
      const loser = bracketPlayers.find(p => p.id === loserId);
      
      if (winner) {
        winner.wins++;
        winner.points++;
      }
      if (loser) {
        loser.losses++;
        if (m.bracket === "upper") {
          loser.bracket = "lower";
        } else {
          loser.bracket = "eliminated";
        }
      }
    });

    let upper = bracketPlayers.filter(p => p.bracket === "upper");
    let lower = bracketPlayers.filter(p => p.bracket === "lower");
    const newMatches: Match[] = [];

    // Матчи верхней сетки
    if (upper.length >= 2) {
      const ordered = createPairs(upper, settings.gridType, allMatches);
      for (let i = 0; i < ordered.length; i += 2) {
        if (ordered[i + 1]) {
          newMatches.push({
            p1: ordered[i].id,
            p2: ordered[i + 1].id,
            bracket: "upper",
            round: newRound,
            id: `u${newRound}_${i}`
          });
        }
      }
    }

    // Матчи нижней сетки
    if (lower.length >= 2) {
      const ordered = createPairs(lower, settings.gridType, allMatches);
      for (let i = 0; i < ordered.length; i += 2) {
        if (ordered[i + 1]) {
          newMatches.push({
            p1: ordered[i].id,
            p2: ordered[i + 1].id,
            bracket: "lower",
            round: newRound,
            id: `l${newRound}_${i}`
          });
        }
      }
    }

    // Финал
    upper = bracketPlayers.filter(p => p.bracket === "upper");
    lower = bracketPlayers.filter(p => p.bracket === "lower");
    
    if (upper.length === 1 && lower.length === 1) {
      newMatches.push({
        p1: upper[0].id,
        p2: lower[0].id,
        bracket: "final",
        round: newRound,
        id: `f${newRound}`
      });
    }

    if (upper.length === 1 && lower.length === 0) {
      setFinished(true);
    }

    setTournament({
      ...tournament,
      bracketPlayers,
      allMatches: [...allMatches, ...newMatches]
    });
    setCurrentRound(newRound);
    setResults({});
  }, [tournament, currentRound, results, settings.gridType]);

  // Подсчёт всех раундов (исправлено: Array.from вместо spread)
  const allRounds = tournament
    ? Array.from(new Set(tournament.allMatches.map(m => m.round))).sort((a, b) => a - b)
    : [];

  // Матчи текущего раунда по сеткам
  const roundsByBracket: Record<string, Match[]> = {};
  if (tournament) {
    tournament.allMatches
      .filter(m => m.round === currentRound && !m.bye)
      .forEach(m => {
        if (!roundsByBracket[m.bracket]) roundsByBracket[m.bracket] = [];
        roundsByBracket[m.bracket].push(m);
      });
  }

  // Проверка, все ли результаты введены
  const roundMatches = tournament
    ? tournament.allMatches.filter(m => m.round === currentRound && !m.bye)
    : [];
  const allRoundResultsEntered = roundMatches.length > 0 && roundMatches.every(m => results[m.id] !== undefined);

  // Таблица лидеров
  const standings = tournament
    ? [...tournament.bracketPlayers].sort((a, b) => b.points - a.points || b.rating - a.rating)
    : [...players].sort((a, b) => b.rating - a.rating);

  return (
    <div style={styles.app}>
      <h2 style={{ ...styles.sr }}>Турнир с двойным выбыванием — управление соревнованием</h2>
      
      <div style={styles.header}>
        <h1 style={styles.h1}>Турнир с двойным выбыванием</h1>
        <p style={styles.subtitle}>Double elimination tournament management</p>
      </div>

      <div style={styles.nav}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            style={getNavBtnStyle(activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "settings" && (
        <SettingsTab
          settings={settings}
          onSettingsChange={setSettings}
          onNext={() => setActiveTab("players")}
        />
      )}

      {activeTab === "players" && (
        <PlayersTab
          players={players}
          maxPlayers={settings.playerCount}
          newPlayer={newPlayer}
          onNewPlayerChange={setNewPlayer}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onBack={() => setActiveTab("settings")}
          onStart={startTournament}
          canStart={players.length >= 2}
        />
      )}

      {activeTab === "bracket" && (
        <BracketTab
          tournament={tournament}
          currentRound={currentRound}
          results={results}
          finished={finished}
          allRounds={allRounds}
          roundsByBracket={roundsByBracket}
          standings={standings}
          onRoundChange={setCurrentRound}
          onSetResult={setResult}
          onAdvanceRound={advanceRound}
          onViewStandings={() => setActiveTab("standings")}
          allRoundResultsEntered={allRoundResultsEntered}
          getPlayer={getPlayer}
        />
      )}

      {activeTab === "standings" && (
        <StandingsTab
          players={players}
          tournament={tournament}
          standings={standings}
          currentRound={currentRound}
          settings={settings}
        />
      )}
    </div>
  );
}