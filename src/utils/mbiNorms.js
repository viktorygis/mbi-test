// src/utils/mbiNorms.js
// Работа с чистыми функциями для обработки шкал и рекомендаций

// Загружаем scales и burnoutIndex — ты загружаешь ВНЕ и передаёшь в функции
export async function loadScales(path = "/data/scales.json") {
  const res = await fetch(path);
  const data = await res.json();
  // Возвращаем весь объект с burnoutIndex и scales, чтобы всё удобно пробрасывать
  return {
    ...data.scales,
    burnoutIndex: data.burnoutIndex || {},
  };
}

// Поиск диапазонов по шкале и баллу
export function getLevelForScore(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale || !Array.isArray(scale.ranges)) return "Нет данных";
  return scale.ranges.find((r) => score >= r.min && score <= r.max)?.label || "Нет данных";
}

export function getScaleKeyByLabel(label) {
  const map = {
    "Психоэмоциональное истощение": "exhaustion",
    Деперсонализация: "depersonalization",
    "Редукция личных достижений": "reduction",
  };
  return map[label] || label;
}

// Поиск уровня нормы
export function getNormLevel(scales, key, score) {
  const scale = scales?.[key];
  if (!scale) return "Нет данных";
  const norm = (scale.norms || []).find((r) => score >= r.min && score <= r.max);
  return norm?.label || "Нет диапазона";
}

// Преобразовать русcкий текст уровня в ключ
export function getLevelKey(label) {
  const s = String(label || "").toLowerCase();
  if (s.includes("крайне низк")) return "veryLow";
  if (s.includes("низк")) return "low";
  if (s.includes("средн")) return "mid";
  if (s.includes("крайне высок")) return "veryHigh";
  if (s.includes("высок")) return "high";
  return "mid";
}

// Получить рекомендацию/интерпретацию уровня
export function getRecommendation(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale) return "";
  const label = getLevelForScore(scales, scaleKey, score);
  const key = getLevelKey(label);
  return scale?.interpretations?.[key] || "";
}
console.log(getRecommendation("exhaustion", 17));
console.log(getRecommendation("depersonalization", 21));
console.log(getRecommendation("reduction", 27));
export function getInterpretation(scales, key, levelLabel) {
  const scale = scales?.[key];
  if (!scale) return null;
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
  return scale.interpretations?.[intKey] || null;
}

// Профиль "выгорания" по результатам
export function combinedInterpretation(scores) {
  let exhaustion, depersonalization, reduction;

  // Если массив — достаем по индексам (если порядок правильный)
  if (Array.isArray(scores)) {
    exhaustion = scores[0];
    depersonalization = scores[1];
    reduction = scores[2];
  } else if (scores && typeof scores === "object") {
    exhaustion = scores.exhaustion;
    depersonalization = scores.depersonalization;
    reduction = scores.reduction;
  }

  // Если что-то не определено — возвращаем пусто или какую-то заглушку
  if (typeof exhaustion !== "number" || typeof depersonalization !== "number" || typeof reduction !== "number") {
    return [];
  }

  const exhausted = exhaustion >= 31;
  const depersonal = depersonalization >= 18;
  const reduced = reduction <= 18; // обратная шкала: чем ниже, тем лучше

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
