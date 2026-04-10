// src/utils/pdf/mbiPdfGenerator.js
// Генератор PDF-отчёта по результатам теста MBI (Маслач-Джексон)

import logoBase64 from './logo';

// ─── Цвета ────────────────────────────────────────────────────────────────────
const PINK = '#ff008a';
const GRAY = '#71717a';
const BLUE = '#007BFF';

const LEVEL_COLORS = {
  'Крайне низкое':  '#22c55e',
  'Низкое':         '#86efac',
  'Среднее':        '#facc15',
  'Высокое':        '#f97316',
  'Крайне высокое': '#ef4444',
};

function levelColor(label) {
  return LEVEL_COLORS[label] || '#555555';
}

// ─── Вспомогательные утилиты ──────────────────────────────────────────────────

function formatDate(raw) {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function getLastName(fullName) {
  if (!fullName) return 'Results';
  return fullName.trim().split(' ')[0] || 'Results';
}

function centerLine(widthPx = 300) {
  return {
    canvas: [{ type: 'rect', x: 0, y: 0, w: widthPx, h: 2, color: PINK }],
    margin: [0, 0, 0, 12],
  };
}

function barRow(score, maxScore, color = PINK) {
  const filled = maxScore > 0 ? Math.round((score / maxScore) * 515) : 0;
  const empty = 515 - filled;
  return {
    canvas: [
      { type: 'rect', x: 0, y: 0, w: filled, h: 10, r: 3, color },
      { type: 'rect', x: filled, y: 0, w: empty, h: 10, r: 3, color: '#e5e7eb' },
    ],
    margin: [0, 4, 0, 8],
  };
}

// ─── Блок 1: Шапка ────────────────────────────────────────────────────────────

function headerBlock(userData, timeDisplay) {
  const fullName = userData?.fullName || '';
  const date = formatDate(userData?.date) || timeDisplay || '';

  return [
    {
      columns: [
        {
          text: 'www.ai4g.ru',
          link: 'https://ai4g.ru/',
          color: BLUE,
          fontSize: 13,
          decoration: 'underline',
          bold: true,
          margin: [0, 8, 0, 0],
        },
        {
          image: logoBase64,
          width: 90,
          height: 36,
          alignment: 'center',
        },
        {
          text: 'Пройти тест ещё раз',
          link: 'https://ai4g.ru/test-mbi',
          color: BLUE,
          fontSize: 13,
          decoration: 'underline',
          alignment: 'right',
          margin: [0, 8, 0, 0],
        },
      ],
      margin: [0, 0, 0, 8],
    },
    { canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, color: PINK }], margin: [0, 0, 0, 10] },
    {
      columns: [
        { text: fullName ? `ФИО: ${fullName}` : '', fontSize: 12, alignment: 'left' },
        { text: date ? `Дата: ${date}` : '', fontSize: 12, alignment: 'right' },
      ],
      margin: [0, 0, 0, 6],
    },
    {
      text: [
        { text: 'MBI ', color: PINK, fontSize: 26, bold: true },
        { text: 'Тест Маслач-Джексон', fontSize: 22, bold: true },
      ],
      alignment: 'center',
      margin: [0, 40, 0, 10],
    },
    {
      text: 'Опросник на определение уровня профессионального выгорания',
      fontSize: 14,
      alignment: 'center',
      color: GRAY,
      margin: [0, 0, 0, 8],
    },
    {
      text: 'Авторы: К. Маслач, С. Джексон | Адаптация: Н.Е. Водопьянова',
      fontSize: 11,
      alignment: 'center',
      color: GRAY,
      margin: [0, 0, 0, 20],
    },
    {
      text: 'Что измеряет тест',
      fontSize: 14,
      bold: true,
      margin: [0, 0, 0, 6],
    },
    {
      ul: [
        { text: 'Психоэмоциональное истощение — исчерпание эмоциональных, физических и энергетических ресурсов.', fontSize: 12, margin: [0, 0, 0, 4] },
        { text: 'Деперсонализация — личностное отдаление от коллег и клиентов, нарастание негативизма.', fontSize: 12, margin: [0, 0, 0, 4] },
        { text: 'Редукция личных достижений — занижение собственных успехов и снижение мотивации (обратная шкала).', fontSize: 12, margin: [0, 0, 0, 4] },
      ],
      margin: [0, 0, 0, 12],
    },
    { text: '', pageBreak: 'after' },
  ];
}

// ─── Блок 2: Результаты по шкалам ────────────────────────────────────────────

