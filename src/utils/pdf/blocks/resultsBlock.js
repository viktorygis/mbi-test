import { getLevelForScore, getRecommendation, getLevelKey, combinedInterpretation } from "../../mbi/mbiNorms";
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

const REDUCTION_KEYS = new Set(["reduction"]);

const BAR = { width: 515, height: 5, radius: 3 };
const BLOCK_GAP = 16;

// ─── Цвета сегментов ──────────────────────────────────────────────────────────

const SEG_COLORS = {
  veryLow:  "#4ade80",
  low:      "#a3e635",
  mid:      "#fbbf24",
  high:     "#fb923c",
  veryHigh: "#f87171",
};

// ─── Извлечь сегменты из scale.norms ─────────────────────────────────────────

function extractSegments(scaleConfig) {
  if (!scaleConfig?.norms || !Array.isArray(scaleConfig.norms)) return null;
  return scaleConfig.norms.map((norm) => ({
    label: norm.label,
    color: SEG_COLORS[getLevelKey(norm.label)] ?? "#94a3b8",
    from: norm.min,
    to: norm.max,
    key: getLevelKey(norm.label),
  }));
}

// ─── Сегментированная линейка — метки СНИЗУ ──────────────────────────────────

function leveledBar(value, maxScore, segments) {
  const W     = BAR.width;
  const BAR_H = 10;

  const tickX = maxScore > 0
    ? Math.max(0, Math.min(Math.round((value / maxScore) * W), W))
    : 0;

  const PIN_W    = 24;
  const pinLeft  = Math.max(0, tickX - PIN_W / 2);
  const pinRight = W - pinLeft - PIN_W;

  const labelColumns = segments.map((seg, i) => {
    const segW = Math.max(1, Math.round(((seg.to - seg.from + 1) / maxScore) * W));
    const isLast = i === segments.length - 1;
    return {
      text: seg.label,
      style: "segmentLabel",
      width: isLast ? "*" : segW,
      alignment: "center",
    };
  });

  const canvasItems = [];

  canvasItems.push({
    type: "rect", x: 0, y: 0, w: W, h: BAR_H, r: BAR_H / 2, color: "#e5e7eb",
  });

  segments.forEach((seg) => {
    const x   = Math.max(0, Math.round((seg.from / maxScore) * W));
    const toX = Math.min(W, Math.round(((seg.to + 1) / maxScore) * W));
    const w   = Math.max(1, toX - x);
    canvasItems.push({ type: "rect", x, y: 0, w, h: BAR_H, r: 0, color: seg.color });
  });

  canvasItems.push({
    type: "line",
    x1: tickX, y1: -4,
    x2: tickX, y2: BAR_H,
    lineWidth: 2,
    lineColor: "#1f2937",
  });

  return {
    stack: [
      {
        columns: [
          { text: "", width: pinLeft },
          { text: String(value), style: "segmentedScorePin", width: PIN_W, alignment: "center" },
          { text: "", width: pinRight > 0 ? pinRight : "*" },
        ],
        margin: [0, 0, 0, 1],
      },
      { canvas: canvasItems, margin: [0, 0, 0, 4] },
      { columns: labelColumns, columnGap: 0, margin: [0, 0, 0, 0] },
    ],
  };
}

// ─── Блок интерпретации ──────────────────────────��────────────────────────────

function interpretationBox(text) {
  if (!text) return null;
  return {
    table: {
      widths: ["*"],
      body: [[{
        fillColor: "#f3f4f6",
        border: [false, false, false, false],
        text,
        style: "interpretationText",
        alignment: "center",
      }]],
    },
    layout: {
      defaultBorder: false,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft:   () => 12,
      paddingRight:  () => 12,
      paddingTop:    () => 10,
      paddingBottom: () => 10,
    },
    margin: [0, 8, 0, 0],
  };
}

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
  const elements = [
    { type: "rect", x: 0, y: 0, w: BAR.width, h: BAR.height, r: BAR.radius, color: "#e5e7eb" },
  ];
  if (filled > 0) {
    elements.push({ type: "rect", x: 0, y: 0, w: filled, h: BAR.height, r: BAR.radius, color });
  }
  return { canvas: elements, margin: [0, 2, 0, 2] };
}

