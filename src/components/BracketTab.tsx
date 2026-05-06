import React from 'react';
import { Player, Match, TournamentState } from '../types';
import { styles, getBtnStyle, getPlayerRowStyle } from '../styles/globalStyles';
import { COLORS } from '../utils/colors';
import { getBracketLabel, getBracketColor } from '../utils/tournamentHelpers';

interface Props {
  tournament: TournamentState | null;
  currentRound: number;
  results: Record<string, number>;
  finished: boolean;
  allRounds: number[];
  roundsByBracket: Record<string, Match[]>;
  standings: Player[];
  onRoundChange: (round: number) => void;
  onSetResult: (matchId: string, winnerId: number) => void;
  onAdvanceRound: () => void;
  onViewStandings: () => void;
  allRoundResultsEntered: boolean;
  getPlayer: (id: number | null) => Player | null | undefined;
}

export default function BracketTab({
  tournament,
  currentRound,
  results,
  finished,
  allRounds,
  roundsByBracket,
  standings,
  onRoundChange,
  onSetResult,
  onAdvanceRound,
  onViewStandings,
  allRoundResultsEntered,
  getPlayer
}: Props): React.ReactElement {
  if (!tournament) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 0", color: COLORS.textSecondary }}>
        <p style={{ fontSize: 15 }}>Сначала добавьте участников и запустите турнир</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ ...styles.card, textAlign: "center", padding: "2rem" }}>
        <p style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Турнир завершён!</p>
        {standings[0] && (
          <p style={{ fontSize: 15, color: COLORS.textSecondary }}>
            Победитель: <strong>{standings[0].firstName} {standings[0].lastName}</strong> (рейтинг {standings[0].rating})
          </p>
        )}
        <button style={{ ...getBtnStyle("primary"), marginTop: "1rem" }} onClick={onViewStandings}>
          Просмотр результатов →
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>Тур:</span>
        {allRounds.map(r => (
          <button
            key={r}
            style={{
              ...getBtnStyle(),
              background: r === currentRound ? COLORS.bgSecondary : "transparent",
              fontSize: 12,
              padding: "5px 12px"
            }}
            onClick={() => onRoundChange(r)}
          >
            Тур {r + 1}
          </button>
        ))}
      </div>

      {Object.entries(roundsByBracket).map(([bracket, matches]) => (
        <div key={bracket} style={styles.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: getBracketColor(bracket) }} />
            <p style={{ ...styles.sectionTitle, margin: 0 }}>{getBracketLabel(bracket)} — Тур {currentRound + 1}</p>
          </div>
          {matches.map(m => {
            const p1 = getPlayer(m.p1);
            const p2 = getPlayer(m.p2);
            const selected = results[m.id];
            return (
              <div key={m.id} style={styles.matchCard}>
                <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    {[p1, p2].map((p, idx) => p && (
                      <div key={idx}>
                        <div style={getPlayerRowStyle(selected === p.id)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                              width: 28, height: 28, borderRadius: "50%",
                              background: selected === p.id ? "#1D9E75" : COLORS.bgSecondary,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 11, color: selected === p.id ? "#fff" : COLORS.textSecondary, fontWeight: 500
                            }}>
                              {p.firstName[0]}{p.lastName[0]}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: selected === p.id ? 500 : 400 }}>
                                {p.firstName} {p.lastName}
                              </div>
                              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>
                                Рейтинг {p.rating} · W:{p.wins} L:{p.losses}
                              </div>
                            </div>
                          </div>
                          <button
                            style={{
                              ...getBtnStyle(selected === p.id ? "primary" : "default"),
                              padding: "4px 12px", fontSize: 12,
                              background: selected === p.id ? "#1D9E75" : COLORS.bg,
                              color: selected === p.id ? "#fff" : COLORS.text
                            }}
                            onClick={() => onSetResult(m.id, p.id)}
                          >
                            {selected === p.id ? "Победитель ✓" : "Победа"}
                          </button>
                        </div>
                        {idx === 0 && <div style={styles.divider} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {Object.keys(roundsByBracket).length === 0 && (
        <div style={{ ...styles.card, textAlign: "center", color: COLORS.textSecondary, padding: "2rem" }}>
          <p>Матчей в этом туре нет. Нажмите «Следующий тур».</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button
          style={{
            ...getBtnStyle("primary"),
            padding: "10px 28px",
            fontSize: 14,
            opacity: allRoundResultsEntered ? 1 : 0.5
          }}
          onClick={onAdvanceRound}
          disabled={!allRoundResultsEntered}
        >
          Следующий тур →
        </button>
      </div>
    </>
  );
}