// src/utils/mbiHelpers.js
import { PINK, GRAY, BLUE } from "../pdf/pdfStyles";
import {SEG_COLORS} from "../../utils/mbi/mbiConstants";


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
  return SEG_COLORS[normalizeLevelKey(label)] || "#555";
}
function centerLine(widthPx = 300, thickness = 2) {
  const contentWidth = 515;
  const leftOffset = (contentWidth - widthPx) / 2;
  return {
    canvas: [{ type: "rect", x: leftOffset, y: 0, w: widthPx, h: thickness, color: PINK }],
    margin: [0, 0, 0, 12],
  };
}

export { SEG_COLORS, getLevelColor, centerLine };