function barPercent(value, maxScore) {
  const percent = maxScore > 0 ? Math.round((value / maxScore) * 100) : 0;
  const tickX   = maxScore > 0 ? Math.max(0, Math.round((value / maxScore) * BAR.width)) : 0;

  const leftW  = 20;
  const rightW = 30;
  const labelW = 30;
  const inner  = BAR.width - leftW - rightW;

  const labelLeft  = Math.max(0, Math.min(tickX - leftW - labelW / 2, inner - labelW));
  const labelRight = Math.max(0, inner - labelW - labelLeft);

  return {
    stack: [
      {
        canvas: [{ type: "line", x1: tickX, y1: 0, x2: tickX, y2: 7, lineWidth: 2, lineColor: "#374151" }],
        margin: [0, 1, 0, 0],
      },
      {
        columns: [
          { text: "0%",          style: "scalePercentLine", width: leftW },
          { text: "",            width: labelLeft },
          { text: `${percent}%`, style: "scalePercentLine", bold: true, width: labelW, alignment: "center" },
          { text: "",            width: labelRight },
          { text: "100%",        style: "scalePercentLine", width: rightW, alignment: "right" },
        ],
        columnGap: 0,
      },
    ],
    margin: [0, 0, 0, 2],
  };
}

function getProblemPriority(level) {
  const key = typeof level === "string" ? getLevelKey(level) : "mid";
  return LEVEL_PRIORITY[key] ?? 3;
}

// ─── Профиль выгорания ────────────────────────────────────────────────────────

function profileSummaryBlock(scores, scalesData) {
  const messages = combinedInterpretation(scores, scalesData);
  const hasMessages = Array.isArray(messages) && messages.length > 0;

  const items = hasMessages
    ? messages.map((msg, i) => ({
        columns: [
          { canvas: [{ type: "ellipse", x: 3, y: 5, r1: 2, r2: 2, color: "#6b7280" }], width: 10 },
          { text: msg, style: "profileSummaryText", width: "*" },
        ],
        columnGap: 6,
        margin: [0, 0, 0, i < messages.length - 1 ? 5 : 0],
      }))
    : [{ text: "Тревожные сочетания по шкалам не выражены.", style: "profileSummaryText", color: "#6b7280" }];

  return {
    table: {
      widths: ["*"],
      body: [[{
        fillColor: "#f8fafc",
        border: [false, false, false, false],
        stack: [
          { text: "Профиль выгорания", style: "profileSummaryTitle", margin: [0, 0, 0, 6] },
          ...items,
        ],
      }]],
    },
    layout: {
      defaultBorder: false,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft:   () => 14,
      paddingRight:  () => 14,
      paddingTop:    () => 12,
      paddingBottom: () => 12,
    },
    margin: [0, 12, 0, 20],
  };
}

// ─── Блок поддержки ───────────────────────────────────────────────────────────

function seekHelpBlock() {
  return {
    table: {
      widths: ["*"],
      body: [[{
        border: [false, false, false, false],
        fillColor: "#fafafa",
        stack: [
          { text: "Когда стоит обратиться за поддержкой", style: "seekHelpTitle", margin: [0, 0, 0, 6] },
          {
            text: "Если усталость, раздражительность, проблемы со сном или ощущение беспомощности не проходят несколько недель и начинают мешать жизни — имеет смысл обсудить это со специалистом. Это обычный и рабочий способ поддержки.",
            style: "seekHelpText",
          },
        ],
      }]],
    },
    layout: {
      defaultBorder: false,
      hLineWidth: (i) => (i === 0 || i === 1 ? 0.5 : 0),
      vLineWidth: () => 0,
      hLineColor: () => "#e5e7eb",
      paddingLeft:   () => 14,
      paddingRight:  () => 14,
      paddingTop:    () => 12,
      paddingBottom: () => 12,
    },
    margin: [0, 16, 0, 0],
  };
}

// ─── Главная функция ──────────────────────────────────────────────────────────

