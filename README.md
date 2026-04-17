# Тест MBI — техническая документация

Подробное описание методики — см. [docs/METHODOLOGY.md](docs/METHODOLOGY.md).

## Технологии

| Слой | Инструменты |
|---|---|
| Фронтенд | React 19, React Router v7 |
| Сборка | Vite 8 |
| Стили | SCSS (Sass) |
| Форма | IMask (маска телефона) |
| Сервер (опционально) | Node.js, Express 5 |
| Линтер | ESLint 9 |

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone https://github.com/viktorygis/mbi-test.git
cd mbi-test
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить приложение

```bash
npm run dev
```

Приложение откроется по адресу **http://127.0.0.1:5173**.

### 4. (Опционально) Запустить API-сервер

```bash
node server.js
```

Сервер запускается на порту **5000** и обеспечивает сохранение результатов теста (в памяти, для разработки).

> Без сервера результаты сохраняются в `localStorage` браузера.

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запустить dev-сервер (Vite, порт 5173) |
| `npm run build` | Собрать продакшн-бандл в папку `dist/` |
| `npm run preview` | Предпросмотр собранного бандла |
| `npm run lint` | Запустить ESLint |

## GitHub Pages / деплой

Страница репозитория: https://viktorygis.github.io/mbi-test-build/

1. Убедитесь, что `base` в `vite.config.js` соответствует имени репозитория (например, `"/mbi-test-build/"`).
2. Убедитесь, что переменная `$img-base-path` в `src/styles/base/_variables.scss` соответствует `base` из Vite.
3. Соберите проект:

```bash
npm run build
```

4. Опубликуйте содержимое папки `dist/` в GitHub Pages (`gh-pages` или настройки репозитория).

## Структура проекта

```text
mbi-test/
├── index.html
├── vite.config.js
├── server.js
├── package.json
├── public/
│   ├── data/questions.json
│   └── img/test-mbi/
└── src/
    ├── App.jsx
    ├── components/
    │   ├── pages/
    │   ├── Screens/
    │   └── Sections/
    ├── utils/
    └── styles/
```

## Конфигурация данных опросника

Весь контент теста хранится в `public/data/questions.json`.

Ключевые поля:

- `questions` — список вопросов;
- `answerOptions` и `scores` — варианты ответов и соответствующие баллы;
- `scales` — конфигурация шкал (`items`, `maxScore`, `norms`, `interpretations`);
- `burnoutIndex` — настройки общего индекса и его нормативов.
