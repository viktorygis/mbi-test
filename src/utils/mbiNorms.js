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
// Поиск диапазонов по шкале и баллу
export function getLevelForScore(scale, score) {
  if (!SCALES?.[scale] || !Array.isArray(SCALES[scale].ranges)) return "Нет данных";
  return SCALES[scale].ranges.find((r) => score >= r.min && score <= r.max)?.label || "Нет данных";
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
} // Поиск ключа (как раньше — можно доработать чтобы ключи были в json)
export function getLevelKey(label) {
  const s = String(label || "").toLowerCase();
  if (s.includes("крайне низк")) return "veryLow";
  if (s.includes("низк")) return "low";
  if (s.includes("средн")) return "mid";
  if (s.includes("крайне высок")) return "veryHigh";
  if (s.includes("высок")) return "high";
  return "mid";
}
// Получить интерпретацию
export function getRecommendation(scale, score) {
  if (!SCALES?.[scale]) return "";
  const label = getLevelForScore(scale, score);
  const key = getLevelKey(label);
  return SCALES[scale]?.interpretations?.[key] || "";
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
//Профиль выгорания
export function combinedInterpretation(scores) {
  const exhausted = scores.exhaustion >= 31; // высокий/крайне высокий
  const depersonal = scores.depersonalization >= 18;
  const reduced = scores.reduction <= 18; // обратная шкала: чем ниже, тем лучше

  const messages = [];

  if (exhausted && depersonal && reduced) {
    messages.push("По всем трём шкалам есть выраженные признаки выгорания: человек сильно истощён, эмоционально дистанцируется и чувствует снижение профессиональной эффективности.");
  } else {
    if (exhausted && depersonal) {
      messages.push("Сочетание высокого истощения и выраженной дистанции в общении говорит о том, что ресурсы уже сильно снижены, а взаимодействие с людьми даётся с трудом.");
    }
    if (exhausted && reduced) {
      messages.push("Сочетание высокого истощения и снижения ощущения профессиональной эффективности говорит о риске потери мотивации и уверенности в своей работе.");
    }
  }

  return messages;
}
