# MBI Test

## Быстрый старт

```bash
git clone https://github.com/viktorygis/mbi-test.git
cd mbi-test
npm install
npm run dev
```
## Разработка

- `npm run dev` — запуск приложения локально.
- `npm run build` — сборка production-версии.
- `npm run preview` — предпросмотр сборки.
- `npm run lint` — проверка стиля кода.

- Откройте приложение: **http://localhost:5173**
- Без backend результаты сохраняются только в браузере, в `localStorage`.

## Backend

```bash
node server.js
```
Backend запускается на порту 5000 и нужен только если вы хотите сохранять данные вне браузера.


## Тестовая кнопка автозаполнения
В компоненте `QuestionsScreen` предусмотрена вспомогательная кнопка для автозаполнения ответов. Она используется только в процессе разработки для быстрого тестирования логики расчётов и отображения результатов.

Управляется через проп:
<QuestionsScreen showTestFillButton={true} />


## Деплой
- Готовая сборка: [viktorygis.github.io/mbi-test-build/](https://viktorygis.github.io/mbi-test-build/).
- Для деплоя измените `base` в `vite.config.js` и путь к изображениям в SCSS-переменной `$img-base-path`.

src\styles\base\_variables.scss
// для деплоя на GitHub Pages
$img-base-path: "/mbi-test-build/";

- После `npm run build` загрузите содержимое папки `dist/` в свой хостинг или GitHub Pages.
