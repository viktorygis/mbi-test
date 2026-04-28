// src/utils/mbiHelpers.js
import { PINK, GRAY, BLUE } from "./pdf/pdfStyles";

// Вспомогательные функции для расчёта результатов теста MBI (Маслач-Джексон)

/**
 * Вычислить балл по одной шкале MBI.
 * @param {number[]} answerIndices - массив индексов ответов (0..5) длиной 22
 * @param {number[]} itemIds - номера вопросов для данной шкалы (1-based)
 * @param {number[]} scoreMap - соответствие индекса ответа баллу (например [0,1,3,4,5,6])
 * @returns {number}
 */
export function computeScaleScore(answerIndices, itemIds, scoreMap) {
  return itemIds.reduce((sum, id) => {
    const idx = answerIndices[id - 1]; // id is 1-based
    if (typeof idx !== "number" || idx < 0 || idx >= scoreMap.length) return sum;
    return sum + scoreMap[idx];
  }, 0);
}

/**
 * Вычислить баллы по всем трём шкалам MBI.
 * @param {number[]} answerIndices
 * @param {object} scalesConfig - объект scales из questions.json
 * @param {number[]} scoreMap
 * @returns {{ exhaustion: number, depersonalization: number, reduction: number }}
 */
export function computeMbiScores(answerIndices, scalesConfig, scoreMap) {
  const exhaustion = computeScaleScore(answerIndices, scalesConfig.exhaustion.items, scoreMap);
  const depersonalization = computeScaleScore(answerIndices, scalesConfig.depersonalization.items, scoreMap);
  const reduction = computeScaleScore(answerIndices, scalesConfig.reduction.items, scoreMap);
  return { exhaustion, depersonalization, reduction };
}

/**
 * Получить текстовое обозначение уровня по набору норм шкалы.
 * Для шкалы «Редукция» нормы хранятся в обратном порядке (39-48 = крайне низкое выгорание).
 * @param {number} score
 * @param {Array<{label:string, min:number, max:number}>} norms
 * @returns {string}
 */
// Внутренняя функция (не экспортируется)
function getLevelLabel(score, norms) {
  for (const norm of norms) {
    if (score >= norm.min && score <= norm.max) {
      return norm.label;
    }
  }
  return "—";
}

/**
 * Вычислить общий индекс психического выгорания.
 * Формула: exhaustion + depersonalization + (reductionMax - reduction)
 * @param {number} exhaustion
 * @param {number} depersonalization
 * @param {number} reduction
 * @param {number} reductionMax - максимальный балл по шкале редукции (48)
 * @returns {number}
 */
export function computeBurnoutIndex(exhaustion, depersonalization, reduction, reductionMax = 48) {
  return exhaustion + depersonalization + (reductionMax - reduction);
}

/**
 * Сформировать полный объект результатов MBI.
 * @param {number[]} answerIndices
 * @param {object} mbiData - полные данные из questions.json
 * @returns {object}
 */

export function createMbiResults(answerIndices, { scales, burnoutIndex, scores }) {
  const scoresObj = computeMbiScores(answerIndices, scales, scores);
  const exhaustionLevel = getLevelLabel(scoresObj.exhaustion, scales.exhaustion.norms);
  const depersonalizationLevel = getLevelLabel(scoresObj.depersonalization, scales.depersonalization.norms);
  const reductionLevel = getLevelLabel(scoresObj.reduction, scales.reduction.norms);
  const burnoutIndexValue = computeBurnoutIndex(scoresObj.exhaustion, scoresObj.depersonalization, scoresObj.reduction, scales.reduction.maxScore);
  const burnoutLevel = getLevelLabel(burnoutIndexValue, burnoutIndex.norms);

  return {
    scores: scoresObj,
    levels: {
      exhaustion: exhaustionLevel,
      depersonalization: depersonalizationLevel,
      reduction: reductionLevel,
    },
    burnoutIndex: burnoutIndexValue,
    burnoutLevel,
    scales,
    burnoutConfig: burnoutIndex,
  };
}

// Цвета для уровней шкал
const LEVEL_COLORS = {
  veryLow: "#22c55e",
  low: "#86efac",
  mid: "#facc15",
  high: "#f97316",
  veryHigh: "#ef4444",
};

// Цветы “линейки/бара” по показателю
const SCALE_BAR_COLORS = {
  exhaustion: "#ff9900",
  depersonalization: "#06eadc",
  reduction: "#fa00ff",
  burnoutIndex: "#0386ff",
};

// Приводит строку уровня к ключу
function normalizeLevelKey(label) {
  if (!label) return "mid";
  const lower = label.toLowerCase();
  if (lower === "нет данных" || lower === "—") return "mid";
  if (lower.includes("крайне низк")) return "veryLow";
  if (lower.startsWith("низк")) return "low";
  if (lower.startsWith("средн")) return "mid";
  if (lower.includes("крайне высок")) return "veryHigh";
  if (lower.includes("высок")) return "high";
  return "mid";
}

// Получить цвет для уровня по его текстовому обозначению
function getLevelColor(label) {
  return LEVEL_COLORS[normalizeLevelKey(label)] || "#555";
}
function centerLine(widthPx = 300, thickness = 2) {
  const contentWidth = 515;
  const leftOffset = (contentWidth - widthPx) / 2;
  return {
    canvas: [{ type: "rect", x: leftOffset, y: 0, w: widthPx, h: thickness, color: PINK }],
    margin: [0, 0, 0, 12],
  };
}

export { LEVEL_COLORS, SCALE_BAR_COLORS, getLevelColor, centerLine };
