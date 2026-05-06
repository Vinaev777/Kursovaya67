import React from 'react';
import { Player, NewPlayer } from '../types';
import { styles, getBtnStyle, getColStyle } from '../styles/globalStyles';
import { COLORS } from '../utils/colors';

interface Props {
  players: Player[];
  maxPlayers: number;
  newPlayer: NewPlayer;
  onNewPlayerChange: (player: NewPlayer) => void;
  onAddPlayer: () => void;
  onRemovePlayer: (id: number) => void;
  onBack: () => void;
  onStart: () => void;
  canStart: boolean;
}

export default function PlayersTab({
  players,
  maxPlayers,
  newPlayer,
  onNewPlayerChange,
  onAddPlayer,
  onRemovePlayer,
  onBack,
  onStart,
  canStart
}: Props): React.ReactElement {
  const updateNewPlayer = (field: keyof NewPlayer, value: string) => {
    onNewPlayerChange({ ...newPlayer, [field]: value });
  };

  return (
    <div>
      <div style={styles.card}>
        <p style={styles.sectionTitle}>Добавить участника ({players.length}/{maxPlayers})</p>
        <div style={{ ...styles.row, alignItems: "flex-end" }}>
          <div style={getColStyle(1)}>
            <label style={styles.label}>Имя</label>
            <input
              style={styles.input}
              value={newPlayer.firstName}
              onChange={(e) => updateNewPlayer('firstName', e.target.value)}
              placeholder="Имя"
              onKeyDown={(e) => e.key === "Enter" && onAddPlayer()}
            />
          </div>
          <div style={getColStyle(1)}>
            <label style={styles.label}>Фамилия</label>
            <input
              style={styles.input}
              value={newPlayer.lastName}
              onChange={(e) => updateNewPlayer('lastName', e.target.value)}
              placeholder="Фамилия"
              onKeyDown={(e) => e.key === "Enter" && onAddPlayer()}
            />
          </div>
          <div style={getColStyle(0.6)}>
            <label style={styles.label}>Рейтинг</label>
            <input
              style={styles.input}
              type="number"
              value={newPlayer.rating}
              onChange={(e) => updateNewPlayer('rating', e.target.value)}
              placeholder="1200"
              onKeyDown={(e) => e.key === "Enter" && onAddPlayer()}
            />
          </div>
          <div>
            <button style={getBtnStyle("primary")} onClick={onAddPlayer} disabled={players.length >= maxPlayers}>
              Добавить
            </button>
          </div>
        </div>
      </div>

      {players.length > 0 && (
        <div style={styles.card}>
          <p style={styles.sectionTitle}>Список участников</p>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Имя</th>
                <th style={styles.th}>Фамилия</th>
                <th style={styles.th}>Рейтинг</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ ...styles.td, color: COLORS.textSecondary, width: 30 }}>{i + 1}</td>
                  <td style={styles.td}>{p.firstName}</td>
                  <td style={styles.td}>{p.lastName}</td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: 500, color: "#1D9E75" }}>{p.rating}</span>
                  </td>
                  <td style={{ ...styles.td, width: 40 }}>
                    <button onClick={() => onRemovePlayer(p.id)} style={{ ...getBtnStyle("danger"), padding: "4px 10px", fontSize: 12 }}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
        <button style={getBtnStyle()} onClick={onBack}>← Параметры</button>
        <button
          style={{ ...getBtnStyle("primary"), padding: "10px 32px", fontSize: 14, opacity: canStart ? 1 : 0.5 }}
          onClick={onStart}
          disabled={!canStart}
        >
          Начать турнир →
        </button>
      </div>
    </div>
  );
}