import { getLevelForScore, getRecommendation, getLevelKey } from "../../mbi/mbiNorms";
import { getLevelColor } from "../../mbi/mbiHelpers";
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

function barRow(score, maxScore, color) {
  const barWidth = 515;
  const barHeight = 5;
  const radius = 3;
  const filled = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * barWidth)) : 0;

  const elements = [{ type: "rect", x: 0, y: 0, w: barWidth, h: barHeight, r: radius, color: "#e5e7eb" }];
  if (filled > 0) {
    elements.push({ type: "rect", x: 0, y: 0, w: filled, h: barHeight, r: radius, color });
  }
  return { canvas: elements, margin: [0, 4, 0, 8] };
}

function scaleHeader(title, iconBase64) {
  return {
    columns: [
      { image: iconBase64, width: 16, height: 16, margin: [0, 0, 8, 0] },
      { text: title, style: "scaleTitle" },
    ],
    columnGap: 8,
    margin: [0, 0, 0, 2],
  };
}

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
        { stack: [{ text: `${percent}%`, alignment: "center", style: "scalePercentLine" }], width: "*" },
        { text: "100%", style: "scalePercentLine", alignment: "right", color: GRAY, width: 35 },
      ],
      margin: [0, -5, 0, 8],
      columnGap: 0,
    },
  ];
}

function scaleBlock(title, value, maxScore, level, recommendation, iconBase64) {
  const color = getLevelColor(level);
  return [
    scaleHeader(title, iconBase64),
    ...scoreRow(value, maxScore, level, color),
    ...recoToPdf(recommendation),
    { text: "", margin: [0, 0, 0, 10] },
  ];
}

function getProblemPriority(level, isReduction = false) {
  const key = typeof level === "string" ? getLevelKey(level) : "mid";
  const base = LEVEL_PRIORITY[key] || 3;
  return isReduction ? 6 - base : base;
}

// Блок с вертикальной полосой слева — цвет полоски = color
function highlightedBlock(headerRows, blockContent, color) {
  const leftCell = { text: "", fillColor: color, border: [false, false, false, false] };

  const rows = [];
  for (const row of headerRows) {
    rows.push([leftCell, { stack: [row], border: [false, false, false, false] }]);
  }
  for (const c of blockContent) {
    if (Array.isArray(c)) {
      for (const sub of c) rows.push([leftCell, { stack: [sub], border: [false, false, false, false] }]);
    } else {
      rows.push([leftCell, { stack: [c], border: [false, false, false, false] }]);
    }
  }

  return {
    table: { widths: [3, "*"], body: rows },
    layout: {
      defaultBorder: false,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: (i) => (i === 1 ? 12 : 0),
      paddingRight: () => 0,
      paddingTop: () => 2,
      paddingBottom: () => 2,
    },
    margin: [0, 0, 0, 14],
  };
}

function mainScaleBadge(color) {
  return {
    table: {
      widths: ["auto"],
      body: [[
        {
          text: "★  Главная зона внимания",
          fontSize: 9,
          bold: true,
          color: "#ffffff",
          fillColor: color,
          border: [false, false, false, false],
          margin: [6, 3, 6, 3],
        },
      ]],
    },
    layout: { defaultBorder: false },
    margin: [0, 2, 0, 6],
  };
}

// Блок главной шкалы: рамка цвета уровня со всех четырёх сторон
function highlightedMainScaleBlock(title, value, maxScore, level, recommendation, iconBase64) {
  const color = getLevelColor(level);

  const content = [
    mainScaleBadge(color),
    scaleHeader(title, iconBase64),
    ...scoreRow(value, maxScore, level, color),
    ...recoToPdf(recommendation),
  ];

  return {
    table: {
      widths: ["*"],
      // ← исправлено: одинарный массив [{ stack }], не двойной [[{ stack }]]
      body: content.map((item) => [{ stack: [item], border: [false, false, false, false] }]),
    },
    layout: {
      defaultBorder: false,
      hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 1 : 0),
      vLineWidth: (i) => (i === 0 || i === 1 ? 1 : 0),
      hLineColor: () => color,
      vLineColor: () => color,
      paddingLeft: () => 12,
      paddingRight: () => 12,
      paddingTop: () => 3,
      paddingBottom: () => 3,
    },
    margin: [0, 0, 0, 14],
  };
}

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

  blocksConfig.sort((a, b) => getProblemPriority(b.level, b.isReduction) - getProblemPriority(a.level, a.isReduction));

  const levelBurnout = getLevelForScore({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const recBurnout = getRecommendation({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  // ← полоска burnout теперь тоже цвета его уровня, а не фиксированный PINK
  const burnoutColor = getLevelColor(levelBurnout);

  const burnoutBlockHeader = [
    scaleHeader(scales.burnoutIndex?.title || "Общий индекс психического выгорания", ICONS.burnoutIndex),
  ];
  const burnoutBlockBody = [
    ...scoreRow(burnoutIndex, burnoutConfig.maxScore, levelBurnout, burnoutColor),
    ...recoToPdf(recBurnout),
  ];

  const [first, ...rest] = blocksConfig;

  return [
    highlightedBlock(burnoutBlockHeader, burnoutBlockBody, burnoutColor),

    highlightedMainScaleBlock(first.title, first.score, first.maxScore, first.level, first.rec, first.icon),

    ...rest.flatMap(({ title, score, maxScore, level, rec, icon }) =>
      scaleBlock(title, score, maxScore, level, rec, icon)
    ),

    { text: "", pageBreak: "after" },
  ];
}