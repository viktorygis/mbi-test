// src/utils/pdf/blocks/resultsBlock.js
import { getLevelForScore, getRecommendation } from "../../mbiNorms";
import { getLevelColor } from "../../mbiHelpers";
import { GRAY } from "../pdfStyles";

import emotionalBase64 from "../image/emotional";
import depersonalizationBase64 from "../image/depersonalization";
import reductionBase64 from "../image/reduction";
import burnoutBase64 from "../image/burnout";

const ICONS = {
  exhaustion: emotionalBase64,
  depersonalization: depersonalizationBase64,
  reduction: reductionBase64,
  burnoutIndex: burnoutBase64,
};

//recoTextObj - превращает рекомендацию в объект для PDF. Может принимать строку или объект { short, details }
function recoTextObj(reco) {
  if (!reco) return "";
  if (typeof reco === "object") {
    const arr = [];
    if (reco.short) {
      arr.push({ text: reco.short, style: "recoTitle" });
    }
    if (Array.isArray(reco.details) && reco.details.length) {
      arr.push({ ul: reco.details, style: "recoText" });
    }
    return arr;
  }
  // если вдруг просто строка
  return { text: reco, style: "recoTitle", margin: [0, 0, 0, 8] };
}

// Рисует линейку для шкалы. На вход получает баллы, максимум и цвет для заполненной части
function barRow(score, maxScore, color) {
  const barWidth = 515;
  const barHeight = 5;
  const radius = 3;

  const filled = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * barWidth)) : 0;

  const elements = [
    // ВСЕГДА рисуем серую полоску со скруглёнными концами (фоновый бар)
    { type: "rect", x: 0, y: 0, w: barWidth, h: barHeight, r: radius, color: "#e5e7eb" },
  ];

  // Накладываем цветной бар
  if (filled > 0) {
    elements.push({ type: "rect", x: 0, y: 0, w: filled, h: barHeight, r: radius, color });
  }

  return {
    canvas: elements,

    margin: [0, 4, 0, 8],
  };
}

// Блок для одной шкалы
function scaleBlockPdf(key, title, score, maxScore, level, recommendation, iconBase64) {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const color = getLevelColor(level);

  return [
    // Заголовок с иконкой
    {
      columns: [
        {
          image: iconBase64,
          width: 16,
          height: 16,
          margin: [0, 0, 8, 0],
        },
        { text: title, style: "scaleTitle" },
      ],
      columnGap: 8,
      margin: [0, 0, 0, 2],
    },
    // Уровень и баллы
    {
      columns: [
        {
          text: `${score} баллов из ${maxScore} (${percent}%)`,
          style: "scalePercent",
        },
        {
          text: level,
          style: "scaleLabel",
          color,
        },
      ],
      margin: [0, 0, 0, 2],
    },
    // Линейка
    barRow(score, maxScore, color),
    // Проценты под линейкой
    {
      columns: [
        { text: "0%", style: "scalePercentLine", width: 35 },
        {
          stack: [{ text: `${percent}%`, style: "scalePercentLine", alignment: "center" }],
          width: "*",
        },
        { text: "100%", style: "scalePercentLine", alignment: "right", width: 35 },
      ],
      margin: [0, -5, 0, 8],
      columnGap: 0,
    },
    // Рекомендация
    ...[].concat(recoTextObj(recommendation)),
    { text: "", margin: [0, 0, 0, 10] },
  ];
}

// Блок для общего индекса выгорания.
function burnoutIndexBlockPdf(title, index, maxScore, level, recommendation, iconBase64) {
  const percent = maxScore > 0 ? Math.round((index / maxScore) * 100) : 0;
  const color = getLevelColor(level);

  return [
    // Заголовок с иконкой
    {
      columns: [
        {
          image: iconBase64,
          width: 16,
          height: 16,
          margin: [0, 0, 8, 0],
        },
        { text: title, style: "scaleTitle" },
      ],
      columnGap: 8,
      margin: [0, 0, 0, 2],
    },
    // Уровень и баллы
    {
      columns: [
        {
          text: `${index} баллов из ${maxScore} (${percent}%)`,
          style: "scalePercent",
        },
        {
          text: level,
          style: "scaleLabel",
          color,
        },
      ],
      margin: [0, 0, 0, 2],
    },
    // Линейка
    barRow(index, maxScore, color),
    // Проценты под линейкой
    {
      columns: [
        { text: "0%", style: "scalePercentLine", width: 35 },
        {
          stack: [{ text: `${percent}%`, alignment: "center", style: "scalePercentLine" }],
          width: "*",
        },
        { text: "100%", style: "scalePercentLine", alignment: "right", color: GRAY, width: 35 },
      ],
      margin: [0, -5, 0, 8],
      columnGap: 0,
    },
    // Рекомендация
    ...[].concat(recoTextObj(recommendation)),
  ];
}

export function resultsBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;
  const levelExh = getLevelForScore(scales, "exhaustion", scores.exhaustion);
  const levelDep = getLevelForScore(scales, "depersonalization", scores.depersonalization);
  const levelRed = getLevelForScore(scales, "reduction", scores.reduction);
  const levelBurnout = getLevelForScore({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);

  // Рекомендация для каждой шкалы!
  const recExh = getRecommendation(scales, "exhaustion", scores.exhaustion);
  const recDep = getRecommendation(scales, "depersonalization", scores.depersonalization);
  const recRed = getRecommendation(scales, "reduction", scores.reduction);
  const recBurnout = getRecommendation({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);

  return [
    { text: "Результаты вашего тестирования", style: "sectionTitle" },

    ...scaleBlockPdf("exhaustion", scales.exhaustion.title, scores.exhaustion, scales.exhaustion.maxScore, levelExh, recExh, ICONS.exhaustion),
    ...scaleBlockPdf("depersonalization", scales.depersonalization.title, scores.depersonalization, scales.depersonalization.maxScore, levelDep, recDep, ICONS.depersonalization),
    ...scaleBlockPdf("reduction", scales.reduction.title, scores.reduction, scales.reduction.maxScore, levelRed, recRed, ICONS.reduction),

    ...burnoutIndexBlockPdf("Общий индекс психического выгорания", burnoutIndex, burnoutConfig.maxScore, levelBurnout, recBurnout, ICONS.burnoutIndex),
    { text: "", pageBreak: "after" },
  ];
}
