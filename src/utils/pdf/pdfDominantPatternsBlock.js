import { determineResponseType } from "../responseTypeHelpers";

const pageWidth = 595; // A4

const responseTypesList = [
  { value: "Моноактивный", label: "Моноактивный" },
  { value: "Мультиактивный", label: "Мультиактивный" },
  { value: "Реактивный", label: "Реактивный" },
  { value: "Смешанный", label: "Смешанный" },
  { value: "Не определён", label: "Не определён" },
];
const responseTypesColors = {
  Моноактивный: "#3d025e",
  Мультиактивный: "#3d025e",
  Реактивный: "#3d025e",
  Смешанный: "3d025e",
  "Не определён": "#3d025e",
};

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

// getManifestationLevelText - функция для генерации текста о уровне проявленности паттернов
function getManifestationLevelText(strongPatternsCount, strongThreshold) {
  if (strongPatternsCount >= 1 && strongPatternsCount <= 4) {
    return [
      { text: `У вас выявлено `, style: "dominantInfoText" },
      { text: `${strongPatternsCount}`, style: "dominantInfoCount" },
      { text: " явно проявленных паттернов, что относится к ", style: "dominantInfoText" },
      { text: "умеренному уровню проявленности", style: "dominantInfoHighlight" },
      { text: ". Это значит, что в вашем поведении присутствует влияние шаблонов, но они не являются определяющими.", style: "dominantInfoText" },
    ];
  }
  if (strongPatternsCount >= 5 && strongPatternsCount <= 7) {
    return [
      { text: `У вас выявлено `, style: "dominantInfoText" },
      { text: `${strongPatternsCount}`, style: "dominantInfoCount" },
      { text: " явно проявленных паттернов, что относится к ", style: "dominantInfoText" },
      { text: "среднему уровню проявленности", style: "dominantInfoHighlight" },
      { text: ". Это значит, что шаблоны поведения начинают играть заметную роль, однако ваше поведение остаётся достаточно гибким.", style: "dominantInfoText" },
    ];
  }
  if (strongPatternsCount >= 8) {
    return [
      { text: `У вас выявлено `, style: "dominantInfoText" },
      { text: `${strongPatternsCount}`, style: "dominantInfoCount" },
      { text: " явно проявленных паттернов, что относится к ", style: "dominantInfoText" },
      { text: "высокому уровню проявленности", style: "dominantInfoHighlight" },
      { text: ". Это значит, что шаблоны поведения максимально выражены и оказывают существенное влияние на ваши решения.", style: "dominantInfoText" },
    ];
  }
  return [
    {
      text: `В вашем профиле не выявлено явно проявленных паттернов (выраженных более чем на ${strongThreshold}%). Это значит, что ваше поведение достаточно гибкое и не ограничено жёсткими шаблонами.`,
      style: "dominantInfoText",
    },
  ];
}

