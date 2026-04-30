// MbiResultPage.jsx - страница отображения результатов теста MBI, с загрузкой данных и обработкой ошибок
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import ResultsScreen from "../Screens/ResultsScreen";
import { createMbiResults } from "../../utils/mbi/mbiResults";
import { MbiDataContext } from "../../context/MbiDataContext";

// Универсальный нормализатор массива ответов
function normalizeAnswers(ans, n) {
  if (!Array.isArray(ans)) return Array(n).fill(0);
  if (ans.length > n) return ans.slice(0, n);
  if (ans.length < n) return ans.concat(Array(n - ans.length).fill(0));
  return ans;
}

export default function MbiResultPage() {
  const { id } = useParams();
  const { questions, scales, scores, burnoutIndex, loading: mbiLoading } = useContext(MbiDataContext);

  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setResultData(null);
      setError(false);
      setLoading(false);
      return;
    }
    let isMounted = true;

    async function loadResultData() {
      setLoading(true);
      setError(false);
      setResultData(null);
      try {
        const localData = localStorage.getItem(`test-result-${id}`);
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (isMounted) {
            setResultData(parsedData);
            setLoading(false);
          }
          return;
        }
        const response = await fetch(`/api/mbi-test/results/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (isMounted) {
          setResultData(data);
          setError(false);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadResultData();
    return () => { isMounted = false; };
  }, [id]);

  // Fallback для пустого результата
  const fallbackResultData = useMemo(() => {
    if (error && questions && !resultData) {
      return {
        user: { fullName: "Иван Иванов" },
        answerIndices: Array(questions.length).fill(0),
        date: new Date().toLocaleDateString("ru-RU"),
      };
    }
    return null;
  }, [error, questions, resultData]);

  const displayedResultData = resultData ?? fallbackResultData;

  const isReady =
    !mbiLoading &&
    questions &&
    Array.isArray(questions) &&
    !!scales &&
    !!scores &&
    !!burnoutIndex &&
    displayedResultData;

  const answerIndices = normalizeAnswers(
    displayedResultData?.answerIndices,
    Array.isArray(questions) ? questions.length : 22
  );
  // ✅ Извлекаем preliminaryAnswers
  const preliminaryAnswers = displayedResultData?.preliminaryAnswers ||
    displayedResultData?.user?.preliminaryAnswers || {};
  // Корректный useMemo — только вычисления, никаких setState!
  const mbiResults = useMemo(() => {
    if (
      !isReady ||
      !scales ||
      !burnoutIndex ||
      !scores ||
      !Array.isArray(answerIndices) ||
      answerIndices.length !== questions.length ||
      !scales.exhaustion ||
      !scales.depersonalization ||
      !scales.reduction
    ) {
      return null;
    }
    try {
      return createMbiResults(answerIndices, {
        scales,
        burnoutIndex,
        scores,
      });
    } catch {
      return null;
    }
  }, [isReady, scales, burnoutIndex, scores, answerIndices, questions.length]);

  if (mbiLoading) return <div>Загрузка конфигурации теста...</div>;
  if (loading) return <div>Загрузка результатов...</div>;
  if (!displayedResultData) return <div>Данные не найдены</div>;
  if (!mbiResults) return <div>Ошибка обработки результатов теста</div>;

  return (
    <ResultsScreen
      mbiResults={mbiResults}
      userData={displayedResultData.user}
      preliminaryAnswers={preliminaryAnswers}
      timeDisplay={
        displayedResultData.testDate ||
        displayedResultData.date ||
        new Date().toLocaleDateString("ru-RU")
      }
      answerIndices={answerIndices}             // ✅
      questions={questions}                     // ✅
      answerOptions={scores}
    />
  );
}