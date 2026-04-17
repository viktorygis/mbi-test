// src/utils/mbiNorms.js
// Нормативы и рекомендации по шкалам MBI. Используется везде (React-компоненты, PDF).

export const SCALE_RANGES = {
  exhaustion: [
    { label: "Крайне низкое", min: 0, max: 10 },
    { label: "Низкое", min: 11, max: 20 },
    { label: "Среднее", min: 21, max: 30 },
    { label: "Высокое", min: 31, max: 40 },
    { label: "Крайне высокое", min: 41, max: 54 },
  ],
  depersonalization: [
    { label: "Крайне низкое", min: 0, max: 5 },
    { label: "Низкое", min: 6, max: 11 },
    { label: "Среднее", min: 12, max: 17 },
    { label: "Высокое", min: 18, max: 23 },
    { label: "Крайне высокое", min: 24, max: 30 },
  ],
  reduction: [
    // Обратная шкала!
    { label: "Крайне низкое выгорание", min: 39, max: 48 },
    { label: "Низкое", min: 29, max: 38 },
    { label: "Среднее", min: 19, max: 28 },
    { label: "Высокое", min: 9, max: 18 },
    { label: "Крайне высокое выгорание", min: 0, max: 8 },
  ],
  burnoutIndex: [
    { label: "Крайне низкое", min: 0, max: 23 },
    { label: "Низкое", min: 24, max: 49 },
    { label: "Среднее", min: 50, max: 75 },
    { label: "Высокое", min: 76, max: 101 },
    { label: "Крайне высокое", min: 102, max: 132 },
  ],
};

// По лейблу уровня возвращает короткий ключ (high/low etc)
export function getLevelKey(label) {
  const s = String(label || "").toLowerCase();
  if (s.includes("крайне низк")) return "veryLow";
  if (s.includes("низк")) return "low";
  if (s.includes("средн")) return "mid";
  if (s.includes("крайне высок")) return "veryHigh";
  if (s.includes("высок")) return "high";
  return "mid";
}

// По баллу — вернуть "человеческий" лейбл по шкале
export function getLevelForScore(scale, score) {
  const ranges = SCALE_RANGES[scale] || [];
  return ranges.find((r) => score >= r.min && score <= r.max)?.label || "Нет данных";
}

// --- Рекомендации по уровням ---
export const RECOMMENDATIONS = {
  exhaustion: {
    veryHigh: "Срочно займитесь восстановлением! Требуется максимальное внимание к ресурсам и режиму отдыха.",
    high: "Высокое истощение — важно дозировать нагрузку, следить за режимом сна и не забывать о коротких перерывах.",
    mid: "",
    low: "Ваш эмоциональный ресурс в норме. Старайтесь поддерживать сбалансированный ритм.",
    veryLow: "Вы отлично справляетесь с эмоциональной нагрузкой — это сильная сторона!",
  },
  depersonalization: {
    veryHigh: "Очень высокая деперсонализация — возможен отрыв от коллег. Важно не закрываться и искать поддерживающее общение.",
    high: "Обратите внимание на своё отношение к окружающим. Постарайтесь быть более открытыми и эмпатичными.",
    mid: "",
    low: "Ваша эмпатия и вовлечённость сохранены — это ваш ресурс.",
    veryLow: "Вы открыты и внимательны к другим — это защищает от эмоционального выгорания.",
  },
  reduction: {
    veryHigh: "Ярко выражено снижение самооценки и удовлетворённости. Отмечайте даже маленькие успехи, фиксируйте позитивные результаты.",
    high: "Снижение удовлетворённости работой — попробуйте делегировать рутину, поставьте достижимые цели.",
    mid: "",
    low: "Вы сохраняете профессиональную уверенность. Продолжайте уделять внимание своим достижениям.",
    veryLow: "Очень высокий уровень самоэффективности и удовлетворённости — отличный результат!",
  },
};

// Получить текст рекомендации по шкале и баллу
export function getRecommendation(scale, score) {
  const label = getLevelForScore(scale, score);
  const key = getLevelKey(label);
  return RECOMMENDATIONS[scale]?.[key] || "";
}

// Экспорт единым объектом при необходимости
export default {
  SCALE_RANGES,
  RECOMMENDATIONS,
  getLevelForScore,
  getLevelKey,
  getRecommendation,
};
