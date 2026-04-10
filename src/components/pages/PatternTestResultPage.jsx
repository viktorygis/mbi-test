import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ResultsScreen from "../Screens/ResultsScreen";
import { createMbiResults } from "../../utils/mbiHelpers";

export default function PatternTestResultPage() {
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [mbiData, setMbiData] = useState(null);
  const [mbiDataLoading, setMbiDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Эффект 1: Загружаем конфигурацию MBI (один раз при монтировании)
  useEffect(() => {
    let isMounted = true;

    const loadMbiData = async () => {
      try {
        const res = await fetch("/data/questions.json");
        const data = await res.json();
        if (isMounted) {
          setMbiData(data);
          setMbiDataLoading(false);
        }
      } catch (err) {
        console.error("Ошибка загрузки конфигурации MBI:", err);
        if (isMounted) {
          setMbiDataLoading(false);
        }
      }
    };

    loadMbiData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Эффект 2: Загрузка данных по id
  useEffect(() => {
    if (!id) {
      setResultData(null);
      setError(false);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadResultData = async () => {
      setLoading(true);
      setError(false);
      setResultData(null);

      try {
        // Пытаемся загрузить из localStorage
        const localData = localStorage.getItem(`test-result-${id}`);
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (isMounted) {
            setResultData(parsedData);
            setLoading(false);
          }
          return;
        }

        // Загружаем с сервера
        const response = await fetch(`/api/results/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        if (isMounted) {
          setResultData(data);
          setError(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Ошибка загрузки результата:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadResultData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Заглушка если данных нет
  const fallbackResultData = useMemo(() => {
    if (error && mbiData && !resultData) {
      return {
        user: {
          fullName: "Иван Иванов",
          phone: "+79998887766",
          telegram: "@ivanov",
          email: "ivan@example.com",
        },
        // "Никогда" (индекс 0) для всех 22 вопросов
        answerIndices: Array(22).fill(0),
        date: new Date().toLocaleDateString("ru-RU"),
      };
    }
    return null;
  }, [error, mbiData, resultData]);

  const displayedResultData = resultData ?? fallbackResultData;

  // Вычисляем результаты MBI
  const mbiResults = useMemo(() => {
    if (!displayedResultData || !mbiData) return null;
    try {
      const indices = Array.isArray(displayedResultData.answerIndices)
        ? displayedResultData.answerIndices
        : Array(22).fill(0);
      return createMbiResults(indices, mbiData);
    } catch (err) {
      console.error("Ошибка вычисления MBI результатов:", err);
      return null;
    }
  }, [displayedResultData, mbiData]);

  if (mbiDataLoading) {
    return <div>Загрузка конфигурации теста...</div>;
  }

  if (loading || !mbiResults) {
    return <div>Загрузка результатов...</div>;
  }

  if (!displayedResultData) {
    return <div>Данные не найдены</div>;
  }

  return (
    <ResultsScreen
      mbiResults={mbiResults}
      userData={displayedResultData.user}
      timeDisplay={
        displayedResultData.testDate ||
        displayedResultData.date ||
        new Date().toLocaleDateString("ru-RU")
      }
    />
  );
}