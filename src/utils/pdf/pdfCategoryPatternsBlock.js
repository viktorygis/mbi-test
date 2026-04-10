//расположение: src/utils/pdf/pdfCategoryPatternsBlock.js
//	pdfCategoryPatternsBlock.js - Блок категорий паттернов в PDF

//	Импортируем необходимые функции и константы
const pageWidth = 595;
//	Ширина страницы A4 в пунктах
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

//	Статистика паттернов в подкатегории по результатам пользователя
function getSubcategoryPatternStats(patternResults, subcategory) {
  const patternNames = (subcategory.patterns || []).map((p) =>
    (p.pattern?.ru || p.pattern?.en || "").trim().toLowerCase()
  );
  const counts = {};
  let total = 0;
  (patternResults || []).forEach((pat) => {
    const patNorm = (pat || "").trim().toLowerCase();
    if (patternNames.includes(patNorm)) {
      counts[patNorm] = (counts[patNorm] || 0) + 1;
      total++;
    }
  });
  const stats = {};
  patternNames.forEach((name) => {
    stats[name] =
      total > 0 ? Math.round(((counts[name] || 0) / total) * 100) : 0;
  });
  return stats;
}

//Статус паттерна в подкатегории
function getScaleStatus(stats, patterns) {
  const percents = patterns.map(
    (p) =>
      stats[(p.pattern?.ru || p.pattern?.en || "").trim().toLowerCase()] || 0
  );
  const maxIndex = percents.findIndex((percent) => percent >= 75);
  if (maxIndex !== -1) {
    const name =
      patterns[maxIndex].pattern?.ru || patterns[maxIndex].pattern?.en;
    return `ЯВНО ${name.toUpperCase()}`;
  }
  const medIndex = percents.findIndex((percent) => percent > 50);
  if (medIndex !== -1) {
    const name =
      patterns[medIndex].pattern?.ru || patterns[medIndex].pattern?.en;
    return `УМЕРЕННО ${name.toUpperCase()}`;
  }
  return "НЕЙТРАЛЬНО";
}

//	Гистограмма паттерна
function patternBar(percent, color, width = 240, height = 8) {
  return {
    canvas: [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: width,
        h: height,
        color: "#e0e0e0",
        r: 3,
      },
      {
        type: "rect",
        x: 0,
        y: 0,
        w: Math.round((percent / 100) * width),
        h: height,
        color: color,
        r: 3,
      },
    ],
    margin: [0, 2, 0, 5],
    height,
    width,
  };
}

//	Формируем блок категорий паттернов для PDF
export function pdfCategoryPatternsBlock(categories = [], patternResults = []) {
  //	Проверяем и нормализуем входные данные
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  //	Формируем содержимое блока
  const content = [
    //	Заголовок блока "Паттерны"
    { text: "Паттерны", style: "categoryTitle" },
    //	Разделительная линия
    createCenteredLine(300, 0),
    //	Отступ после линии
    { text: "", margin: [0, 20, 0, 0] },
  ];
  //	Перебираем категории паттернов
  categories.forEach((cat) => {
    //Название категории паттерна
    const catTitle = cat.title?.ru || cat.title?.en || cat.name || "";

    //Описание категории паттерна
    const catDescription = cat.description?.ru || cat.description?.en || "";

    // Название категории паттернов в PDF
    content.push({
      text: catTitle,
      style: "categoryHeader",
      margin: [0, 0, 0, 0],
    });

    // Описание категории паттернов в PDF
    if (catDescription) {
      content.push({
        text: catDescription,
        style: "categoryDescription",
      });
    }

    // Разбиваем подкатегории на две колонки
    const subcategories = cat.subcategories || [];
    const leftSubs = subcategories.filter((_, i) => i % 2 === 0);
    const rightSubs = subcategories.filter((_, i) => i % 2 === 1);

    // Функция для формирования блока подкатегории
    function renderSubcatBlock(subcat) {
      const subcatTitle =
        subcat.title?.ru || subcat.title?.en || subcat.name || "";
      const patterns = subcat.patterns || [];
      const stats = getSubcategoryPatternStats(patternResults, subcat);

      const block = [
        //Название подкатегории
        {
          text: subcatTitle,
          style: "subCategoryHeader",
        },

        //Статус паттерна в подкатегории
        {
          text: getScaleStatus(stats, patterns),
          style: "statusPattern",
        },
        ...patterns.map((pat) => {
          const name = pat.pattern?.ru || pat.pattern?.en || "";
          const percent = stats[(name || "").trim().toLowerCase()] || 0;
          const color = cat.color || "#71717a";
          return {
            stack: [
              //Название паттерна и % выроженности паттерна
              {
                columns: [
                  //Название паттерна
                  { text: name, style: "percentageText", width: "*" },
                  //% выроженности паттерна
                  {
                    text: `${percent}%`,
                    style: "percentageCell",
                    alignment: "right",
                    width: "100",
                  },
                ],
                columnGap: 8,
                margin: [0, 0, 0, 0],
              },
              //patternBar
              {
                stack: [patternBar(percent, color)],
                margin: [0, 0, 0, 4],
              },
            ],
            margin: [0, 0, 0, 2],
          };
        }),
        // --- ДОБАВЛЯЕМ ОТСТУП ПОСЛЕ ПОДКАТЕГОРИИ ---
        { text: "", margin: [0, 0, 0, 24] },
      ];
      return block;
    }

    // Формируем колонки
    const leftStack = [];
    leftSubs.forEach((subcat) => leftStack.push(...renderSubcatBlock(subcat)));
    const rightStack = [];
    rightSubs.forEach((subcat) =>
      rightStack.push(...renderSubcatBlock(subcat))
    );

    content.push({
      columns: [
        { width: "50%", stack: leftStack },
        { width: "50%", stack: rightStack },
      ],
      columnGap: 24,
      margin: [0, 0, 0, 0],
    });

    // --- ДОБАВЛЯЕМ РАЗРЫВ МЕЖДУ КАТЕГОРИЯМИ ---
    content.push({ text: "", pageBreak: "after" });
  });

  return content;
}
