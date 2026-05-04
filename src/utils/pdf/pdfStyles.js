export const PINK = "#ff008a";
export const GRAY = "#71717a";
export const BLUE = "#007BFF";

export const docStyles = {
  //--- headerBlock -----------------------------
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
  mainTitle: {
    fontSize: 16,
    bold: true,
  },
  mainTitleAccent: {
    color: PINK,
    fontSize: 16,
    bold: true,
  },

  //--- resultsBlock ----------------------------

  // Сводный блок (summaryBlock)
  summaryTitleGeneral: {
    fontSize: 14,
    bold: true,
    color: GRAY,
    margin: [0, 0, 0, 2],
  },
  summaryTitle: {
    fontSize: 14,
    bold: true,
    color: GRAY,
    margin: [0, 0, 0, 2],
  },
  summaryLevel: {
    fontSize: 11,
    bold: true,
    alignment: "right",
  },
  summaryNote: {
    fontSize: 8,
    italics: true,
  },
  summaryAttentionLabel: {
    fontSize: 7,
    bold: true,
    characterSpacing: 0.8,
  },

  // Заголовок страницы 2
  pageTitle: {
    fontSize: 13,
    bold: true,
  },
  pageSubtitle: {
    fontSize: 9,
    italics: true,
    color: GRAY,
  },

  // Шкалы (coloredBlock / plainBlock)
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

  // Рекомендации
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

  // Разделитель секций
  sectionDivider: {
    fontSize: 9,
    italics: true,
  },
  //--- informationBlock ---------------------------
  //Справочная информация по шкалам и результатам
  sectionTitle: {
    fontSize: 14,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  //заголовок для метрики
  infoIconTitle: {
    fontSize: 13,
    bold: true,
    margin: [0, 4, 0, 0],
  },
  //ряд с иконкой для метрики
  infoIconRow: {
    margin: [0, 2, 0, 4],
  },
  //введение к информации по шкалам, которое идет после иконки
  infoIntro: {
    fontSize: 11,
    color: GRAY,
    margin: [0, 0, 0, 6],
  },
  //заголовок для секции внутри информации по шкалам
  infoSectionTitle: {
    fontSize: 12,
    bold: true,
    margin: [0, 6, 0, 4],
  },
  infoBullet: {
    fontSize: 11,
    color: GRAY,
  },
  infoSmallText: {
    fontSize: 10,
    color: GRAY,
    lineHeight: 1.35,
    margin: [0, 0, 0, 4],
  },
  pages: {
    fontSize: 10,
    color: GRAY,
  },
};
