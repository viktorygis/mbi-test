//App.jsx - основной компонент приложения, который отображает интерфейс и обрабатывает взаимодействия с пользователем. В этом файле мы импортируем необходимые ресурсы, такие как изображения и стили, а также используем хук useState для управления состоянием счетчика. Компонент возвращает JSX-разметку, которая включает в себя различные секции с информацией и кнопками для взаимодействия.

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//	MbiTestEntry - главная страница теста с интро, формой и вопросами
import MbiTestEntry from "./components/pages/MbiTestEntry";
//	MbiTestResultPage - страница просмотра результата по уникальному id
import MbiTestResultPage from "./components/pages/MbiTestResultPage";



function App() {
  return (
    <Routes>
      {/* Главная страница теста: интро, форма, вопросы, переход к результату */}
      <Route path="/" element={<MbiTestEntry />} />

      {/* Страница просмотра результата по уникальному id */}
      <Route path="/results/:id" element={<MbiTestResultPage />} />

      {/* Любой другой путь ведет на старт теста */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
