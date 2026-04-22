//src/components/Sections/ResultsSections/
//	HistogramSection.jsx - Компонент для отображения гистограммы паттернов и их визуализации.

import React from 'react';
import {
  getStrongPatternsByCategory,
  getTopCategoryByStrongPatterns,
} from '../../../utils/resultsHelpers';

/**
 * HistogramSection
 * Компонент для отображения гистограммы паттернов и их визуализации.
 * @param {Array} categories - список категорий паттернов
 * @param {Array} patternResults - результаты паттернов пользователя
 * @param {any} topCategory - топовая категория из анализа (для выделения рамкой)
 * @param {number} strongThreshold - порог для выделения сильных паттернов (по умолчанию 75)
 */
const HistogramSection = ({
  categories,
  patternResults,
  topCategory,
  strongThreshold = 75,
}) => {
  // Получаем массив категорий с явно выраженными паттернами
  const categoryWrappers = getStrongPatternsByCategory(
    Array.isArray(categories) ? categories : [],
    Array.isArray(patternResults) ? patternResults : [],
    strongThreshold
  );

  // Только категории, где есть strongPatterns
  const visibleCategoryWrappers = categoryWrappers.filter(
    (cat) => cat.strongPatterns.length > 0
  );

  // Используем topCategory из пропса для синхронизации с InterpretationSection
  const resolvedTopCategory =
    topCategory ||
    getTopCategoryByStrongPatterns(
      Array.isArray(categories) ? categories : [],
      Array.isArray(patternResults) ? patternResults : [],
      strongThreshold
    );

  // Собираем легенду
  const legendItems = [];
  visibleCategoryWrappers.forEach((cat) => {
    cat.strongPatterns.forEach((p) => {
      if (p.abbr && !legendItems.find((l) => l.abbr === p.abbr)) {
        legendItems.push({ abbr: p.abbr, name: p.name });
      }
    });
  });
  // Считаем общее число явно проявленных паттернов
  const strongPatternsCount = visibleCategoryWrappers
    .reduce((acc, cat) => acc + cat.strongPatterns.length, 0);

  return (
    <div className="histogram">
      <div className="histogram__container">
        <div className="histogram__body">
          <h3 className="histogram__title">Явно проявленные паттерны</h3>
          {/* Вывод от числа ЯПП */}
          <div className="histogram__info">
            {visibleCategoryWrappers.length > 0 ? (
              <>
                <span className="histogram__info-strong-count">У вас выявлено <b>{strongPatternsCount}</b> явно проявленных паттернов</span>
                {/* Умеренный уровень */}
                {strongPatternsCount >= 1 && strongPatternsCount <= 4 && (
                  <p className="histogram__info-text">, что относится к <span className="histogram__info-text--highlight"> умеренному уровню проявленности</span>. Это значит, что в вашем поведении присутствует влияние шаблонов, но они не являются определяющими.
                  </p>
                )}
                {/* Средний уровень */}
                {strongPatternsCount >= 5 && strongPatternsCount <= 7 && (
                  <p className="histogram__info-text">, что относится к<span className="histogram__info-text--highlight"> среднему уровню проявленности</span>. Это значит, что шаблоны поведения начинают играть заметную роль, однако ваше поведение остаётся достаточно гибким.
                  </p>
                )}
                {/* Высокий уровень */}
                {strongPatternsCount >= 8 && (
                  <p className="histogram__info-text">, что относится к<span className="histogram__info-text--highlight"> высокому уровню проявленности</span>. Это значит, что шаблоны поведения максимально выражены и оказывают существенное влияние на ваши решения.
                  </p>
                )}
              </>
            ) : (
              /* Не выявлено явно проявленных паттернов */
              <p>
                В вашем профиле не выявлено явно проявленных
                паттернов (выраженных более чем на {strongThreshold}%).
                Это значит, что	ваше поведение достаточно гибкое и не ограничено
                жёсткими шаблонами.</p>
            )}
          </div>

          {/* Список категорий с паттернами */}
          <div className="histogram__content">
            {/* Категории паттернов */}
            {visibleCategoryWrappers.map((cat) => (
              <div
                key={cat.category}
                className={
                  "histogram__category-wrapper" +
                  (resolvedTopCategory && cat.id === resolvedTopCategory.id
                    ? " border"
                    : "")
                }>
                <div className="histogram__category-row">
                  <div className="histogram__category">
                    {cat.category}
                  </div>
                  <div className="histogram__columns">
                    {cat.strongPatterns.map((p) => (
                      <div
                        className="histogram__column strong-pattern"
                        key={p.name}>
                        <span className="histogram__pattern">
                          {p.name}
                        </span>
                        <span className="histogram__pattern-abr">
                          {p.abbr}
                        </span>
                        <div className="histogram__bar-container">
                          <div
                            className={
                              "histogram__bar " +
                              p.cssClass
                            }
                            style={{
                              width: `${p.percent}%`,
                            }}></div>
                        </div>
                        <span
                          className={
                            "histogram__percentage" +
                            (p.percent === 100
                              ? " maximum"
                              : "")
                          }>
                          {p.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Описание категории, если есть */}
                {cat.description && (
                  <div className="histogram__category-description">
                    {cat.description}
                  </div>
                )}
              </div>
            ))}
            {/* Условные обозначения для мобильной версии */}
            <div className="legend">
              <h4 className="legend__title">Условные обозначения:</h4>
              <div className="legend__grid">
                {legendItems.map((l) => (
                  <div className="legend__item" key={l.abbr}>
                    <span className="abbreviation">
                      {l.abbr}
                    </span>{" "}
                    <span>-</span> {l.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistogramSection;