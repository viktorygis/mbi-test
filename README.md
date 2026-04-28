# Тест MBI — техническая документация

Подробное описание методики — см. [docs/METHODOLOGY.md](docs/METHODOLOGY.md).

---

## Быстрый старт и основные команды

```bash
# Клонирование репозитория
git clone https://github.com/viktorygis/mbi-test.git
cd mbi-test

# Установка зависимостей
npm install

# Запуск приложения (Vite dev-сервер, порт 5173)
npm run dev

# Сборка продакшн-версии (директория dist/)
npm run build

# Предпросмотр собранного бандла
npm run preview

# Проверка кода линтером
npm run lint

# (Опционально) Запуск API-сервера (порт 5000, Node.js/Express)
node server.js
```

- Приложение откроется по адресу **http://127.0.0.1:5173**
- > Без сервера результаты сохраняются в `localStorage` браузера. Сервер используется для сохранения результатов в памяти (только для разработки).

---

## Структура проекта

```text
mbi-test/
├── index.html
├── vite.config.js
├── server.js
├── package.json
├── public/
│   ├── data/questions.json
│   └── img/mbi-test/
└── src/
    ├── App.jsx
    ├── components/
    │   ├── pages/
    │   ├── Screens/
    │   └── Sections/
    ├── utils/
    └── styles/
```

---

## Технологии и инструменты

| Слой             | Инструменты                                       |
|------------------|--------------------------------------------------|
| Язык             | JavaScript (68%), SCSS (30%), CSS, HTML          |
| Фронтенд         | React 19, React Router v7                        |
| Сборка           | Vite 8                                           |
| Стили            | SCSS (Sass)                                      |
| Форма            | IMask (маска телефона)                           |
| Сервер           | Node.js, Express 5 *(опционально)*               |
| Линтер           | ESLint 9                                         |
| pdf              | pdfmake 0.3.7                                      |

---

## GitHub Pages / Деплой

- Репозиторий на GitHub Pages: https://viktorygis.github.io/mbi-test-build/

Инструкция:

1. Убедитесь, что значение `base` в `vite.config.js` совпадает с адресом репозитория, например: `"/mbi-test-build/"`.
2. Проверьте, что переменная `$img-base-path` в `src/styles/base/_variables.scss` соответствует вашему `base`.
3. Выполните сборку:

   ```bash
   npm run build
   ```

4. Опубликуйте содержимое папки `dist/` на GitHub Pages (через ветку `gh-pages` или раздел Pages в настройках GitHub).

---

## Конфигурация данных опросника

- Весь контент теста хранится в файле: `public/data/questions.json`

**Ключевые поля:**

- `questions` — список вопросов
- `answerOptions` и `scores` — варианты ответов и соответствующие баллы
- `scales` — конфигурация шкал (`items`, `maxScore`, `norms`, `interpretations`)
- `burnoutIndex` — настройки общего индекса и его нормативов

---

> Для подробностей смотрите методическое руководство и комментарии в соответствующих файлах проекта.