// src/utils/pdf/pdfStyles.js

export const PINK = "#ff008a";
export const GRAY = "#71717a";
export const BLUE = "#007BFF";

export const docStyles = {
  //header styles  ----------------
  headerTitle: {
    fontSize: 12,
    bold: true,
    color: BLUE,
    decoration: "underline",
    margin: [0, 8, 0, 8],
  },
  headerLabel: {
    fontSize: 10,
    color: GRAY,
  },

  //Заголовок главный----------------
  mainTitle: {
    fontSize: 16,
    bold: true,
  },
  mainTitleAccent: {
    color: PINK,
    fontSize: 16,
    bold: true,
  },

  // Заголовок раздела--------------------
  sectionTitle: {
    fontSize: 14,
    bold: true,
    color: GRAY,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  // Стили для шкал ---------------
  scaleTitle: {
    fontSize: 12,
    bold: true,
    margin: [0, 2, 0, 2],
  },
  scalePercent: {
    fontSize: 10,
    color: GRAY,
  },
  scaleLabel: {
    fontSize: 10,
    bold: true,
    alignment: "right",
  },
  scalePercentLine: {
    fontSize: 8,
    color: GRAY,
  },
  // Стили для блока рекомендаций-------
  recoTitle: {
    fontSize: 11,
    margin: [0, 0, 0, 2],
    color: GRAY,
    bold: true,
  },
  recoText: {
    fontSize: 10,
    margin: [0, 0, 0, 8],
    color: GRAY,
  },

  // Стили для списков ---------------
  ulitem: {
    fontSize: 12,
    margin: [0, 0, 0, 4],
  },

  // Стили для футера ---------------
  pages: {
    fontSize: 10,
    color: GRAY,
  },
};
