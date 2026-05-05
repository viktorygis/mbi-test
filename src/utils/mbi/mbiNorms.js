// src/utils/mbi/mbiNorms.js

/**
 * Найти полную норму по шкале и баллу.
 * @param {object} scales - объект шкал (scales)
 * @param {string} scaleKey
 * @param {number} score
 * @returns {{ key?: string, label?: string, min: number, max: number } | null}
 */
export function getNormForScore(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale || !Array.isArray(scale.norms)) return null;
  return scale.norms.find((r) => score >= r.min && score <= r.max) || null;
}

/**
 * Найти название уровня по шкале и баллу.
 * @param {object} scales - объект шкал (scales)
 * @param {string} scaleKey
 * @param {number} score
 * @returns {string}
 */
export function getLevelForScore(scales, scaleKey, score) {
  return getNormForScore(scales, scaleKey, score)?.label || "Нет данных";
}

/**
 * Получить стабильный внутренний ключ уровня.
 * @param {object} scales - объект шкал (scales)
 * @param {string} scaleKey
 * @param {number} score
 * @returns {string}
 */
export function getLevelKey(scales, scaleKey, score) {
  return getNormForScore(scales, scaleKey, score)?.key || "mid";
}

/**
 * Получить рекомендацию/интерпретацию уровня
 * @param {object} scales - scales или { burnoutIndex: ... }
 * @param {string} scaleKey
 * @param {number} score
 * @returns {object|string}
 */
export function getRecommendation(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale) return "";
  const key = getLevelKey(scales, scaleKey, score);
  return scale?.interpretations?.[key] || "";
}

/**
 * Общий итог по результату для профиля выгорания.
 * Profiles are evaluated in JSON order. "all_high" is treated as the most
 * severe combined pattern — when it matches, iteration stops immediately
 * so that only one (the most specific) message is shown.
 * The "no_risk" profile acts as a fallback shown when no other profile matched.
 */
export function combinedInterpretation(scores, scalesData) {
  const profiles = scalesData?.combinedProfiles;

  if (!Array.isArray(profiles) || profiles.length === 0) return [];

  let exhaustion, depersonalization, reduction;
  if (scores && typeof scores === "object" && !Array.isArray(scores)) {
    exhaustion = scores.exhaustion;
    depersonalization = scores.depersonalization;
    reduction = scores.reduction;
  } else if (Array.isArray(scores)) {
    [exhaustion, depersonalization, reduction] = scores;
  }

  if (typeof exhaustion !== "number" || typeof depersonalization !== "number" || typeof reduction !== "number") return [];

  const scalesObj = scalesData?.scales ?? {};
  const levelKeys = {
    exhaustion: getLevelKey(scalesObj, "exhaustion", exhaustion),
    depersonalization: getLevelKey(scalesObj, "depersonalization", depersonalization),
    reduction: getLevelKey(scalesObj, "reduction", reduction),
  };

  const NO_RISK_ID = "no_risk";
  const ALL_HIGH_ID = "all_high";
  const messages = [];

  for (const profile of profiles) {
    if (profile.id === NO_RISK_ID) continue;

    const when = profile.when ?? {};
    const keys = Object.keys(when);
    if (keys.length === 0) continue;

    const matches = keys.every(
      (scaleKey) => Array.isArray(when[scaleKey]) && when[scaleKey].includes(levelKeys[scaleKey])
    );

    if (matches) {
      messages.push(profile.message);
      if (profile.id === ALL_HIGH_ID) break;
    }
  }

  if (messages.length === 0) {
    const noRisk = profiles.find((p) => p.id === NO_RISK_ID);
    if (noRisk) messages.push(noRisk.message);
  }

  return messages;
}