//src/utils/resultsHelpers.js - ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ АНАЛИЗА РЕЗУЛЬТАТОВ ПАТТЕРНОВ

//Функции для определения типа реагирования на основе паттернов
import { determineResponseType } from "./responseTypeHelpers";

//Функция для получения ведущих паттернов среди ЯПП
import { getTopPatternsAmongYAPP } from "./topPatternsHelpers";

//	Для подкатегории: собирает статистику по паттернам (проценты)
export function getSubcategoryPatternStats(patternResults, subcategory) {
  const patternNames = (subcategory.patterns || []).map((p) =>
    (p.pattern.ru || p.pattern.en || "").trim().toLowerCase()
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

// Для гистограммы: собирает проценты по всем паттернам
export function getPatternPercentsByCategory(categories, patternResults) {
  const percents = [];
  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      const stats = getSubcategoryPatternStats(patternResults, subcat);
      (subcat.patterns || []).forEach((pat) => {
        const name = (pat.pattern?.ru || pat.pattern?.en || "").trim();
        const key = name.toLowerCase();
        if (stats[key] > 0) {
          percents.push({ name, percent: stats[key] });
        }
      });
    });
  });
  return percents;
}

//	"Сильные паттерны" (>=75%) по всем категориям getStrongPatternsByCategory
export function getStrongPatternsByCategory(
  categories,
  patternResults,
  strongThreshold = 75
) {
  return (categories || []).map((cat) => {
    const strongPatterns = [];
    (cat.subcategories || []).forEach((subcat) => {
      const stats = getSubcategoryPatternStats(patternResults, subcat);
      (subcat.patterns || []).forEach((pat) => {
        const nameRaw = pat.pattern?.ru || pat.pattern?.en || "";
        const name = nameRaw.trim().toLowerCase();
        const percent = stats[name] || 0;
        if (percent >= strongThreshold) {
          strongPatterns.push({
            name: nameRaw,
            abbr: pat.pattern?.abbreviation || "",
            percent,
            cssClass: cat.cssClass || "",
          });
        }
      });
    });
    return {
      id: cat.id,
      category: cat.title?.ru || cat.title?.en,
      titleRu: cat.title?.ru,
      titleEn: cat.title?.en,
      description: cat.description?.ru || cat.description?.en || "",
      cssClass: cat.cssClass || "",
      strongPatterns,
    };
  });
}

//	Возвращает массив имён явно выраженных паттернов (>=75%)
export function getStrongPatternNames(
  categories,
  patternResults,
  strongThreshold = 75
) {
  const strongPatternsByCategory = getStrongPatternsByCategory(
    categories,
    patternResults,
    strongThreshold
  );
  return strongPatternsByCategory.flatMap((cat) =>
    cat.strongPatterns.map((p) => p.name)
  );
}

// "Наиболее выраженная категория паттернов" - getTopCategoryByStrongPatterns
export function getTopCategoryByStrongPatterns(
  categories,
  patternResults,
  strongThreshold = 75
) {
  const strongPatternsByCategory = getStrongPatternsByCategory(
    categories,
    patternResults,
    strongThreshold
  );

  const categoryStats = strongPatternsByCategory.map((cat) => ({
    id: cat.id,
    title: cat.category,
    titleRu: cat.titleRu,
    titleEn: cat.titleEn,
    strongPatterns: cat.strongPatterns,
    count: cat.strongPatterns.length,
    percentSum: cat.strongPatterns.reduce(
      (acc, p) => acc + (p.percent || 0),
      0
    ),
  }));

  const maxCount = Math.max(...categoryStats.map((c) => c.count));
  if (maxCount === 0) return null;

  const contenders = categoryStats.filter((c) => c.count === maxCount);

  if (contenders.length === 1) {
    const top = contenders[0];
    return {
      id: top.id,
      title: top.title,
      titleRu: top.titleRu,
      titleEn: top.titleEn,
    };
  }

  const withAvg = contenders.map((c) => ({
    ...c,
    avg: c.count > 0 ? c.percentSum / c.count : 0,
  }));

  const maxAvg = Math.max(...withAvg.map((c) => c.avg));
  const topWithMaxAvg = withAvg.filter((c) => c.avg === maxAvg);

  if (topWithMaxAvg.length === 1) {
    const top = topWithMaxAvg[0];
    return {
      id: top.id,
      title: top.title,
      titleRu: top.titleRu,
      titleEn: top.titleEn,
    };
  }
  return topWithMaxAvg.map((top) => ({
    id: top.id,
    title: top.title,
    titleRu: top.titleRu,
    titleEn: top.titleEn,
  }));
}

