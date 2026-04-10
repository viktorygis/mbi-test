//	pdfContactsBlock.js - Блок контактов в PDF
const pageWidth = 595;
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
    margin: [0, 0, 0, 0],
    relativePosition: { x: -50, y: 0 },
  };
}

// 4 Блок — Контакты
export function pdfContactsBlock() {
  const content = [];
  // Заголовок
  content.push({
    text: [{ text: "Контакты", style: "secondTitle" }],
    margin: [0, 0, 0, 5],
  });
  content.push(createCenteredLine(300, 0));
  // Автор проекта
  content.push({
    text: [{ text: "По любым возникающим вопросам можно связаться с автором проекта Еленой Семеновой:", style: "secondText" }],
    margin: [0, 20, 0, 10],
  });
  content.push({
    text: [
      { text: "Телефон: ", style: "secondTextLink" },
      { text: "+7 916 960 1863", style: "secondLink", link: "tel:+79169601863" },
    ],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [
      { text: "Ник в телеграм: ", style: "secondTextLink" },
      { text: "@SemenovaElena", style: "secondLink", link: "https://t.me/SemenovaElena" },
    ],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [
      { text: "Email: ", style: "secondTextLink" },
      { text: "es@ai4g.ru", style: "secondLink", link: "mailto:es@ai4g.ru" },
    ],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [{ text: "www.coachsemenova.com", style: "secondLink", link: "https://coachsemenova.com/" }],
    margin: [0, 0, 0, 20],
  });
  // Администратор проекта
  content.push({
    text: [{ text: "Администратор проекта:", style: "secondText" }],
    margin: [0, 0, 0, 10],
  });
  content.push({
    text: [
      { text: "Сергей Ковальчук : ", style: "secondTextLink" },
      { text: "+7 965 753 6693", style: "secondLink", link: "tel:+79657536693" },
    ],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [
      { text: "Ник в телеграм: ", style: "secondTextLink" },
      { text: "@smkovalchuk", style: "secondLink", link: "https://t.me/smkovalchuk" },
    ],
    margin: [0, 0, 0, 20],
  });
  // Наш проект
  content.push({
    text: [{ text: "Наш проект:", style: "secondText" }],
    margin: [0, 0, 0, 10],
  });
  content.push({
    text: [{ text: "www.ai4g.ru", style: "secondLink", link: "https://ai4g.ru/" }],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [
      { text: "Email: ", style: "secondTextLink" },
      { text: "info@ai4g.ru", style: "secondLink", link: "mailto:info@ai4g.ru" },
    ],
    margin: [0, 0, 0, 5],
  });
  content.push({
    text: [
      { text: "Канал в телеграм: ", style: "secondTextLink" },
      { text: "@life_watch", style: "secondLink", link: "https://t.me/life_watch" },
    ],
    margin: [0, 0, 0, 35],
  });

  content.push({ text: "", pageBreak: "before" });
  return content;
}

// 5 Блок — Пройти тест повторно
export function pdfRepeatTestBlock() {
  const content = [];
  content.push({
    text: [{ text: "Пройти тест повторно", style: "secondTitle" }],
    margin: [0, 0, 0, 5],
  });
  content.push(createCenteredLine(300, 0));
  content.push({
    text: [
      { text: "Если у вас возникнет желание пройти тест на паттерны повторно, вы всегда можете сделать это на нашем сайте: ", style: "secondTextLink" },
      { text: "https://ai4g.ru/test-mbi", style: "secondLink", link: "https://ai4g.ru/test-mbi" },
    ],
    margin: [0, 20, 0, 10],
  });
  content.push({
    text: [
      {
        text: "Хотя набор ваших паттернов обычно остается стабильным, жизненные обстоятельства и работа над собой могут привести к изменениям в вашем внутреннем состоянии. Эти изменения могут отразиться на ваших результатах в тесте. Мы рекомендуем проводить повторное тестирование не ранее чем через 3 месяца, чтобы отслеживать изменения в ваших паттернах.",
        style: "secondTextLink",
      },
    ],
    margin: [0, 0, 0, 10],
  });
  content.push({
    text: [
      { text: "Если вы хотите порекомендовать тест своим знакомым, просто поделитесь с ними ссылкой на наш сайт: ", style: "secondTextLink" },
      { text: "https://ai4g.ru/test-mbi", style: "secondLink", link: "https://ai4g.ru/test-mbi" },
    ],
    margin: [0, 0, 0, 35],
  });
  content.push({ text: "", pageBreak: "before" });
  return content;
}

