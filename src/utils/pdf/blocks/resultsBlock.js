import { getLevelForScore, getRecommendation, getLevelKey } from "../../mbi/mbiNorms";
import { getLevelColor } from "../../mbi/mbiHelpers";

import emotionalBase64 from "../image/emotional";
import depersonalizationBase64 from "../image/depersonalization";
import reductionBase64 from "../image/reduction";
import burnoutBase64 from "../image/burnout";

// ─── Константы ────────────────────────────────────────────────────────────────

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

const BAR = { width: 515, height: 5, radius: 3 };
const BLOCK_GAP = 14;

// ─── Вспомогательные функции ──────────────────────────────────────────────────

function recoToPdf(reco) {
  if (!reco) return [];
  if (typeof reco === "string") {
    return [{ text: reco, style: "recoTitle", margin: [0, 4, 0, 8] }];
  }
  const out = [];
  if (reco.short) out.push({ text: reco.short, style: "recoTitle", margin: [0, 4, 0, 4] });
  if (Array.isArray(reco.details) && reco.details.length) {
    out.push({ ul: reco.details, style: "recoText", margin: [0, 0, 0, 4] });
  }
  return out;
}

function barRow(score, maxScore, color) {
  const filled = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * BAR.width)) : 0;
  const elements = [{ type: "rect", x: 0, y: 0, w: BAR.width, h: BAR.height, r: BAR.radius, color: "#e5e7eb" }];
  if (filled > 0) {
    elements.push({ type: "rect", x: 0, y: 0, w: filled, h: BAR.height, r: BAR.radius, color });
  }
  return { canvas: elements, margin: [0, 2, 0, 2] };
}

function scaleHeader(title, iconBase64) {
  return {
    columns: [
      { image: iconBase64, width: 16, height: 16 },
      { text: title, style: "scaleTitle" },
    ],
    columnGap: 8,
    margin: [0, 0, 0, 4],
  };
}

function barPercent(value, maxScore) {
  const percent = maxScore > 0 ? Math.round((value / maxScore) * 100) : 0;
  const tickX = maxScore > 0 ? Math.max(0, Math.round((value / maxScore) * BAR.width)) : 0;

  const leftW = 20;
  const rightW = 30;
  const labelW = 30;
  const inner = BAR.width - leftW - rightW;

  const labelLeft = Math.max(0, Math.min(tickX - leftW - labelW / 2, inner - labelW));
  const labelRight = Math.max(0, inner - labelW - labelLeft);

  return {
    stack: [
      {
        canvas: [{ type: "line", x1: tickX, y1: 0, x2: tickX, y2: 7, lineWidth: 2, lineColor: "#374151" }],
        margin: [0, 1, 0, 0],
      },
      {
        columns: [
          { text: "0%", style: "scalePercentLine", width: leftW },
          { text: "", width: labelLeft },
          { text: `${percent}%`, style: "scalePercentLine", bold: true, width: labelW, alignment: "center" },
          { text: "", width: labelRight },
          { text: "100%", style: "scalePercentLine", width: rightW, alignment: "right" },
        ],
        columnGap: 0,
      },
    ],
    margin: [0, 0, 0, 2],
  };
}

function scoreRow(value, maxScore, level, color) {
  const percent = maxScore > 0 ? Math.round((value / maxScore) * 100) : 0;
  return [
    {
      columns: [
        { text: `${value} баллов из ${maxScore} (${percent}%)`, style: "scalePercent" },
        { text: level, style: "scaleLabel", color, alignment: "right" },
      ],
      margin: [0, 0, 0, 1],
    },
    barRow(value, maxScore, color),
    barPercent(value, maxScore),
  ];
}

function coloredBlock(header, body, color) {
  const left = { text: "", fillColor: color, border: [false, false, false, false] };
  const cell = (content) => ({ stack: [content], border: [false, false, false, false] });

  const rows = [...header.map((row) => [left, cell(row)]), ...body.flat().map((row) => [left, cell(row)])];

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
    margin: [0, 0, 0, BLOCK_GAP],
  };
}



function getProblemPriority(level) {
  const key = typeof level === "string" ? getLevelKey(level) : "mid";
  return LEVEL_PRIORITY[key] ?? 3;
}

// ─── Сводный блок ─────────────────────────────────────────────────────────────

function summaryBlock(burnoutTitle, burnoutLevel, burnoutColor, firstTitle, firstIcon, firstLevel, firstColor) {
  const badge = (text, color) => ({
    text,
    style: "summaryLevel",
    color: "#ffffff",
    background: color,
    borderRadius: 4,
    padding: [6, 2, 6, 2],
  });

  return {
    stack: [
      // ── Карточка 1: Общий индекс ──
      {
        table: {
          widths: ["*"],
          body: [[{
            fillColor: "#f9fafb",
            border: [true, true, true, true],
            borderColor: ["#e5e7eb", "#e5e7eb", "#e5e7eb", "#e5e7eb"],
            stack: [{
              columns: [
                { text: burnoutTitle, style: "summaryTitleGeneral", width: "*" },
                badge(burnoutLevel, burnoutColor),
              ],
              columnGap: 10,
            }],
            margin: [12, 12, 12, 12],
          }]],
        },
        layout: {
          defaultBorder: false,
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#e5e7eb",
          vLineColor: () => "#e5e7eb",
        },
        margin: [0, 0, 0, 12],
      },

      // ── Карточка 2: Требует внимания ──
      {
        table: {
          widths: ["*"],
          body: [[{
            border: [true, true, true, true],
            borderColor: [firstColor, firstColor, firstColor, firstColor],
            fillColor: "#ffffff",
            stack: [
              {
                text: "ТРЕБУЕТ ВНИМАНИЯ",
                style: "summaryAttentionLabel",
                color: firstColor,
                margin: [0, 0, 0, 6],
              },
              {
                columns: [
                  { text: firstTitle, style: "summaryTitle", width: "*" },
                  badge(firstLevel, firstColor),
                ],
                columnGap: 8,
              },
            ],
            margin: [12, 12, 12, 12],
          }]],
        },
        layout: {
          defaultBorder: false,
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => firstColor,
          vLineColor: () => firstColor,
        },
        margin: [0, 0, 0, 20],
      },
    ],
  };
}
// ─── Заголовок второй страницы ────────────────────────────────────────────────
/**
 * Блок с тонкой цветной полосой слева — для второй страницы.
 * Без заливки фона, полоса тоньше чем в coloredBlock.
 */
