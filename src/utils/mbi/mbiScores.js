// src/utils/mbi/mbiScores.js

/**
 * Вычислить балл по одной шкале MBI.
 * @param {number[]} answerIndices - массив индексов ответов (0..5) длиной 22
 * @param {number[]} itemIds - номера вопросов для данной шкалы (1-based)
 * @param {number[]} scoreMap - соответствие индекса ответа баллу
 * @param {boolean} invert - инвертировать баллы? (только для "редукции")
 * @returns {number}
 */
export function computeScaleScore(answerIndices, itemIds, scoreMap, invert = false) {
  return itemIds.reduce((sum, id) => {
    const idx = answerIndices[id - 1]; // id is 1-based
    if (typeof idx !== "number" || idx < 0 || idx >= scoreMap.length) return sum;
    let score = scoreMap[idx];
    if (invert) {
      score = scoreMap[scoreMap.length - 1] - score;
    }
    return sum + score;
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
  const reduction = computeScaleScore(answerIndices, scalesConfig.reduction.items, scoreMap, true);
  return { exhaustion, depersonalization, reduction };
}

/**
 * Вычислить общий индекс психического выгорания.
 * Формула: exhaustion + depersonalization + reduction
 * @param {number} exhaustion
 * @param {number} depersonalization
 * @param {number} reduction
 * @returns {number}
 */
export function computeBurnoutIndex(exhaustion, depersonalization, reduction) {
  return exhaustion + depersonalization + reduction;
}
