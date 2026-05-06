import React from 'react';
import { TournamentSettings } from '../types';
import { styles, getBtnStyle } from '../styles/globalStyles';
import { GRID_TYPES } from '../utils/tournamentHelpers';

interface Props {
  settings: TournamentSettings;
  onSettingsChange: (settings: TournamentSettings) => void;
  onNext: () => void;
}

export default function SettingsTab({ settings, onSettingsChange, onNext }: Props): React.ReactElement {
  const updateSetting = <K extends keyof TournamentSettings>(key: K, value: TournamentSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div>
      <div style={styles.card}>
        <p style={styles.sectionTitle}>Параметры турнира</p>
        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Количество участников</label>
            <select
              style={styles.select}
              value={settings.playerCount}
              onChange={(e) => updateSetting('playerCount', +e.target.value)}
            >
              {[4, 8, 16, 32].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={styles.label}>Партий на этапе</label>
            <select
              style={styles.select}
              value={settings.gamesPerStage}
              onChange={(e) => updateSetting('gamesPerStage', +e.target.value)}
            >
              {[1, 3, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? "партия" : "партии"}</option>)}
            </select>
          </div>
          <div>
            <label style={styles.label}>Тайбрейк</label>
            <select
              style={styles.select}
              value={settings.tiebreak}
              onChange={(e) => updateSetting('tiebreak', e.target.value as TournamentSettings['tiebreak'])}
            >
              <option value="rating">По рейтингу</option>
              <option value="draw">Жребий</option>
              <option value="extra">Дополнительная партия</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Тип сетки</label>
            <select
              style={styles.select}
              value={settings.gridType}
              onChange={(e) => updateSetting('gridType', e.target.value as TournamentSettings['gridType'])}
            >
              <option value="fixed">Жёсткая сетка</option>
              <option value="reseed">Перепосев</option>
              <option value="draw_each">Жеребьёвка после каждого тура</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.sectionTitle}>Описание форматов</p>
        <div style={styles.grid3}>
          {GRID_TYPES.map(item => (
            <div key={item.label} style={{ ...styles.card, borderLeft: `3px solid ${item.color}`, marginBottom: 0 }}>
              <p style={{ margin: "0 0 6px", fontWeight: 500, fontSize: 13 }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: 12, color: styles.card.color }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button style={{ ...getBtnStyle("primary"), padding: "10px 32px", fontSize: 14 }} onClick={onNext}>
          Далее: добавить участников →
        </button>
      </div>
    </div>
  );
}