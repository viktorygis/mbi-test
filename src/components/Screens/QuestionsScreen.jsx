// QuestionsScreen.jsx - компонент для отображения вопросов теста и сбора ответов

import React, { useEffect, useMemo, useCallback, useState } from 'react';

const QuestionsScreen = ({
  //questionsUrl = '/data/questions.json',
  questionsUrl = import.meta.env.BASE_URL + 'data/questions.json',
  onComplete,
  userData,
  timeDisplay = '',
  showTestFillButton = true,
}) => {
  const fullName = userData?.fullName || '';

  const [mbiData, setMbiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIndices, setAnswerIndices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(questionsUrl);
        if (!response.ok) throw new Error(`Ошибка HTTP: статус ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data.questions) || data.questions.length === 0) {
          throw new Error('Данные вопросов не найдены.');
        }

        setMbiData(data);
        setAnswerIndices([]);
        setCurrentQuestionIndex(0);
        setSelected(null);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки вопросов');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [questionsUrl]);

  const total = useMemo(() => mbiData?.questions?.length ?? 0, [mbiData]);
  const isFirst = currentQuestionIndex === 0;
  const isLast = total > 0 && currentQuestionIndex === total - 1;

  // синхронизируем выбранный вариант при переключении вопроса
  useEffect(() => {
    setSelected(answerIndices[currentQuestionIndex] ?? null);
  }, [currentQuestionIndex, answerIndices]);

  const currentAnswer = answerIndices[currentQuestionIndex];
  const hasCurrentAnswer = currentAnswer !== undefined && currentAnswer !== null;

  // Процент именно "по отвеченным", чтобы на вопросе 1 из 22 показывалось (0%), пока не ответили
  const progressPercent = useMemo(() => {
    if (!total) return 0;
    const answered = answerIndices.filter((x) => x !== undefined && x !== null).length;
    return Math.round((answered / total) * 100);
  }, [answerIndices, total]);

  const handleSelect = useCallback(
    (optionIndex) => {
      setSelected(optionIndex);
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

    if (onComplete) onComplete({ answerIndices, fullName, timeDisplay });
  }, [answerIndices, fullName, hasCurrentAnswer, isLast, onComplete, timeDisplay]);

  // Клавиатура: ← назад, →/Enter вперёд, 1..6 выбрать вариант
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
        return;
      }

      if (/^[1-6]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        const optionsCount = mbiData?.answerOptions?.length ?? 0;
        if (idx >= 0 && idx < optionsCount) {
          e.preventDefault();
          handleSelect(idx);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext, handleSelect, mbiData]);

  const handleReload = () => {
    setMbiData(null);
    setLoading(true);
    setError('');
    setCurrentQuestionIndex(0);
    setAnswerIndices([]);
    setSelected(null);
  };

  const handleFillTestAnswers = () => {
    if (!mbiData) return;
    const autoIndices = mbiData.questions.map((_, i) => i % 6);

    if (onComplete) onComplete({ answerIndices: autoIndices, fullName, timeDisplay });
  };

  if (loading) {
    return (
      <div className="question-test" style={{ display: 'block' }}>
        <div className="question-test__container">
          <div className="question-header">
            <div id="fio-display">
              ФИО: <span>{fullName}</span>
            </div>
            <div id="time-display">
              Дата: <span>{timeDisplay}</span>
            </div>
          </div>
          <div className="question-test__content">
            <div className="question__loader-test" style={{ display: 'block', textAlign: 'center' }}>
              <span></span>
              <div>Загрузка вопросов...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-test" style={{ display: 'block' }}>
        <div className="question-test__container">
          <div className="question-test__content">
            <div className="error-message" style={{ color: '#dc2626', marginTop: 10 }}>
              {error}
            </div>
            <button className="question-test__button" onClick={handleReload}>
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!mbiData) return null;

  const question = mbiData.questions[currentQuestionIndex];
  if (!question) return null;

  const answerOptions = mbiData.answerOptions || [];

  return (
    <div className="question-test">
      <div className="question-test__container">
        <div className="question-test__content">
          <div className="question-test__info">
            <div id="fio-display" className="question-block__item">
              ФИО: <span>{fullName}</span>
            </div>
            <div id="time-display" className="question-block__item">
              Дата: <span>{timeDisplay}</span>
            </div>
          </div>

          {/* Единственная строка статуса: "Вопрос 1 из 22 (0%)" */}
          <div className="question-test__progress" aria-label="Прогресс теста">
            <div className="question-test__progress-top">
              <div className="question-test__progress-text">
                Вопрос {currentQuestionIndex + 1} из {total}
              </div>
              <div className="question-test__progress-percent">
                {progressPercent}%
              </div>
            </div>

            <div
              className="question-test__progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div className="question-test__progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="question-test__block">
            <div className="question-test__question">
              <div className="question-test__question-text">
                {question.text}
              </div>
            </div>
            <div className="question-test__options">
              {answerOptions.map((option, i) => (
                <label className="question-test__option" key={i}>
                  <input
                    type="radio"
                    name={`answer_${currentQuestionIndex}`}
                    value={i}
                    checked={selected === i}
                    onChange={() => handleSelect(i)}
                  />
                  <span className="question-test__radio-label">{option}</span>
                </label>
              ))}
            </div>

            <div className="question-test__navigation">
              <button
                className="question-test__button"
                type="button"
                onClick={goPrev}
                disabled={isFirst}
                aria-disabled={isFirst}
                title={isFirst ? 'Это первый вопрос' : undefined}
              >
                🠐 Назад
              </button>

              <button
                className="question-test__button question-test__button--primary"
                type="button"
                onClick={goNext}
                disabled={!hasCurrentAnswer}
                aria-disabled={!hasCurrentAnswer}
                title={!hasCurrentAnswer ? 'Сначала выберите вариант ответа' : undefined}
              >
                {isLast ? 'Завершить ✓' : 'Вперёд 🠖'}
              </button>
            </div>
          </div>

          {showTestFillButton && (
            <button
              className="question-test__button"
              type="button"
              style={{ margin: '20px auto', display: 'none' }}
              onClick={handleFillTestAnswers}
            >
              Заполнить тестовые ответы
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen;