// src/utils/pdf/blocks/resultsBlock.js
import { getLevelForScore } from "../../mbiNorms";
import { SCALE_BAR_COLORS, getLevelColor, centerLine } from "../../mbiHelpers";
import { PINK, GRAY, BLUE } from '../pdfStyles';

function barRow(score, maxScore, color) {
  const filled = maxScore > 0 ? Math.round((score / maxScore) * 515) : 0;
  const empty = 515 - filled;
  return {
    canvas: [
      { type: "rect", x: 0, y: 0, w: filled, h: 10, r: 3, color },
      { type: "rect", x: filled, y: 0, w: empty, h: 10, r: 3, color: "#e5e7eb" },
    ],
    margin: [0, 4, 0, 8],
  };
}
function scaleBlock(title, score, maxScore, level, description, invertedNote, barColor = PINK) {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const rows = [
    {
      columns: [
        { text: title, fontSize: 14, bold: true },
        {
          text: level,
          fontSize: 12,
          bold: true,
          color: getLevelColor(level),
          alignment: "right",
        },
      ],
      margin: [0, 0, 0, 2],
    },
    {
      text: `${score} баллов из ${maxScore} (${percent}%)`,
      fontSize: 11,
      color: GRAY,
      margin: [0, 0, 0, 2],
    },
    barRow(score, maxScore, barColor),
  ];
  if (description) {
    rows.push({ text: description, fontSize: 11, color: GRAY, margin: [0, 0, 0, 4] });
  }
  if (invertedNote) {
    rows.push({
      text: `⚠ ${invertedNote}`,
      fontSize: 10,
      color: "#9a3412",
      italics: true,
      margin: [0, 0, 0, 4],
    });
  }
  return rows;
}

export function resultsBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;
  const levelExh = getLevelForScore("exhaustion", scores.exhaustion);
  const levelDep = getLevelForScore("depersonalization", scores.depersonalization);
  const levelRed = getLevelForScore("reduction", scores.reduction);
  const levelBurnout = getLevelForScore("burnoutIndex", burnoutIndex);
  return [
    { text: "Результаты вашего тестирования", fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 4] },
    centerLine(400),

    ...scaleBlock(scales.exhaustion.title, scores.exhaustion, scales.exhaustion.maxScore, levelExh, scales.exhaustion.description, undefined, SCALE_BAR_COLORS.exhaustion),
    { text: "", margin: [0, 0, 0, 14] },

    ...scaleBlock(
      scales.depersonalization.title,
      scores.depersonalization,
      scales.depersonalization.maxScore,
      levelDep,
      scales.depersonalization.description,
      undefined,
      SCALE_BAR_COLORS.depersonalization,
    ),
    { text: "", margin: [0, 0, 0, 14] },

    ...scaleBlock(scales.reduction.title, scores.reduction, scales.reduction.maxScore, levelRed, scales.reduction.description, undefined, SCALE_BAR_COLORS.reduction),
    { text: "", margin: [0, 0, 0, 14] },

    { canvas: [{ type: "rect", x: 0, y: 0, w: 515, h: 1, color: "#e5e7eb" }], margin: [0, 8, 0, 8] },
    {
      columns: [
        { text: "Общий индекс психического выгорания", fontSize: 14, bold: true },
        {
          text: levelBurnout,
          fontSize: 12,
          bold: true,
          color: getLevelColor(levelBurnout),
          alignment: "right",
        },
      ],
      margin: [0, 0, 0, 2],
    },
    {
      text: `${burnoutIndex} баллов из ${burnoutConfig.maxScore} (${burnoutConfig.maxScore > 0 ? Math.round((burnoutIndex / burnoutConfig.maxScore) * 100) : 0}%)`,
      fontSize: 11,
      color: GRAY,
      margin: [0, 0, 0, 2],
    },
    barRow(burnoutIndex, burnoutConfig.maxScore, SCALE_BAR_COLORS.burnoutIndex),
    burnoutConfig.description ? { text: burnoutConfig.description, fontSize: 11, color: GRAY, margin: [0, 0, 0, 8] } : {},
    { text: "", pageBreak: "after" },
  ];
}
