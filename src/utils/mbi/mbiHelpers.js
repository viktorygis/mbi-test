import { PINK } from "../pdf/pdfStyles";
import { SEG_COLORS } from "../../utils/mbi/mbiConstants";

// Приводит ключ уровня к нормализованному машинному ключу
function normalizeLevelKey(levelKey) {
  if (!levelKey || typeof levelKey !== "string") return "mid";

  const normalized = levelKey.trim();

  if (normalized === "veryLow") return "veryLow";
  if (normalized === "low") return "low";
  if (normalized === "mid") return "mid";
  if (normalized === "high") return "high";
  if (normalized === "veryHigh") return "veryHigh";

  return "mid";
}

// Получить цвет для уровня по машинному ключу
function getLevelColor(levelKey) {
  return SEG_COLORS[normalizeLevelKey(levelKey)] || "#555";
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