function scaleBlock(title, score, maxScore, level, description, invertedNote) {
  const color = levelColor(level);
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  const rows = [
    {
      columns: [
        { text: title, fontSize: 14, bold: true },
        {
          text: level,
          fontSize: 12,
          bold: true,
          color,
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 2],
    },
    {
      text: `${score} баллов из ${maxScore} (${percent}%)`,
      fontSize: 11,
      color: GRAY,
      margin: [0, 0, 0, 2],
    },
    barRow(score, maxScore, color),
  ];

  if (description) {
    rows.push({ text: description, fontSize: 11, color: GRAY, margin: [0, 0, 0, 4] });
  }
  if (invertedNote) {
    rows.push({
      text: `⚠ ${invertedNote}`,
      fontSize: 10,
      color: '#9a3412',
      italics: true,
      margin: [0, 0, 0, 4],
    });
  }

  return rows;
}

function normsTable(title, norms, currentScore) {
  return {
    margin: [0, 8, 0, 0],
    table: {
      widths: ['*', 'auto'],
      body: [
        [
          { text: `Нормы: ${title}`, style: 'tableHeader', colSpan: 2, alignment: 'center' },
          {},
        ],
        ...norms.map((n) => {
          const isActive = currentScore >= n.min && currentScore <= n.max;
          return [
            {
              text: n.label,
              fontSize: 10,
              bold: isActive,
              fillColor: isActive ? '#fce7f3' : null,
            },
            {
              text: `${n.min}–${n.max}`,
              fontSize: 10,
              bold: isActive,
              alignment: 'center',
              fillColor: isActive ? '#fce7f3' : null,
            },
          ];
        }),
      ],
    },
    layout: 'lightHorizontalLines',
  };
}

function resultsBlock(mbiResults) {
  const { scores, levels, burnoutIndex, burnoutLevel, scales, burnoutConfig } = mbiResults;

  const content = [
    { text: 'Результаты тестирования', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 4] },
    centerLine(400),

    // Истощение
    ...scaleBlock(
      scales.exhaustion.title,
      scores.exhaustion,
      scales.exhaustion.maxScore,
      levels.exhaustion,
      scales.exhaustion.description,
    ),

    // Деперсонализация
    ...scaleBlock(
      scales.depersonalization.title,
      scores.depersonalization,
      scales.depersonalization.maxScore,
      levels.depersonalization,
      scales.depersonalization.description,
    ),

    // Редукция
    ...scaleBlock(
      scales.reduction.title,
      scores.reduction,
      scales.reduction.maxScore,
      levels.reduction,
      scales.reduction.description,
      'По данной шкале интерпретация обратная: чем ниже балл — тем выше выгорание.',
    ),

    // Общий индекс
    { canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 1, color: '#e5e7eb' }], margin: [0, 8, 0, 8] },
    {
      columns: [
        { text: 'Общий индекс психического выгорания', fontSize: 14, bold: true },
        {
          text: burnoutLevel,
          fontSize: 12,
          bold: true,
          color: levelColor(burnoutLevel),
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 2],
    },
    {
      text: `${burnoutIndex} баллов из ${burnoutConfig.maxScore} (${burnoutConfig.maxScore > 0 ? Math.round((burnoutIndex / burnoutConfig.maxScore) * 100) : 0}%)`,
      fontSize: 11,
      color: GRAY,
      margin: [0, 0, 0, 2],
    },
    barRow(burnoutIndex, burnoutConfig.maxScore, levelColor(burnoutLevel)),
    burnoutConfig.description
      ? { text: burnoutConfig.description, fontSize: 11, color: GRAY, margin: [0, 0, 0, 8] }
      : {},

    { text: '', pageBreak: 'after' },
  ];

  return content;
}

// ─── Блок 3: Таблицы норм ─────────────────────────────────────────────────────

function normsPageBlock(mbiResults) {
  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;
  return [
    { text: 'Нормативные диапазоны', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 4] },
    centerLine(400),
    {
      columns: [
        normsTable(scales.exhaustion.title, scales.exhaustion.norms, scores.exhaustion),
        normsTable(scales.depersonalization.title, scales.depersonalization.norms, scores.depersonalization),
      ],
      columnGap: 20,
      margin: [0, 0, 0, 16],
    },
    {
      columns: [
        normsTable(`${scales.reduction.title} (обратная шкала)`, scales.reduction.norms, scores.reduction),
        normsTable('Общий индекс психического выгорания', burnoutConfig.norms, burnoutIndex),
      ],
      columnGap: 20,
      margin: [0, 0, 0, 16],
    },
    {
      text: '* Выделенная строка соответствует вашему результату.',
      fontSize: 10,
      color: GRAY,
      italics: true,
      margin: [0, 0, 0, 8],
    },
    { text: '', pageBreak: 'after' },
  ];
}

