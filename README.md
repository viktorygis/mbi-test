# React + Vite

## Запуск проекта:

```bash
npm install
npm run dev
```
## Запустите сервер в другом терминале(если нужен API)

```bash
node server.js
```

## Структура проекта:

```.
├── index.html
├── package.json
├── README.md
├── src
│   ├── App.jsx - главный компонент приложения
│   ├── index.jsx
│   └── styles.css

├── .gitignore
├── node_modules
├── package-lock.json
└── vite.config.js
```

## GitHub Pages
Для корректного отображения при деплое на GitHub Pages, необходимо указать имя репозитория в строке base в файле vite.config.js.
test-mbi-build - имя репозитория на гитхабе, нужно указать в vite.config.js в строке base: "/test-mbi-build/"