// "Наиболее выраженная категория паттернов" - "Сообщение по паттернам" - getPatternMessage для topCategory
export function getPatternMessage({ topCategory }) {
  // Тексты для категорий паттернов
  const CATEGORY_DESCRIPTIONS = {
    "Паттерны ориентации во времени": `<span>Вы ориентированы на эффективное управление временем и ресурсами.</span> Умение планировать, расставлять приоритеты и сохранять баланс помогает достигать целей, оставаясь собранным и продуктивным.`,
    "Паттерны поведения": `<span>Ваши поведенческие стратегии</span> формируют основу вашей активности. Способность осознанно выбирать действия, адаптироваться и проявлять настойчивость помогает преодолевать трудности и достигать успеха.`,
    "Паттерны коммуникации": `<span>Ваша сильная сторона</span> — коммуникация и взаимодействие с окружающими. Вы умеете выстраивать доверительные отношения, слушать собеседника и создавать атмосферу открытости для совместной работы.`,
    "Паттерны мышления": `<span>Ваша особенность — оригинальность мышления</span> и нестандартные подходы к решению задач. Умение анализировать, видеть перспективу и генерировать идеи позволяет вам находить новые пути к результату.`,
    default: `<span>У вас проявлен комплексный профиль паттернов.</span> Такой баланс даёт гибкость для развития, помогает сочетать разные подходы, адаптироваться к переменам и находить оптимальное решение в любой ситуации.`,
  };

  // Несколько категорий
  if (Array.isArray(topCategory)) {
    const titles = topCategory.map(
      (c) => c.title || c.titleRu || c.titleEn || c
    );
    return `<h4>У вас выражены категории:</h4>
							<ul class="interpretation__pattern-list interpretation__pattern-list_multiple">
  ${titles.map((title) => `<li>${title}</li>`).join("")}
    </ul>
								Такой профиль указывает на многогранность индивидуальных особенностей и гибкость в поведении.`;
  }

  // Нет категории
  if (!topCategory) {
    return CATEGORY_DESCRIPTIONS["default"];
  }

  //catTitle - одна категория паттернов
  const catTitle =
    topCategory.title ||
    topCategory.titleRu ||
    topCategory.titleEn ||
    topCategory;
  //	Возвращаем описание категории или дефолтное
  return CATEGORY_DESCRIPTIONS[catTitle] || CATEGORY_DESCRIPTIONS["default"];
}

// "Возможности и ограничения" -  getOpportunities
export function getOpportunities({ topCategory }) {
  if (Array.isArray(topCategory)) {
    return `Ваши сильные стороны проявляются в категориях: ${topCategory
      .map((c) => c.title || c.titleRu || c.titleEn || c)
      .join(", ")}. Используйте их для развития!`;
  }
  if (topCategory) {
    return `Ваши сильные стороны проявляются в категории: ${
      topCategory && topCategory.title
    }. Используйте их для развития!`;
  }
  return "";
}

// "Сильные стороны" getStrengths
export function getStrengths({ topPatterns }) {
  if (Array.isArray(topPatterns) && topPatterns.length > 0) {
    return `Ведущие паттерны: ${topPatterns.join(
      ", "
    )} — это ваши ресурсы для развития.`;
  }
  return "";
}

// "Ваша модель поведения" getBehaviorModel
export function getBehaviorModel({ topPatterns }) {
  if (Array.isArray(topPatterns) && topPatterns.length > 0) {
    return `Ваш стиль поведения базируется на паттернах: ${topPatterns
      .slice(0, 3)
      .join(", ")}.`;
  }
  return "";
}

//Основная функция создания результатов createResultsData
export function createResultsData({ userData, categories, patternResults }) {
  const strongPatternNames = getStrongPatternNames(
    categories,
    patternResults,
    75
  );
  const responseType = determineResponseType(strongPatternNames);

  //	"Ведущие паттерны" - только среди ЯПП
  const topPatterns = getTopPatternsAmongYAPP({
    categories,
    patternResults,
    limit: 5,
    strongThreshold: 75,
    yapp: strongPatternNames,
    responseType,
  });
  const topCategory = getTopCategoryByStrongPatterns(
    categories,
    patternResults
  );
  const patternMessage = getPatternMessage({ topCategory });

  return {
    userData,
    categories,
    patternResults,
    topPatterns,
    topCategory,
    patternMessage,
    responseType,
    user: userData,
    date: new Date().toLocaleDateString("ru-RU"),
  };
}
