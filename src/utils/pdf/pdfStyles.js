// src/utils/pdf/pdfStyles.js

export const PINK = "#ff008a";
export const GRAY = "#71717a";
export const BLUE = "#007BFF";

export const docStyles = {
  bigTitle: {
    fontSize: 26,
    bold: true,
    color: PINK,
  },
  sectionTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 4],
  },
  normalTitle: {
    fontSize: 14,
    bold: true,
    margin: [0, 0, 0, 8],
  },
  subtitle: {
    fontSize: 12,
    bold: true,
    color: BLUE,
    margin: [0, 0, 0, 8],
  },
  label: {
    fontSize: 12,
    margin: [0, 0, 0, 6],
  },
  normal: {
    color: GRAY,
    fontSize: 12,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  ulitem: {
    fontSize: 12,
    margin: [0, 0, 0, 4],
  },
  faint: {
    color: GRAY,
    fontSize: 12,
    italics: true,
    margin: [0, 0, 0, 4],
  },
  pages: {
    fontSize: 10,
    color: GRAY,
  },
  // ... добавь что хочешь
};