// ─── Блок 4: Контакты ─────────────────────────────────────────────────────────

function contactsBlock() {
  return [
    { text: 'Контакты', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 4] },
    centerLine(300),
    {
      text: 'По любым вопросам вы можете обратиться к автору проекта Елене Семеновой:',
      fontSize: 12,
      margin: [0, 16, 0, 8],
    },
    { text: [{ text: 'Телефон: ', fontSize: 12 }, { text: '+7 916 960 1863', fontSize: 12, color: BLUE, link: 'tel:+79169601863' }], margin: [0, 0, 0, 4] },
    { text: [{ text: 'Telegram: ', fontSize: 12 }, { text: '@SemenovaElena', fontSize: 12, color: BLUE, link: 'https://t.me/SemenovaElena' }], margin: [0, 0, 0, 4] },
    { text: [{ text: 'Email: ', fontSize: 12 }, { text: 'es@ai4g.ru', fontSize: 12, color: BLUE, link: 'mailto:es@ai4g.ru' }], margin: [0, 0, 0, 4] },
    { text: [{ text: 'Сайт: ', fontSize: 12 }, { text: 'www.coachsemenova.com', fontSize: 12, color: BLUE, link: 'https://coachsemenova.com/' }], margin: [0, 0, 0, 16] },
    { text: 'Наш проект AI4G:', fontSize: 12, bold: true, margin: [0, 0, 0, 4] },
    { text: [{ text: 'Сайт: ', fontSize: 12 }, { text: 'www.ai4g.ru', fontSize: 12, color: BLUE, link: 'https://ai4g.ru/' }], margin: [0, 0, 0, 4] },
    { text: [{ text: 'Email: ', fontSize: 12 }, { text: 'info@ai4g.ru', fontSize: 12, color: BLUE, link: 'mailto:info@ai4g.ru' }], margin: [0, 0, 0, 4] },
    { text: [{ text: 'Telegram-канал: ', fontSize: 12 }, { text: '@life_watch', fontSize: 12, color: BLUE, link: 'https://t.me/life_watch' }], margin: [0, 0, 0, 4] },
    { canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 1, color: '#e5e7eb' }], margin: [0, 16, 0, 12] },
    {
      text: 'Источники методики',
      fontSize: 12,
      bold: true,
      margin: [0, 0, 0, 6],
    },
    {
      ol: [
        { text: 'Фетискин Н.П., Козлов В.В., Мануйлов Г.М. Социально-психологическая диагностика развития личности и малых групп. — М., 2002. С. 360–362.', fontSize: 10, margin: [0, 0, 0, 4] },
        { text: 'Maslach C., Jackson S.E. The measurement of experienced burnout // Journal of Occupational Behaviour. — 1981. — Vol. 2. — P. 99–113.', fontSize: 10, margin: [0, 0, 0, 4] },
        { text: 'Водопьянова Н.Е., Старченкова Е.С. Синдром выгорания: диагностика и профилактика. — СПб.: Питер, 2005.', fontSize: 10, margin: [0, 0, 0, 4] },
      ],
    },
  ];
}

// ─── Стили документа ──────────────────────────────────────────────────────────

const docStyles = {
  tableHeader: {
    fontSize: 11,
    bold: true,
    fillColor: '#fdf2f8',
  },
  pages: {
    fontSize: 10,
    color: GRAY,
  },
};

// ─── Основная функция скачивания PDF ──────────────────────────────────────────

export async function downloadMbiPDF(mbiResults, userData, timeDisplay) {
  if (!mbiResults) {
    alert('Нет данных для создания PDF!');
    return;
  }

  // Динамический импорт позволяет избежать проблем с ESM-namespace
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ]);
  // pdfmake 0.3.x использует addVirtualFileSystem() вместо прямого присвоения .vfs
  pdfMake.addVirtualFileSystem(pdfFonts.pdfMake?.vfs ?? pdfFonts);

  const docDefinition = {
    content: [
      ...headerBlock(userData, timeDisplay),
      ...resultsBlock(mbiResults),
      ...normsPageBlock(mbiResults),
      ...contactsBlock(),
    ],
    styles: docStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}   |   ai4g.ru`,
      alignment: 'center',
      margin: [0, 10],
      style: 'pages',
    }),
    pageMargins: [40, 60, 40, 60],
  };

  const fullName = userData?.fullName || '';
  const date = userData?.date ? formatDate(userData.date) : '';
  const lastName = getLastName(fullName);
  const fileName = `${lastName}${date ? '_' + date : ''}_MBI.pdf`;

  pdfMake.createPdf(docDefinition).download(fileName);
}