export function resultsBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig, scalesData } = mbiResults;

  const scalesConfig = [
    {
      key: "exhaustion",
      title: scales.exhaustion.title,
      score: scores.exhaustion,
      maxScore: scales.exhaustion.maxScore,
      level: getLevelForScore(scales, "exhaustion", scores.exhaustion),
      rec: getRecommendation(scales, "exhaustion", scores.exhaustion),
      icon: ICONS.exhaustion,
      config: scales.exhaustion,
    },
    {
      key: "depersonalization",
      title: scales.depersonalization.title,
      score: scores.depersonalization,
      maxScore: scales.depersonalization.maxScore,
      level: getLevelForScore(scales, "depersonalization", scores.depersonalization),
      rec: getRecommendation(scales, "depersonalization", scores.depersonalization),
      icon: ICONS.depersonalization,
      config: scales.depersonalization,
    },
    {
      key: "reduction",
      title: scales.reduction.title,
      score: scores.reduction,
      maxScore: scales.reduction.maxScore,
      level: getLevelForScore(scales, "reduction", scores.reduction),
      rec: getRecommendation(scales, "reduction", scores.reduction),
      icon: ICONS.reduction,
      config: scales.reduction,
    },
  ];

  scalesConfig.sort((a, b) => getProblemPriority(b.level) - getProblemPriority(a.level));

  const burnoutLevel    = getLevelForScore({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const burnoutRec      = getRecommendation({ burnoutIndex: burnoutConfig }, "burnoutIndex", burnoutIndex);
  const burnoutColor    = getLevelColor(burnoutLevel);
  const burnoutTitle    = scales.burnoutIndex?.title ?? "Общий индекс психического выгорания";
  const burnoutSegments = extractSegments(burnoutConfig);
  const meaning         = burnoutRec?.short ?? "";

  return [
    // ── Страница 1 ────────────────────────────────────────────────────────────

    { text: "Итоговый результат", style: "pageTitle", margin: [0, 0, 0, 4] },
    {
      text: "Чем выше балл, тем выше ваш уровень профессионального выгорания.",
      style: "pageSubtitle",
      margin: [0, 0, 0, 16],
    },

    // Общий индекс с иконкой
    {
      columns: [
        { image: ICONS.burnoutIndex, width: 18, height: 18, margin: [0, 1, 0, 0] },
        { text: burnoutTitle, style: "scaleTitle", width: "*" },
      ],
      columnGap: 8,
      margin: [0, 0, 0, 12],
    },

    // Цветная линейка с метками снизу
    ...(burnoutSegments
      ? [leveledBar(burnoutIndex, burnoutConfig.maxScore, burnoutSegments)]
      : [barRow(burnoutIndex, burnoutConfig.maxScore, burnoutColor)]
    ),

    // Интерпретация уровня
    ...(meaning ? [interpretationBox(meaning)] : []),

    // Профиль выгорания
    profileSummaryBlock(scores, scalesData ?? null),

    // ── Страница 2: Расшифровка ───────────────────────────────────────────────
    { text: "", pageBreak: "after" },

    { text: "Расшифровка результата", style: "pageTitle", margin: [0, 0, 0, 16] },

    // Шкалы с линейками + рекомендациями
    ...scalesConfig.map(({ key, title, icon, score, maxScore, level, rec, config }) => {
      const color    = getLevelColor(level);
      const segments = extractSegments(config);

      return {
        stack: [
          {
            columns: [
              { image: icon, width: 14, height: 14, margin: [0, 1, 0, 0] },
              { text: title, style: "scaleTitle", width: "*" },
              { text: level, style: "scaleLabel", color, alignment: "right", width: "auto" },
            ],
            columnGap: 8,
            margin: [0, 0, 0, 4],
          },
          { text: `${score} баллов из ${maxScore}`, style: "scalePercent", margin: [0, 0, 0, 8] },
          ...(segments
            ? [leveledBar(score, maxScore, segments)]
            : [barRow(score, maxScore, color), barPercent(score, maxScore)]
          ),
          ...(REDUCTION_KEYS.has(key)
            ? [{ text: "Чем выше балл — тем сильнее выражено снижение ощущения эффективности.", style: "scaleHint", color: "#9ca3af", margin: [0, 6, 0, 0] }]
            : []
          ),
          ...recoToPdf(rec),
        ],
        margin: [0, 0, 0, BLOCK_GAP + 4],
      };
    }),

    seekHelpBlock(),

    { text: "", pageBreak: "after" },
  ];
}