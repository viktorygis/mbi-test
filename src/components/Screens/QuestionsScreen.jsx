import React, { useEffect, useMemo, useCallback, useState } from "react";

const QuestionsScreen = ({
  questionsUrl = import.meta.env.BASE_URL + "data/questions.json",
  onComplete,
  userData,
  timeDisplay = "",
  showTestFillButton = true,
}) => {
  const fullName = userData?.fullName || "";

  const [mbiData, setMbiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIndices, setAnswerIndices] = useState([]);

  // Предварительные вопросы (статические, перед MBI)
  const preliminaryQuestions = [
    {
      id: "age",
      text: "Сколько вам лет?",
      options: ["до 25 лет", "25-35", "35-45", "45+"]
    },
    {
      id: "occupation",
      text: "Чем вы занимаетесь?",
      options: ["Топ-менеджер", "Предприниматель", "Студент", "Наемный работник", "В поиске", "Домохозяйка", "Другое"]
    },
    {
      id: "priority",
      text: "Что сейчас самое важное для вас?",
      options: ["Карьера", "Отношения", "Здоровье", "Деньги", "Смысл", "Другое"]
    }
  ];

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(questionsUrl);
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data.questions) || data.questions.length === 0) {
          throw new Error("Данные вопросов не найдены.");
        }

        setMbiData(data);
        const totalQuestions = preliminaryQuestions.length + data.questions.length;
        setAnswerIndices(Array(totalQuestions).fill(null));
        setCurrentQuestionIndex(0);
      } catch (err) {
        setError(err.message || "Ошибка загрузки вопросов");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [questionsUrl]);

  const prelimCount = preliminaryQuestions.length;
  const mbiCount = mbiData?.questions?.length ?? 0;
  const total = prelimCount + mbiCount;
  const isPreliminary = currentQuestionIndex < prelimCount;
  const isFirst = currentQuestionIndex === 0;
  const isLast = total > 0 && currentQuestionIndex === total - 1;
  const currentAnswer = answerIndices[currentQuestionIndex];
  const hasCurrentAnswer = currentAnswer !== null && currentAnswer !== undefined;

  const effectiveQuestions = useMemo(() => {
    if (!mbiData?.questions) return [];
    return [...preliminaryQuestions, ...mbiData.questions];
  }, [mbiData]);

  const progressPercent = useMemo(() => {
    if (!total) return 0;
    const answered = answerIndices.filter((x) => x !== null && x !== undefined).length;
    return Math.round((answered / total) * 100);
  }, [answerIndices, total]);

  const handleSelect = useCallback(
    (optionIndex) => {
      setAnswerIndices((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = optionIndex;
        return next;
      });
    },
    [currentQuestionIndex]
  );

  const goPrev = useCallback(() => {
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    if (!hasCurrentAnswer) return;

    if (!isLast) {
      setCurrentQuestionIndex((i) => i + 1);
      return;
    }

    // Подготовка результатов: preliminary отдельно + MBI
    const preliminaryAnswers = {};
    preliminaryQuestions.forEach((q, idx) => {
      const ansIdx = answerIndices[idx];
      if (ansIdx !== null && ansIdx !== undefined) {
        preliminaryAnswers[q.id] = q.options[ansIdx];
      }
    });

    const mbiAnswerIndices = answerIndices.slice(prelimCount).filter((x) => x !== null && x !== undefined);

    onComplete?.({
      preliminaryAnswers,  // Новый: {age: "25-35", occupation: "...", priority: "..."}
      mbiAnswerIndices,    // Старый: только 22 ответа MBI
      fullName,
      timeDisplay,
    });
  }, [answerIndices, fullName, hasCurrentAnswer, isLast, onComplete, timeDisplay, prelimCount, preliminaryQuestions]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || e.altKey || e.ctrlKey || e.metaKey) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }

      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        goNext();
        return;
      }

      if (/^[1-6]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        const optionsCount = effectiveQuestions[currentQuestionIndex]?.options?.length ?? mbiData?.answerOptions?.length ?? 0;
        if (idx >= 0 && idx < optionsCount) {
          e.preventDefault();
          handleSelect(idx);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, handleSelect, effectiveQuestions, mbiData, currentQuestionIndex]);

  const handleReload = () => {
    setMbiData(null);
    setLoading(true);
    setError("");
    setCurrentQuestionIndex(0);
    setAnswerIndices([]);
  };

  const handleFillTestAnswers = () => {
    if (!mbiData) return;
    const totalQuestions = prelimCount + mbiCount;
    const autoIndices = Array.from({ length: totalQuestions }, (_, i) => i % 6);
    // Симулируем завершение
    const preliminaryAnswers = {};
    preliminaryQuestions.forEach((q, idx) => {
      preliminaryAnswers[q.id] = q.options[autoIndices[idx]];
    });
    const mbiAnswerIndices = autoIndices.slice(prelimCount);
    onComplete?.({ preliminaryAnswers, mbiAnswerIndices, fullName, timeDisplay });
  };

  if (loading) {
    return (
      <div className="question-test">
        <div className="question-test__container">
          <div className="question-test__content">
            <div className="question-test__loader" aria-live="polite">
              <div className="question-test__loader-dot" />
              <div>Загрузка вопросов...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-test">
        <div className="question-test__container">
          <div className="question-test__content">
            <div className="question-test__error" role="alert">
              {error}
            </div>
            <button className="question-test__button" onClick={handleReload} type="button">
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!mbiData || effectiveQuestions.length === 0) return null;

  const question = effectiveQuestions[currentQuestionIndex];
  const answerOptions = question.options || mbiData.answerOptions || [];  // Для prelim — свои опции, для MBI — шкала 0-6

  return (
    <section className="question-test" aria-labelledby="question-test-title">
      <div className="question-test__container">
        <div className="question-test__content">
          <div className="question-test__info">
            <div className="question-block__item">
              ФИО: <span>{fullName}</span>
            </div>
            <div className="question-block__item">
              Дата: <span>{timeDisplay}</span>
            </div>
          </div>

          <div className="question-test__progress">
            <div className="question-test__progress-top">
              <div className="question-test__progress-text" id="question-test-title">
                {isPreliminary ? `Предварительный вопрос ${currentQuestionIndex + 1}` : `Вопрос ${currentQuestionIndex - prelimCount + 1} из ${mbiCount}`} из {total}
              </div>
              <div className="question-test__progress-percent">{progressPercent}%</div>
            </div>

            <div
              className="question-test__progress-bar"
              role="progressbar"
              aria-label="Прогресс прохождения теста"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div className="question-test__progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="question-test__block">
            <fieldset className="question-test__question-group">
              <legend className="question-test__question-text">{question.text}</legend>

              <div className="question-test__options" role="radiogroup" aria-label="Варианты ответа">
                {answerOptions.map((option, i) => (
                  <label className="question-test__option" key={i}>
                    <input
                      type="radio"
                      name={`answer_${currentQuestionIndex}`}
                      value={i}
                      checked={currentAnswer === i}
                      onChange={() => handleSelect(i)}
                    />
                    <span className="question-test__radio-label">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="question-test__navigation">
              <button className="question-test__button" type="button" onClick={goPrev} disabled={isFirst}>
                🠐 Назад
              </button>

              <button
                className="question-test__button question-test__button--primary"
                type="button"
                onClick={goNext}
                disabled={!hasCurrentAnswer}
              >
                {isLast ? "Завершить ✓" : "Вперёд 🠖"}
              </button>
            </div>
          </div>

          {showTestFillButton && (
            <button
              className="question-test__button"
              type="button"
              onClick={handleFillTestAnswers}
              style={{ margin: "20px auto", width: "50%" }}
            >
              Заполнить тестовые ответы
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionsScreen;