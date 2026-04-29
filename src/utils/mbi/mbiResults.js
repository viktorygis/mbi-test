// src/utils/mbi/mbiResults.js

import { computeMbiScores, computeBurnoutIndex } from "./mbiScores.js";
import { getLevelForScore } from "./mbiNorms.js";

/**
 * Сформировать полный объект результатов (raw-ответы + нормализация).
 * @param {number[]} answerIndices
 * @param {object} mbiData - { scales, burnoutIndex, scores }
 * @returns {object}
 */
export function createMbiResults(answerIndices, { scales, burnoutIndex, scores }) {
  const scoresObj = computeMbiScores(answerIndices, scales, scores);
  const exhaustionLevel = getLevelForScore(scales, "exhaustion", scoresObj.exhaustion);
  const depersonalizationLevel = getLevelForScore(scales, "depersonalization", scoresObj.depersonalization);
  const reductionLevel = getLevelForScore(scales, "reduction", scoresObj.reduction);

  const burnoutIndexValue = computeBurnoutIndex(
    scoresObj.exhaustion,
    scoresObj.depersonalization,
    scoresObj.reduction
  );
  const burnoutLevel = getLevelForScore({ burnoutIndex: burnoutIndex }, "burnoutIndex", burnoutIndexValue);

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