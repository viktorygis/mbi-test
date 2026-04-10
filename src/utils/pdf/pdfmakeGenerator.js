// Расположение файла: src/utils/pdf/pdfmakeGenerator.js

// pdfmakeGenerator.js - Генератор PDF с использованием pdfMake
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";



import logoBase64 from "./logo";
import { pdfIntroBlock } from "./pdfIntroBlock";
// Импорт блоков для PDF
import { pdfDominantPatternsBlock } from "./pdfDominantPatternsBlock";
import { pdfCategoryPatternsBlock } from "./pdfCategoryPatternsBlock";
import { pdfContactsBlock, pdfRepeatTestBlock, pdfAuthorBlock, pdfDominantPatternsDescriptionsBlock } from "./pdfContactsBlock";
// Импорт вспомогательной функции для получения процентов по категориям
import { getPatternPercentsByCategory } from "../../utils/resultsHelpers";
// Импорт стилей для PDF документа
import pdfmakeStyles from "./pdfmakeStyles";
// Импорт блока интерпретации результатов теста для PDF
import { pdfInterpretationBlock } from "./pdfInterpretationBlock";

// Установка шрифтов для pdfMake
pdfMake.virtualfs = pdfFonts;

// Вспомогательная функция для форматирования даты
function formatDate(dateString) {
  if (!dateString) return "";
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return dateString;
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Вспомогательная функция для получения фамилии (или ФИО)
function getLastName(fullName) {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  // Если передана только фамилия, берем ее; если ФИО — берем первую часть (фамилию)
  return names[0];
}

// Функция для скачивания PDF с результатами теста
// Принимает объект resultsData с данными результатов теста
// Создает документ PDF с помощью pdfMake и скачивает его
export function downloadPDF(resultsData) {
  if (!resultsData) {
    alert("Нет данных для создания PDF!");
    return;
  }

  const dominantPatternResults = getPatternPercentsByCategory(resultsData.categories, resultsData.patternResults);

  const docDefinition = {
    content: [
      ...pdfIntroBlock(resultsData, logoBase64),
      ...pdfDominantPatternsBlock(
        resultsData.categories,
        dominantPatternResults,
        75, // strongThreshold (можно не указывать, если хотите значение по умолчанию)
        resultsData.responseType, // четвёртый параметр – тип реагирования
      ),
      ...pdfInterpretationBlock({
        topCategory: resultsData.topCategory,
        patternMessage: resultsData.patternMessage,
        topPatterns: resultsData.topPatterns,
        responseType: resultsData.responseType,
        responseTypeTexts: resultsData.responseTypeTexts,
        opportunities: resultsData.opportunities,
        behaviorModel: resultsData.behaviorModel,
        strengths: resultsData.strengths,
      }),
      ...pdfCategoryPatternsBlock(resultsData.categories, resultsData.patternResults),
      ...pdfContactsBlock(),
      ...pdfRepeatTestBlock(),
      ...pdfAuthorBlock(),
      ...pdfDominantPatternsDescriptionsBlock(resultsData.categories, dominantPatternResults),
    ],
    styles: pdfmakeStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}`,
      alignment: "center",
      margin: [0, 10],
      style: "pages",
    }),
    pageMargins: [40, 60, 40, 60],
  };

  // Получение фамилии и даты для имени файла
  const userFullName = resultsData?.user?.fullName || resultsData?.userData?.fullName || "";
  const testDate = resultsData?.date || "";
  const lastName = getLastName(userFullName) || "Results";
  const formattedDate = formatDate(testDate) || "";
  const fileName = `${lastName}_${formattedDate}_PT.pdf`;

  // Скачивание pdf с нужным именем файла
  pdfMake.default.createPdf(docDefinition).download(fileName);
}

// Функция для генерации документа PDF с результатами теста
// Принимает объект resultsData с данными результатов теста
// Возвращает объект с определением документа для pdfMake
if (typeof window !== "undefined") {
  window.generateDocDefinition = (resultsData) => {
    const dominantPatternResults = getPatternPercentsByCategory(resultsData.categories, resultsData.patternResults);

    return {
      content: [
        ...pdfIntroBlock(resultsData, logoBase64),
        ...pdfDominantPatternsBlock(
          resultsData.categories,
          dominantPatternResults,
          75,
          resultsData.responseType, // добавлен четвёртый параметр
        ),
        ...pdfCategoryPatternsBlock(resultsData.categories, resultsData.patternResults),
        ...pdfContactsBlock(),
        ...pdfRepeatTestBlock(),
        ...pdfAuthorBlock(),
        ...pdfDominantPatternsDescriptionsBlock(resultsData.categories, dominantPatternResults),
      ],
      styles: pdfmakeStyles,
      footer: (currentPage, pageCount) => ({
        text: `Страница ${currentPage} из ${pageCount}`,
        alignment: "center",
        margin: [0, 10],
        style: "pages",
      }),
      pageMargins: [40, 80, 40, 60],
    };
  };
}
