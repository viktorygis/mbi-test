//server.js - простой сервер на Express для обработки API запросов от фронтенда. Он позволяет сохранять результаты тестов в памяти и предоставляет эндпоинты для получения этих результатов. Этот файл служит для имитации бэкенда, который может быть заменен на реальную базу данных или другой сервис в будущем.
import express from "express";
import pkg from "body-parser";
const { json } = pkg;

import cors from "cors";

const app = express();
const PORT = 5000;

// Для хранения результатов (в памяти, для теста)
const resultsDB = {};

app.use(cors());
app.use(json());

// Получение результата по id
app.get("/api/test-mbi/results/:id", (req, res) => {
  const { id } = req.params;
  if (resultsDB[id]) {
    res.json(resultsDB[id]);
  } else {
    res.status(404).json({ error: "Result not found" });
  }
});

// Получение всех результатов (для отладки)
app.get("/api/results", (req, res) => {
  res.json(resultsDB);
});

// Сохранение результатов теста
app.post("/api/test-mbi/submit", (req, res) => {
  const data = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 6); // генерация id
  resultsDB[id] = data;
  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`Test API server running on http://localhost:${PORT}`);
});
