import { getLevelForScore, getRecommendation, getLevelKey } from "../../mbiNorms";
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

const LEVEL_PRIORITY = {
  veryHigh: 5,
  high: 4,
  mid: 3,
  low: 2,
  veryLow: 1,
};

//recoToPdf - преобразует рекомендации в формат pdfmake, поддерживает как строку, так и объект с полями short и details
function recoToPdf(reco) {
  if (!reco) return [];
  if (typeof reco === "string") {
    return [{ text: reco, style: "recoTitle", margin: [0, 0, 0, 8] }];
  }

  const out = [];
  if (reco.short) out.push({ text: reco.short, style: "recoTitle" });
  if (Array.isArray(reco.details) && reco.details.length) {
    out.push({ ul: reco.details, style: "recoText" });
  }
  return out;
}

// barRow - создает строку с цветной полосой, отображающей процент от максимального балла
function barRow(score, maxScore, color) {
  const barWidth = 515;
  const barHeight = 5;
  const radius = 3;
  const filled = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * barWidth)) : 0;

  const elements = [
    { type: "rect", x: 0, y: 0, w: barWidth, h: barHeight, r: radius, color: "#e5e7eb" },
  ];

  if (filled > 0) {
    elements.push({ type: "rect", x: 0, y: 0, w: filled, h: barHeight, r: radius, color });
  }

  return {
    canvas: elements,
    margin: [0, 4, 0, 8],
  };
}

//scaleHeader - создает заголовок для шкалы с иконкой
function scaleHeader(title, iconBase64) {
  return {
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
  };
}

//scoreRow - создает строку с результатом, уровнем и процентом от максимального балла
function scoreRow(value, maxScore, level, color) {
  const percent = maxScore > 0 ? Math.round((value / maxScore) * 100) : 0;

  return [
    {
      columns: [
        { text: `${value} баллов из ${maxScore} (${percent}%)`, style: "scalePercent" },
        { text: level, style: "scaleLabel", color },
      ],
      margin: [0, 0, 0, 2],
    },
    barRow(value, maxScore, color),
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
  ];
}

//scaleBlock - создает блок для каждой шкалы с заголовком, результатом и рекомендациями
function scaleBlock(title, value, maxScore, level, recommendation, iconBase64) {
  const color = getLevelColor(level);

  return [
    scaleHeader(title, iconBase64),
    ...scoreRow(value, maxScore, level, color),
    ...recoToPdf(recommendation),
    { text: "", margin: [0, 0, 0, 10] },
  ];
}

//burnoutBlock - создает блок для общего индекса выгорания, который отображается отдельно от остальных шкал
function burnoutBlock(title, value, maxScore, level, recommendation, iconBase64) {
  const color = getLevelColor(level);

  return [
    scaleHeader(title, iconBase64),
    ...scoreRow(value, maxScore, level, color),
    ...recoToPdf(recommendation),
  ];
}

//getProblemPriority - определяет приоритет проблемы для сортировки шкал, учитывая уровень и тип шкалы (редукция или нет)
function getProblemPriority(level, isReduction = false) {
  const key = typeof level === "string" ? getLevelKey(level) : "mid";
  const base = LEVEL_PRIORITY[key] || 3;
  return isReduction ? 6 - base : base;
}

//buildSummaryTitle - создает заголовок для раздела с результатами, который может включать главную зону внимания и общий уровень выгорания
function buildSummaryTitle(levelBurnout, mainScale) {
  if (mainScale && levelBurnout) {
    return [
      {
        text: `Главная зона внимания — ${mainScale.title.toLowerCase()}`,
        style: "summaryTitle",
        margin: [0, 0, 0, 2],
      },
      {
        text: `Общий уровень выгорания — ${levelBurnout.toLowerCase()}`,
        style: "summaryText",
        margin: [0, 0, 0, 14],
      },
    ];
  }

  if (mainScale) {
    return [
      {
        text: `Главная зона внимания — ${mainScale.title.toLowerCase()}`,
        style: "summaryTitle",
        margin: [0, 0, 0, 14],
      },
    ];
  }

  if (levelBurnout) {
    return [
      {
        text: `Общий уровень выгорания — ${levelBurnout.toLowerCase()}`,
        style: "summaryTitle",
        margin: [0, 0, 0, 14],
      },
    ];
  }

  return [
    {
      text: "Результаты вашего тестирования",
      style: "summaryTitle",
      margin: [0, 0, 0, 14],
    },
  ];
}

//resultsBlock - создает основной блок с результатами, который включает в себя общий индекс выгорания и отдельные шкалы, отсортированные по приоритету проблемы
export function resultsBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;

  const blocksConfig = [
    {
      key: "exhaustion",
      title: scales.exhaustion.title,
      score: scores.exhaustion,
      maxScore: scales.exhaustion.maxScore,
      level: getLevelForScore(scales, "exhaustion", scores.exhaustion),
      rec: getRecommendation(scales, "exhaustion", scores.exhaustion),
      icon: ICONS.exhaustion,
      isReduction: false,
    },
    {
      key: "depersonalization",
      title: scales.depersonalization.title,
      score: scores.depersonalization,
      maxScore: scales.depersonalization.maxScore,
      level: getLevelForScore(scales, "depersonalization", scores.depersonalization),
      rec: getRecommendation(scales, "depersonalization", scores.depersonalization),
      icon: ICONS.depersonalization,
      isReduction: false,
    },
    {
      key: "reduction",
      title: scales.reduction.title,
      score: scores.reduction,
      maxScore: scales.reduction.maxScore,
      level: getLevelForScore(scales, "reduction", scores.reduction),
      rec: getRecommendation(scales, "reduction", scores.reduction),
      icon: ICONS.reduction,
      isReduction: true,
    },
  ];

  blocksConfig.sort(
    (a, b) => getProblemPriority(b.level, b.isReduction) - getProblemPriority(a.level, a.isReduction)
  );

  const mainScale = blocksConfig[0];
  const levelBurnout = getLevelForScore({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const recBurnout = getRecommendation({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);

  return [
    ...buildSummaryTitle(levelBurnout, mainScale),
    ...burnoutBlock(
      scales.burnoutIndex?.title || "Общий индекс психического выгорания",
      burnoutIndex,
      burnoutConfig.maxScore,
      levelBurnout,
      recBurnout,
      ICONS.burnoutIndex
    ),
    { text: "", margin: [0, 0, 0, 14] },
    ...blocksConfig.flatMap(({ title, score, maxScore, level, rec, icon }) =>
      scaleBlock(title, score, maxScore, level, rec, icon)
    ),
    { text: "", pageBreak: "after" },
  ];
}