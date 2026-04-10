// pdfInterpretationBlock.js — Блок интерпретации результатов для PDF
//Расположение файла: src/utils/pdf/pdfInterpretationBlock.js
import { responseTypePdfDescriptions } from "./responseTypePdfDescriptions";
import { responseTypePdfOpportunities } from "./responseTypePdfOpportunities";

const pageWidth = 595; // A4

function createCenteredLine(lineWidth = 180, yPosition = 0) {
  return {
    canvas: [
      {
        type: "rect",
        x: (pageWidth - lineWidth) / 2,
        y: yPosition,
        w: lineWidth,
        h: 1,
        color: "#ff008a",
      },
    ],
    margin: [0, 0, 0, 20],
    relativePosition: { x: -50, y: 0 },
  };
}

const DEFAULT_TYPE = "Моноактивный";

/**
 * Типовая функция для защиты и fallback.
 * Приводит входящие данные к массиву строк для категорий.
 */
function getCategoryTitles(topCategory) {
  if (Array.isArray(topCategory)) {
    // Массив объектов/строк
    return topCategory.map((c) => c?.title || c?.titleRu || c?.titleEn || (typeof c === "string" ? c : "Без категории"));
  }
  if (typeof topCategory === "object" && topCategory !== null) {
    // Единственный объект
    return [topCategory.title || topCategory.titleRu || topCategory.titleEn || "Без категории"];
  }
  if (typeof topCategory === "string") {
    return [topCategory];
  }
  return ["Нет категории"];
}

/**
 * Защитная функция по аналогии dominantPatternsBlock (поддерживает always non-empty)
 */
