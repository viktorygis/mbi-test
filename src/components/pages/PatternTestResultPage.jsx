import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ResultsScreen from "../Screens/ResultsScreen";
import {
  createResultsData,
  getPatternMessage,
  getOpportunities,
  getBehaviorModel,
  getStrengths
} from "../../utils/resultsHelpers";

export default function PatternTestResultPage() {
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Эффект 1: Загружаем категории паттернов (один раз при монтировании)
  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const res = await fetch("/data/patterns.json");
        const data = await res.json();
        if (isMounted) {
          setCategories(Array.isArray(data.categories) ? data.categories : []);
          setCategoriesLoading(false);
        }
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
        if (isMounted) {
          setCategories([]);
          setCategoriesLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Эффект 2: Загрузка данных по id
  useEffect(() => {
    // Если id нет, очищаем состояние
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
    if (error && categories.length > 0 && !resultData) {
      const totalAnswers =
        categories.reduce(
          (acc, cat) => acc + (Array.isArray(cat.items) ? cat.items.length : 0),
          0
        ) || 60;
      return {
        user: {
          fullName: "Иван Иванов",
          phone: "+79998887766",
          telegram: "@ivanov",
          email: "ivan@example.com",
        },
        answers: Array(totalAnswers).fill("Изобилие времени"),
        patterns: Array(totalAnswers).fill("Изобилие времени"),
        testDate: new Date().toLocaleDateString("ru-RU"),
      };
    }
    return null;
  }, [error, categories, resultData]);

  // Данные для отображения (основные или fallback)
  const displayedResultData = resultData ?? fallbackResultData;

  // Формируем строки паттернов для результатов
  const patternResultsStrings = useMemo(() => {
    if (!displayedResultData) return [];

    if (Array.isArray(displayedResultData?.patterns)) {
      return displayedResultData.patterns.map(
        a => (typeof a === "string" ? a : (a?.pattern || ""))
      );
    }
    if (Array.isArray(displayedResultData?.answers)) {
      return displayedResultData.answers.map(
        a => (typeof a === "string" ? a : (a?.pattern || ""))
      );
    }
    return [];
  }, [displayedResultData]);

  // Основные вычисления результата
  const resultsData = useMemo(() => {
    if (!displayedResultData || !categories.length) return null;

    try {
      const rd = createResultsData({
        userData: displayedResultData.user,
        categories,
        patternResults: patternResultsStrings,
      });
      return {
        ...rd,
        fullName: displayedResultData?.user?.fullName || "",
        timeDisplay:
          displayedResultData?.testDate ||
          displayedResultData?.date ||
          new Date().toLocaleDateString("ru-RU"),
      };
    } catch (err) {
      console.error("Ошибка создания resultsData:", err);
      return null;
    }
  }, [displayedResultData, categories, patternResultsStrings]);

  // Извлекаем показатели из resultsData
  const topPatterns = useMemo(
    () => (resultsData?.topPatterns ? resultsData.topPatterns : []),
    [resultsData]
  );
  const topCategory = useMemo(
    () => (resultsData?.topCategory ? resultsData.topCategory : null),
    [resultsData]
  );
  const patternMessage = useMemo(
    () => (topCategory ? getPatternMessage({ topCategory }) : ""),
    [topCategory]
  );
  const opportunities = useMemo(
    () => (topCategory ? getOpportunities({ topCategory }) : ""),
    [topCategory]
  );
  const behaviorModel = useMemo(
    () => (topPatterns.length > 0 ? getBehaviorModel({ topPatterns }) : ""),
    [topPatterns]
  );
  const strengths = useMemo(
    () => (topPatterns.length > 0 ? getStrengths({ topPatterns }) : ""),
    [topPatterns]
  );

  if (categoriesLoading || !categories.length) {
    return <div>Загрузка категорий...</div>;
  }

  if (loading || !resultsData) {
    return <div>Загрузка результатов...</div>;
  }

  if (!displayedResultData) {
    return <div>Данные не найдены</div>;
  }

  return (
    <ResultsScreen
      resultsData={resultsData}
      answers={displayedResultData.answers || []}
      patterns={patternResultsStrings}
      categories={categories}
      patternResults={resultsData.patternResults || []}
      topPatterns={topPatterns}
      topCategory={topCategory}
      patternMessage={patternMessage}
      opportunities={opportunities}
      behaviorModel={behaviorModel}
      strengths={strengths}
    />
  );
}