// pdfDominantPatternsBlock - главная функция для генерации блока "Явно проявленные паттерны" в PDF
export function pdfDominantPatternsBlock(
  categories,
  patternResults,
  strongThreshold = 75,
  responseType,
  highlightCategoryIds = []
) {
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  // --- 1. Собираем ЯПП напрямую ---
  const yappSet = new Set();
  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      (subcat.patterns || []).forEach((pat) => {
        const patName = pat.pattern?.ru || pat.pattern?.en || pat.name || "";
        // Ищем результат для этого паттерна в оригинальном patternResults
        const result = (patternResults || []).find(
          (r) =>
            (typeof r.name === "string" && r.name.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.ru === "string" && r.pattern.ru.trim().toLowerCase() === patName.trim().toLowerCase())
        );
        const percent = result?.percent || result?.percentage || 0;
        if (percent >= strongThreshold) {
          yappSet.add(patName.trim().toLowerCase());
        }
      });
    });
  });

  const yapp = Array.from(yappSet);

  // --- 2. Определяем тип реагирования ---
  const safeResponseType =
    typeof responseType === "string" && responseType.length > 0
      ? responseType
      : determineResponseType(yapp);

  // --- 3. Формируем dominantPatterns (для отображения столбиков) ---
  let dominantPatterns = [];
  let usedCategoryIds = new Set();

  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      (subcat.patterns || []).forEach((pat) => {
        const patName = pat.pattern?.ru || pat.pattern?.en || pat.name || "";
        const abbr = pat.pattern?.abbreviation || pat.abbreviation || "";
        const result = (patternResults || []).find(
          (r) =>
            (typeof r.name === "string" && r.name.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.ru === "string" && r.pattern.ru.trim().toLowerCase() === patName.trim().toLowerCase())
        );
        const percent = result?.percent || result?.percentage || 0;
        if (percent >= strongThreshold) {
          dominantPatterns.push({
            name: patName,
            abbr: abbr,
            percent,
            color: cat.color || "#71717a",
            category: cat.title?.ru || cat.title?.en || cat.name || "",
            categoryId: cat.id,
          });
          usedCategoryIds.add(cat.id);
        }
      });
    });
  });

  const uniqueCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.title?.ru || cat.title?.en || cat.name || "",
    color: cat.color || "#cccccc",
    benefit: cat.benefit?.ru || cat.benefit?.en || "",
  }));

  const patternsList = dominantPatterns.map((item) => ({
    text: `${item.abbr}: ${item.name}`,
    style: "abbreviationLabel",
  }));

  const categoriesList = uniqueCategories.map((cat) => ({
    columns: [
      {
        width: 10,
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 1,
            w: 10,
            h: 10,
            color: cat.color,
          },
        ],
      },
      {
        width: "*",
        stack: [
          {
            text: cat.name,
            style: "categoryShortLabel",
            margin: [10, 0, 0, 0],
          },
          { text: cat.benefit, style: "benefitLabel", margin: [10, 0, 0, 8] },
        ],
      },
    ],
    margin: [0, 0, 0, 2],
    columnGap: 0,
    layout: "noBorders",
  }));

  const content = [
    {
      text: "Явно проявленные паттерны",
      style: "dominantTitle",
      margin: [0, 0, 0, 5],
    },
    createCenteredLine(300, 0),
    { text: "", margin: [0, 0, 0, 12] },
  ];

  const strongPatternsCount = dominantPatterns.length;
  content.push({
    text: getManifestationLevelText(strongPatternsCount, strongThreshold),
    style: "dominantInfoBlock",
    margin: [0, 0, 0, 24],
  });

  if (dominantPatterns.length) {
    const dominantPatternsColumns = dominantPatterns.map((pat) => {
      const highlight = highlightCategoryIds.includes(String(pat.categoryId)); // Рамка, если категория в списке топовых
      return {
        stack: [
          {
            text: `${pat.percent}%`,
            alignment: "center",
            margin: [0, 0, 0, 2],
            fontSize: 12,
            color: pat.percent === 100 ? "#03d666" : "#000",
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 8,
                h: 90,
                color: "#e0e0e0",
                r: 5,
              },
              {
                type: "rect",
                x: 0,
                y: 90 - Math.round((pat.percent / 100) * 90),
                w: 8,
                h: Math.round((pat.percent / 100) * 90),
                color: pat.color,
                r: 5,
              },
              // === Обводка топовой категории ===
              ...(highlight
                ? [
                    {
                      type: "rect",
                      x: -2,
                      y: -2,
                      w: 12,
                      h: 94,
                      lineColor: "#FF008A",
                      lineWidth: 2,
                      color: "transparent",
                      r: 7,
                    },
                  ]
                : []),
            ],
            margin: [0, 0, 0, 2],
            height: 90,
            width: 8,
            alignment: "center",
          },
          {
            text: pat.abbr,
            alignment: "center",
            margin: [0, 2, 0, 0],
            fontSize: 12,
            color: "#505050",
          },
        ],
        margin: [0, 0, 0, 5],
      };
    });

    content.push({
      columns: dominantPatternsColumns,
      columnGap: 8,
    });

    content.push({
      text: "Тип реагирования",
      style: "categoryHeader",
      margin: [0, 20, 0, 10],
    });

    const activeIdx = responseTypesList.findIndex(
      (t) => t.value.toLowerCase() === safeResponseType.toLowerCase()
    );

    content.push({
      columns: responseTypesList.map((type, idx) => ({
        stack: [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 60,
                h: 14,
                color: idx === activeIdx
                  ? responseTypesColors[type.value] || "#ff008a"
                  : "#e0e0e0",
                r: 7,
              },
            ],
            width: 60,
            height: 14,
            alignment: "center",
          },
          {
            text: type.label,
            alignment: "center",
            margin: [0, 4, 0, 0],
            fontSize: 10,
            color: idx === activeIdx
              ? responseTypesColors[type.value] || "#ff008a"
              : "#aaaaaa",
          },
        ],
        margin: [0, 0, 0, 0],
      })),
      columnGap: 12,
      margin: [0, 0, 0, 22],
    });

    content.push({
      text: "Условные обозначения",
      style: "dominantSubTitle",
      margin: [0, 20, 0, 10],
    });

    content.push({
      columns: [
        { width: "50%", stack: patternsList },
        { width: "50%", stack: categoriesList },
      ],
      columnGap: 32,
      margin: [0, 0, 0, 16],
    });
  } else {
    content.push({
      text: "Нет явно проявленных паттернов",
      style: "noQuestions",
      alignment: "center",
      margin: [0, 20, 0, 20],
    });
  }

  content.push({ text: "", pageBreak: "after" });
  return content;
}