function accentBlock(header, body, color) {
  const left = {
    text: "",
    fillColor: color,
    border: [false, false, false, false],
  };
  const cell = (content) => ({
    stack: [content],
    border: [false, false, false, false],
  });

  const rows = [...header.map((row) => [left, cell(row)]), ...body.flat().map((row) => [left, cell(row)])];

  return {
    table: { widths: [2, "*"], body: rows }, // ← 2px вместо 3px — тоньше чем coloredBlock
    layout: {
      defaultBorder: false,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: (i) => (i === 1 ? 10 : 0),
      paddingRight: () => 0,
      paddingTop: () => 2,
      paddingBottom: () => 2,
    },
    margin: [0, 0, 0, BLOCK_GAP],
  };
}
function secondPageHeader() {
  return {
    table: {
      widths: ["*"],
      body: [
        [
          {
            fillColor: "#f3f4f6",
            border: [false, false, false, true], // только нижняя граница
            borderColor: ["#d1d5db", "#d1d5db", "#d1d5db", "#d1d5db"],
            stack: [
              {
                columns: [
                  {
                    canvas: [
                      {
                        type: "polyline",
                        points: [
                          { x: 0, y: 0 },
                          { x: 8, y: 4 },
                          { x: 0, y: 8 },
                          { x: 3, y: 4 },
                          { x: 0, y: 0 },
                        ],
                        color: "#6b7280",
                        lineWidth: 1.5,
                        closePath: true,
                      },
                    ],
                    width: 12,
                    height: 10,
                    margin: [0, 4, 0, 0],
                  },
                  {
                    stack: [
                      { text: "Дополнительные показатели", style: "pageTitle", margin: [0, 0, 0, 2] },
                      { text: "Шкалы с менее выраженными значениями на момент прохождения теста.", style: "pageSubtitle" },
                    ],
                  },
                ],
                columnGap: 8,
              },
            ],
            margin: [12, 10, 12, 8],
          },
        ],
      ],
    },
    layout: "noBorders",
    margin: [0, 0, 0, 20],
  };
}

// ─── Главная функция ──────────────────────────────────────────────────────────

export function resultsBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;

  const scalesConfig = [
    {
      key: "exhaustion",
      title: scales.exhaustion.title,
      score: scores.exhaustion,
      maxScore: scales.exhaustion.maxScore,
      level: getLevelForScore(scales, "exhaustion", scores.exhaustion),
      rec: getRecommendation(scales, "exhaustion", scores.exhaustion),
      icon: ICONS.exhaustion,
    },
    {
      key: "depersonalization",
      title: scales.depersonalization.title,
      score: scores.depersonalization,
      maxScore: scales.depersonalization.maxScore,
      level: getLevelForScore(scales, "depersonalization", scores.depersonalization),
      rec: getRecommendation(scales, "depersonalization", scores.depersonalization),
      icon: ICONS.depersonalization,
    },
    {
      key: "reduction",
      title: scales.reduction.title,
      score: scores.reduction,
      maxScore: scales.reduction.maxScore,
      level: getLevelForScore(scales, "reduction", scores.reduction),
      rec: getRecommendation(scales, "reduction", scores.reduction),
      icon: ICONS.reduction,
    },
  ];

  scalesConfig.sort((a, b) => getProblemPriority(b.level) - getProblemPriority(a.level));

  const burnoutLevel = getLevelForScore({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const burnoutRec = getRecommendation({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const burnoutColor = getLevelColor(burnoutLevel);
  const burnoutTitle = scales.burnoutIndex?.title ?? "Общий индекс психического выгорания";

  const [first, ...rest] = scalesConfig;
  const firstColor = getLevelColor(first.level);

  return [
    // ── Страница 1 ────────────────────────────────────────────────────────────

    summaryBlock(burnoutTitle, burnoutLevel, burnoutColor, first.title, first.icon, first.level, firstColor),

    coloredBlock([scaleHeader(burnoutTitle, ICONS.burnoutIndex)], [...scoreRow(burnoutIndex, burnoutConfig.maxScore, burnoutLevel, burnoutColor), ...recoToPdf(burnoutRec)], burnoutColor),

    coloredBlock([scaleHeader(first.title, first.icon)], [...scoreRow(first.score, first.maxScore, first.level, firstColor), ...recoToPdf(first.rec)], firstColor),

    // ── Страница 2 ────────────────────────────────────────────────────────────
    { text: "", pageBreak: "after" },

    ...(rest.length > 0 ? [secondPageHeader()] : []),

    ...rest.map(({ title, score, maxScore, level, rec, icon }) => {
  const color = getLevelColor(level);
  return accentBlock(
    [scaleHeader(title, icon)],
    [...scoreRow(score, maxScore, level, color), ...recoToPdf(rec)],
    color,
  );
}),

    { text: "", pageBreak: "after" },
  ];
}
