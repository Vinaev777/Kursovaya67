import { CSSProperties } from 'react';
import { COLORS } from '../utils/colors';

// Статические стили (константы)
export const styles: Record<string, CSSProperties> = {
  app: {
    fontFamily: "var(--font-sans)",
    color: COLORS.text,
    maxWidth: 900,
    margin: "0 auto",
    padding: "1rem"
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    borderBottom: `0.5px solid ${COLORS.border}`,
    paddingBottom: "1.5rem"
  },
  h1: {
    fontSize: 26,
    fontWeight: 500,
    margin: "0 0 6px"
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    margin: 0
  },
  nav: {
    display: "flex",
    gap: 4,
    marginBottom: "1.5rem",
    background: COLORS.bgSecondary,
    borderRadius: 10,
    padding: 4
  },
  card: {
    background: COLORS.bg,
    border: `0.5px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1rem"
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
    display: "block",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5
  },
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "8px 10px",
    border: `0.5px solid ${COLORS.border}`,
    borderRadius: 8,
    background: COLORS.bg,
    color: COLORS.text,
    fontSize: 14
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    border: `0.5px solid ${COLORS.border}`,
    borderRadius: 8,
    background: COLORS.bg,
    color: COLORS.text,
    fontSize: 14
  },
  row: {
    display: "flex",
    gap: 12,
    alignItems: "flex-end",
    flexWrap: "wrap" as const
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 500,
    margin: "0 0 1rem",
    color: COLORS.text
  },
  metricCard: {
    background: COLORS.bgSecondary,
    borderRadius: 8,
    padding: "12px 16px",
    textAlign: "center" as const
  },
  metricVal: {
    fontSize: 24,
    fontWeight: 500,
    margin: "4px 0 0"
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    margin: 0
  },
  matchCard: {
    background: COLORS.bgSecondary,
    border: `0.5px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: "12px 16px",
    marginBottom: 8
  },
  divider: {
    height: 1,
    background: COLORS.border,
    margin: "8px 0"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13
  },
  th: {
    textAlign: "left" as const,
    padding: "8px 10px",
    borderBottom: `0.5px solid ${COLORS.border}`,
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5
  },
  td: {
    padding: "10px 10px",
    borderBottom: `0.5px solid ${COLORS.border}`,
    fontSize: 13
  },
  sr: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap" as const,
    borderWidth: 0
  }
};

// Функции-генераторы стилей
export const getNavBtnStyle = (active: boolean): CSSProperties => ({
  flex: 1,
  padding: "8px 12px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 13,
  background: active ? COLORS.bg : "transparent",
  color: active ? COLORS.text : COLORS.textSecondary,
  fontWeight: active ? 500 : 400,
  transition: "all 0.15s",
  boxShadow: active ? `0 0 0 0.5px ${COLORS.border}` : "none"
});

export const getBtnStyle = (variant: "default" | "primary" | "danger" = "default"): CSSProperties => ({
  padding: "8px 16px",
  border: `0.5px solid ${COLORS.borderSecondary}`,
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  background: variant === "primary" ? "#1D9E75" : variant === "danger" ? "#D85A30" : COLORS.bg,
  color: variant === "primary" || variant === "danger" ? "#fff" : COLORS.text,
  transition: "opacity 0.15s",
});

export const getColStyle = (flex: number = 1): CSSProperties => ({ flex });

export const getPlayerRowStyle = (winner: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px 0",
  color: winner ? COLORS.text : COLORS.textSecondary,
  fontWeight: winner ? 500 : 400
});