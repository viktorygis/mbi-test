// src/utils/pdf/blocks/headerBlock.js
import logoBase64 from "../image/logo";
import { PINK, GRAY, BLUE, docStyles } from "../pdfStyles";

function formatDate(raw) {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function headerBlock(userData, timeDisplay) {
  const fullName = userData?.fullName || "";
  const date = formatDate(userData?.date) || timeDisplay || "";
  return [
    {
      columns: [
        {
          text: "www.ai4g.ru",
          link: "https://ai4g.ru/",
          style: "subtitle", // вместо fontSize, color и т.д.
          decoration: "underline",
          bold: true,
          margin: [0, 8, 0, 0],
        },
        {
          image: logoBase64,
          width: 90,
          height: 36,
          alignment: "center",
        },
        {
          text: "Пройти тест ещё раз",
          link: "https://ai4g.ru/mbi-test/",
          style: "subtitle",
          alignment: "right",
          decoration: "underline",
          margin: [0, 8, 0, 0],
        },
      ],
      margin: [0, 0, 0, 8],
    },
    // Разделительная линия
    { canvas: [{ type: "rect", x: 0, y: 0, w: 515, h: 2, color: PINK }], margin: [0, 0, 0, 10] },
    {
      columns: [
        { text: fullName ? `ФИО: ${fullName}` : "", style: "label", alignment: "left" },
        { text: date ? `Дата: ${date}` : "", style: "label", alignment: "right" },
      ],
      margin: [0, 0, 0, 6],
    },
    {
      text: [
        { text: "MBI ", style: "bigTitle" },
        { text: "Тест на выгорание Маслач", fontSize: 22, bold: true },
      ],
      alignment: "center",
      margin: [0, 20, 0, 10],
    },
  ]
}