export function pdfInterpretationBlock({ topCategory, patternMessage, topPatterns, responseType, responseTypeTexts }) {
  const safeResponseType = typeof responseType === "string" && responseType.length > 0 ? responseType : DEFAULT_TYPE;
  const rtTexts = (responseTypeTexts && typeof responseTypeTexts === "object" && responseTypeTexts[safeResponseType]) || {};

  // 1. Заголовок блока интерпретации
  const content = [
    {
      text: "Интерпретация вашего теста",
      style: "sectionTitle",
      margin: [0, 20, 0, 10],
    },
    createCenteredLine(300, 0),
    { text: "", margin: [0, 0, 0, 12] },
  ];

  // 2. Наиболее выраженная категория паттернов
  content.push({
    text: "Наиболее выраженная категория паттернов",
    style: "categoryHeader",
    margin: [0, 0, 0, 5],
  });

  // Категории:
  const titles = getCategoryTitles(topCategory);
  content.push({
    text: Array.isArray(topCategory) && titles.length > 1 ? "Несколько выраженных категорий" : titles[0] || "Нет выраженной категории паттернов",
    style: "subTitlePink",
  });
  // Описание категории
  if (Array.isArray(topCategory) && titles.length > 1) {
    content.push({
      text: "У вас выражены категории:",
      style: "categoryDescription",
      margin: [0, 0, 0, 4],
    });
    content.push({
      ul: titles.map((title) => ({
        text: title,
        //listPattern - стиль для элемента списка
        style: "listPattern",
      })),
      margin: [0, 0, 0, 8],
    });
    content.push({
      text: "Такой профиль указывает на многогранность индивидуальных особенностей и гибкость в поведении.",
      style: "categoryDescription",
      margin: [0, 0, 0, 10],
    });
  } else {
    content.push({
      text: typeof patternMessage === "string" && patternMessage.length ? patternMessage.replace(/<[^>]+>/g, "") : "Нет описания категории",
      style: "categoryDescription",
      margin: [0, 0, 0, 10],
    });
  }

  // 3. Ведущие паттерны
  content.push({
    text: "Ведущие паттерны",
    style: "categoryHeader",
    margin: [0, 10, 0, 5],
  });

  if (Array.isArray(topPatterns) && topPatterns.length > 0) {
    content.push({
      ul: topPatterns.map((p) => ({
        text: typeof p === "string" ? p : JSON.stringify(p),
        style: "listPattern",
      })),
      margin: [0, 0, 0, 8],
    });
  } else {
    content.push({
      text: "У вас не выявлено ведущих паттернов. Ваше поведение не подчинено выраженным шаблонам, что свидетельствует о гибкости и способности адаптироваться.",
      style: "categoryDescription",
      margin: [0, 0, 0, 8],
    });
  }

  // 4. Тип реагирования
  content.push({
    text: "Тип реагирования",
    style: "categoryHeader",
    margin: [0, 10, 0, 5],
  });
  content.push({
    text: safeResponseType || "Нет информации о типе",
    style: "subTitlePink",
  });

  // 5. Описание типа реагирования
  const desc = responseTypePdfDescriptions?.[safeResponseType];
  if (desc && typeof desc === "object") {
    if (Array.isArray(desc.intro) && desc.intro.length > 0) {
      desc.intro.forEach((paragraph) => {
        content.push({
          text: paragraph,
          style: "categoryDescription",
          margin: [0, 0, 0, 8],
        });
      });
    }
    // Блоки со списками
    if (Array.isArray(desc.blocks) && desc.blocks.length > 0) {
      desc.blocks.forEach((block) => {
        content.push({
          text: block.title,
          style: "categoryDescription",
          margin: [0, 6, 0, 2],
        });
        content.push({
          ul: Array.isArray(block.ul)
            ? block.ul.map((item) => ({
                text: item,
                style: "listPattern",
              }))
            : [
                {
                  text: "Нет данных",
                  style: "listPattern",
                },
              ],
          margin: [0, 0, 0, 8],
        });
      });
    }
  } else if (rtTexts.description) {
    content.push({
      text: rtTexts.description.replace(/<[^>]+>/g, ""),
      style: "categoryDescription",
      margin: [0, 0, 0, 8],
    });
  } else {
    content.push({
      text: "Нет описания для данного типа.",
      style: "categoryDescription",
      margin: [0, 0, 0, 8],
    });
  }

  // 6. Возможности и ограничения
  content.push({
    text: "Возможности и ограничения",
    style: "categoryHeader",
    margin: [0, 10, 0, 5],
  });

  const opp = responseTypePdfOpportunities?.[safeResponseType];
  if (opp && typeof opp === "object") {
    // Возможности
    content.push({
      text: "Возможности:",
      style: "categoryDescription",
      margin: [0, 6, 0, 2],
    });
    content.push({
      ul:
        Array.isArray(opp.opportunities) && opp.opportunities.length
          ? opp.opportunities.map((item) => ({
              text: item,
              style: "listPattern",
            }))
          : [
              {
                text: "Нет информации о возможностях.",
                style: "listPattern",
              },
            ],
      margin: [0, 0, 0, 8],
    });
    // Ограничения
    content.push({
      text: "Ограничения:",
      style: "categoryDescription",
      margin: [0, 6, 0, 2],
    });
    content.push({
      ul:
        Array.isArray(opp.limitations) && opp.limitations.length
          ? opp.limitations.map((item) => ({
              text: item,
              style: "listPattern",
            }))
          : [
              {
                text: "Нет информации об ограничениях.",
                style: "listPattern",
              },
            ],
      margin: [0, 0, 0, 8],
    });
  } else if (rtTexts.opportunities) {
    content.push({
      text: rtTexts.opportunities.replace(/<[^>]+>/g, ""),
      style: "categoryDescription",
      margin: [0, 0, 0, 8],
    });
  } else {
    content.push({
      text: "Нет информации о возможностях и ограничениях.",
      style: "categoryDescription",
      margin: [0, 0, 0, 8],
    });
  }

  // Разрыв страницы
  content.push({ text: "", pageBreak: "after" });

  // Для ручной проверки via браузер
  if (typeof window !== "undefined") {
    window.__pdfInterpretationBlockTest = content;
  }

  return content;
}
