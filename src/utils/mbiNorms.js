// src/utils/mbiNorms.js
// Работа с данными шкал и рекомендациями, загружаемыми из public/data/scales.json

let SCALES = null;

export async function loadScales(path = "/data/scales.json") {
  if (SCALES) return SCALES; // кеширование
  const res = await fetch(path);
  const data = await res.json();
  SCALES = data.scales || {};
  SCALES.burnoutIndex = data.burnoutIndex || {};
  return SCALES;
}

export function getScaleKeyByLabel(label) {
  const map = {
    "Психоэмоциональное истощение": "exhaustion",
    Деперсонализация: "depersonalization",
    "Редукция личных достижений": "reduction",
  };
  return map[label] || label;
}

export function getNormLevel(scales, key, score) {
  const scale = scales[key];
  if (!scale) return "Нет данных";
  const norm = (scale.norms || []).find((r) => score >= r.min && score <= r.max);
  return norm?.label || "Нет диапазона";
}

export function getInterpretation(scales, key, levelLabel) {
  if (!scales[key]) return null;
  const labelKey = {
    "Крайне низкое": "veryLow",
    "Крайне низкая": "veryLow",
    Низкое: "low",
    Низкая: "low",
    Среднее: "mid",
    Средняя: "mid",
    Высокое: "high",
    Высокая: "high",
    "Крайне высокое": "veryHigh",
    "Крайне высокая": "veryHigh",
  };
  const intKey = labelKey[levelLabel] || "mid";
  return scales[key].interpretations?.[intKey] || null;
}
export function isScalesLoaded() {
  return !!SCALES;
}
