// src/utils/mbiHelpers.js
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
    if (typeof idx !== 'number' || idx < 0 || idx >= scoreMap.length) return sum;
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
export function getScaleLevel(score, norms) {
  for (const norm of norms) {
    if (score >= norm.min && score <= norm.max) {
      return norm.label;
    }
  }
  return '—';
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
export function createMbiResults(answerIndices, mbiData) {
  const { scales, burnoutIndex: burnoutConfig, scores: scoreMap } = mbiData;
  const scores = computeMbiScores(answerIndices, scales, scoreMap);
  const exhaustionLevel = getScaleLevel(scores.exhaustion, scales.exhaustion.norms);
  const depersonalizationLevel = getScaleLevel(scores.depersonalization, scales.depersonalization.norms);
  const reductionLevel = getScaleLevel(scores.reduction, scales.reduction.norms);
  const burnoutIndex = computeBurnoutIndex(
    scores.exhaustion,
    scores.depersonalization,
    scores.reduction,
    scales.reduction.maxScore
  );
  const burnoutLevel = getScaleLevel(burnoutIndex, burnoutConfig.norms);

  return {
    scores,
    levels: {
      exhaustion: exhaustionLevel,
      depersonalization: depersonalizationLevel,
      reduction: reductionLevel,
    },
    burnoutIndex,
    burnoutLevel,
    scales,
    burnoutConfig,
  };
}