// 6 Блок — Автор проекта
export function pdfAuthorBlock() {
  const content = [];
  content.push({
    text: [{ text: "Автор проекта", style: "secondTitle" }],
    margin: [0, 0, 0, 5],
  });
  content.push(createCenteredLine(200, 0));
  content.push({
    text: [{ text: "Елена Семенова", style: "secondText", bold: true,alignment: "center"}],
    margin: [0, 20, 0, 10],
  });
  content.push({
    ul: [
      { text: "Коуч, карьерный консультант, эксперт по управлению репутацией.\n", style: "secondList" },
      {
        text: "Образование: Окончила университет по специальности биология; РАГС при Президенте РФ по специальностям психология, управление персоналом; АНХ при Правительстве РФ по направлению менеджмент.\n",
        style: "secondList",
      },
      {
        text: "Прошла профессиональную переподготовку по психодиагностике (Институт Психологии РАН), медицинской психологии (Центр им В.П. Сербского).\n",
        style: "secondList",
      },
      {
        text: "Более 30 лет экспертизы в области работы с людьми. Опыт работы в ИТ, финансах и промышленности (ЗГД по оргразвитию и персоналу, операционный директор, управляющий директор).\n",
        style: "secondList",
      },
      {
        text: "Клиенты: собственники компаний, CEO, топ-менеджеры, высшие должностные лица (первые и вторые лица муниципального и гос управления уровня мэров городов, губернаторов, министров и заместителей министров).\n",
        style: "secondList",
      },
      {
        text: "Компании: Сбербанк, Банк «Открытие», Альфа групп, Газпроммедиагрупп, Север групп, Ренова, Колмар, ПЭК, ПКБ, Первая Линия, Правительство Москвы, Татарстана, Башкирии.\n",
        style: "secondList",
      },
      { text: "Благотворительные фонды: Фонд президентских грантов, Фонд Потанина.\n", style: "secondList" },
      {
        text: "Основные места работы: Allianz, Информзащита; Газтехлизинг, Энвижн Груп (группа МТС), Ангара технологии, промышленная группа ПАО Соллерс.\n",
        style: "secondList",
      },
      { text: "Эксперт по оценке и развитию людей, сертифицирована по инструментам Hogan, Gallup и др.\n", style: "secondList" },
    ],
    margin: [10, 0, 0, 35],
  });
  content.push({ text: "", pageBreak: "before" });

  return content;
}

// 7 Блок — Описание явно проявленных паттернов
export function pdfDominantPatternsDescriptionsBlock(categories, patternResults, strongThreshold = 75) {
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  let dominantPatterns = [];
  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      (subcat.patterns || []).forEach((pat) => {
        const patName = pat.pattern?.ru || pat.pattern?.en || pat.name || "";
        const abbr = pat.pattern?.abbreviation || pat.abbreviation || "";
        const description = pat.description?.ru || pat.description?.en || "";
        const result = (patternResults || []).find(
          (r) =>
            (typeof r.name === "string" && r.name.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.ru === "string" && r.pattern.ru.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.abbreviation === "string" && r.pattern.abbreviation.trim().toLowerCase() === abbr.trim().toLowerCase()) ||
            (typeof r.abbreviation === "string" && r.abbreviation.trim().toLowerCase() === abbr.trim().toLowerCase())
        );
        const percent = result?.percent || result?.percentage || 0;
        if (percent >= strongThreshold) {
          dominantPatterns.push({
            name: patName,
            abbr: abbr,
            description,
            category: cat.title?.ru || cat.title?.en || cat.name || "",
          });
        }
      });
    });
  });

  const content = [
    {
      text: "Описание явно проявленных паттернов",
      style: "secondTitle",
      margin: [0, 0, 0, 5],
    },
    createCenteredLine(),
  ];

  if (dominantPatterns.length) {
    // Группируем по категориям
    const byCategory = {};
    dominantPatterns.forEach((pat) => {
      if (!byCategory[pat.category]) byCategory[pat.category] = [];
      byCategory[pat.category].push(pat);
    });

    Object.entries(byCategory).forEach(([cat, pats]) => {
      content.push({
        text: cat,
        style: "categoryHeader",
        margin: [0, 20, 0, 4],
      });
      pats.forEach((pat) => {
        content.push({
          text: [
            { text: pat.name + ": ", bold: true },
            pat.description && pat.description.trim().length > 0 ? pat.description : { text: "Описание отсутствует.", italics: true, color: "#aaaaaa" },
          ],
          style: "descriptionPattern",
          margin: [0, 0, 0, 8],
        });
      });
    });
  } else {
    content.push({
      text: "Нет явно проявленных паттернов.",
      style: "noQuestions",
      alignment: "center",
      margin: [0, 20, 0, 20],
    });
  }

  content.push({
    text: ["Ссылка на описание других паттернов: ", { text: "https://ai4g.ru/patterns.html", link: "https://ai4g.ru/patterns.html", color: "#007BFF" }],
    style: "secondTextLink",
    margin: [0, 16, 0, 0],
  });


  return content;
}
