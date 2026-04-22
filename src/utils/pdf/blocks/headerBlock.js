// src/utils/pdf/blocks/headerBlock.js
import logoBase64 from "../logo";
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
          link: "https://ai4g.ru/test-mbi",
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
        { text: "Тест Маслач на выгорание", fontSize: 22, bold: true },
      ],
      alignment: "center",
      margin: [0, 40, 0, 10],
    },
    {
      text: "Тест на определение уровня профессионального выгорания",
      style: "normal",
      alignment: "center",
    },
    {
      text: "Что измеряет тест:",
      fontSize: 14,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 16],
    },
    {
      text: "Тест Маслач на выгорание предназначен для оценки уровня профессионального выгорания. Он измеряет три ключевых компонента выгорания:",
      style: "normal",
      margin: [0, 0, 0, 16],
    },
    {
      ul: [
        {
          type: "none",
          text: [{ text: "Психоэмоциональное истощение", bold: true }, { text: " — исчерпание эмоциональных, физических и энергетических ресурсов." }],
          style: "ulitem",
        },
        {
          type: "none",
          text: [{ text: "Деперсонализация", bold: true }, { text: " — личностное отдаление от коллег и клиентов, нарастание негативизма." }],
          style: "ulitem",
        },
        {
          type: "none",
          text: [{ text: "Редукция личных достижений", bold: true }, { text: " — занижение собственных успехов и снижение мотивации (обратная шкала)." }],
          style: "ulitem",
        },
      ],
      margin: [0, 0, 0, 12],
    },
    {
      text: "На основе этих трёх шкал рассчитывается общий индекс психического выгорания: чем выше индекс, тем выше выраженность выгорания.",
      style: "ulitem",
      margin: [0, 0, 0, 16],
    },
    {
      text: [{ text: "Общий индекс психического выгорания", bold: true }, { text: " — суммарная оценка выгорания по всем шкалам: чем выше индекс, тем выше выраженность выгорания." }],
      style: "ulitem",
      margin: [0, 0, 0, 4],
    },
    { text: "", pageBreak: "after" },
  ];
}
