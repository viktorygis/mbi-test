//App.jsx - основной компонент приложения, который отображает интерфейс и обрабатывает взаимодействия с пользователем. В этом файле мы импортируем необходимые ресурсы, такие как изображения и стили, а также используем хук useState для управления состоянием счетчика. Компонент возвращает JSX-разметку, которая включает в себя различные секции с информацией и кнопками для взаимодействия.

import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
//	MbiEntryPage - главная страница теста с интро, формой и вопросами
import MbiEntryPage from "./components/pages/MbiEntryPage";
//	MbiResultPage - страница просмотра результата по уникальному id
import MbiResultPage from "./components/pages/MbiResultPage";

// Редирект с /results/:id → /mbi-result/:id для обратной совместимости
function ResultsRedirect() {
  const { id } = useParams();
  return <Navigate to={`/mbi-result/${id}`} replace />;
}

import { MbiDataContext } from "./context/MbiDataContext";
import { useMbiData } from "./hooks/useMbiData.js";

function App() {
  const mbi = useMbiData();
  if (mbi.loading) return <div>Загрузка…</div>;
  return (
    <MbiDataContext.Provider value={mbi}>

      <Routes>
        {/* Главная страница теста: интро, форма, вопросы, переход к результату */}
        <Route path="/" element={<MbiEntryPage />} />

        {/* Страница просмотра результата по уникальному id */}
        <Route path="/mbi-result/:id" element={<MbiResultPage />} />

        {/* Обратная совместимость: старые маршруты перенаправляют на новые */}
        <Route path="/results/:id" element={<ResultsRedirect />} />

        {/* Любой другой путь ведет на старт теста */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MbiDataContext.Provider>

  );
}

export default App;
