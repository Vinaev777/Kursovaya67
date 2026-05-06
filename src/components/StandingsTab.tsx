import React from 'react';
import { Player, TournamentState } from '../types';
import { styles } from '../styles/globalStyles';
import { COLORS } from '../utils/colors';
import { getBracketLabel, getBracketColor } from '../utils/tournamentHelpers';

interface Props {
  players: Player[];
  tournament: TournamentState | null;
  standings: Player[];
  currentRound: number;
  settings: { playerCount: number; gridType: string };
}

export default function StandingsTab({ players, tournament, standings, currentRound, settings }: Props): React.ReactElement {
  const gridTypeLabels: Record<string, string> = {
    fixed: "Жёсткая",
    reseed: "Перепосев",
    draw_each: "Жребий"
  };

  const metrics = [
    { label: "Участников", val: players.length },
    { label: "Туров сыграно", val: tournament ? currentRound : 0 },
    { label: "Тип сетки", val: gridTypeLabels[settings.gridType] || settings.gridType },
  ];

  return (
    <div>
      <div style={{ ...styles.grid3, marginBottom: "1rem" }}>
        {metrics.map(m => (
          <div key={m.label} style={styles.metricCard}>
            <p style={styles.metricLabel}>{m.label}</p>
            <p style={styles.metricVal}>{m.val}</p>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <p style={styles.sectionTitle}>Итоговая таблица</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Место</th>
              <th style={styles.th}>Участник</th>
              <th style={styles.th}>Рейтинг</th>
              <th style={styles.th}>Победы</th>
              <th style={styles.th}>Поражения</th>
              <th style={styles.th}>Очки</th>
              <th style={styles.th}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((p, i) => {
              const medalColors = ["#D85A30", "#888780", "#B87333"];
              return (
                <tr key={p.id} style={{ background: i === 0 ? "rgba(29,158,117,0.06)" : "transparent" }}>
                  <td style={{ ...styles.td, fontWeight: i < 3 ? 500 : 400, color: medalColors[i] || COLORS.textSecondary }}>
                    {i + 1}
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: i === 0 ? "#1D9E75" : COLORS.bgSecondary,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: i === 0 ? "#fff" : COLORS.textSecondary, fontWeight: 500
                      }}>
                        {p.firstName[0]}{p.lastName[0]}
                      </div>
                      <span style={{ fontWeight: i < 3 ? 500 : 400 }}>{p.firstName} {p.lastName}</span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, color: "#1D9E75", fontWeight: 500 }}>{p.rating}</td>
                  <td style={{ ...styles.td, color: "#1D9E75" }}>{p.wins || 0}</td>
                  <td style={{ ...styles.td, color: "#D85A30" }}>{p.losses || 0}</td>
                  <td style={{ ...styles.td, fontWeight: 500 }}>{p.points || 0}</td>
                  <td style={styles.td}>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500,
                      background: `rgba(${getBracketColor(p.bracket).replace('#', '')},0.12)`,
                      color: getBracketColor(p.bracket)
                    }}>
                      {getBracketLabel(p.bracket)}
                    </span>
                  </td>
                </tr>
              );
            })}
            {standings.length === 0 && (
              <tr><td colSpan={7} style={{ ...styles.td, textAlign: "center", color: COLORS.textSecondary, padding: "2rem" }}>Участников пока нет</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {tournament && standings.length > 0 && (
        <div style={styles.card}>
          <p style={styles.sectionTitle}>Карточки участников</p>
          <div style={styles.grid2}>
            {standings.map((p, i) => {
              const medalSymbols = ["🥇", "🥈", "🥉"];
              return (
                <div key={p.id} style={{ ...styles.card, marginBottom: 0, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: i === 0 ? "#1D9E75" : COLORS.bgSecondary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, color: i === 0 ? "#fff" : COLORS.text, fontWeight: 500, flexShrink: 0
                  }}>
                    {p.firstName[0]}{p.lastName[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 2px", fontWeight: 500, fontSize: 14 }}>{p.firstName} {p.lastName}</p>
                    <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary }}>Рейтинг {p.rating}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: "#1D9E75" }}>W: {p.wins || 0}</span>
                      <span style={{ fontSize: 11, color: "#D85A30" }}>L: {p.losses || 0}</span>
                      <span style={{ fontSize: 11, color: COLORS.textSecondary }}>Очки: {p.points || 0}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 20, color: ["#D85A30", "#888780", "#B87333"][i] || COLORS.bgTertiary }}>
                    {medalSymbols[i] || ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}