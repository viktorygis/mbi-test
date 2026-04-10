//	PatternResult - Компонент для отображения результатов по категориям и подкатегориям

import React, { useState } from "react";
//	Импортируем вспомогательную функцию для получения статистики по паттернам в подкатегории
import { getSubcategoryPatternStats } from "../../../utils/resultsHelpers";

// ==== ПОДКОМПОНЕНТЫ ====
//	Tooltip для паттерна
const PatternTooltip = ({ text, visible }) => (
  <div className={`proportion__tooltip${visible ? " visible" : " hidden"}`}>
    {text}
  </div>
);

//	Отдельный паттерн с прогресс-баром и тултипом
const PatternResult = ({
  name, percent, description, tooltipActive, onTooltipToggle, onTooltipLeave
}) => (
  <div className="proportion__item">
    <div className="proportion__label">
      <div className="proportion__title-wrapper">
        <p className="proportion__title">{name}</p>
        <div
          className="proportion__info-icon"
          tabIndex={0}
          onClick={onTooltipToggle}
          onMouseEnter={onTooltipToggle}
          onMouseLeave={onTooltipLeave}
          onBlur={onTooltipLeave}
        >
          <span>i</span>
          <PatternTooltip text={description} visible={tooltipActive} />
        </div>
      </div>
      <p className="proportion__percent">{percent}%</p>
    </div>
    <div className="proportion__bar-container bar-container">
      <div className="proportion__bar-block bar-block" style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

//	Компонент для отображения аналитики по подкатегории
function getScaleStatus(stats, patterns) {
  const percents = patterns.map(
    (p) => stats[(p.pattern.ru || p.pattern.en || '').trim().toLowerCase()] || 0
  );
  const maxIndex = percents.findIndex((percent) => percent >= 75);
  if (maxIndex !== -1) {
    return `ЯВНО ${patterns[maxIndex].pattern.ru || patterns[maxIndex].pattern.en}`;
  }
  const medIndex = percents.findIndex((percent) => percent > 50);
  if (medIndex !== -1) {
    return `УМЕРЕННО ${patterns[medIndex].pattern.ru || patterns[medIndex].pattern.en}`;
  }
  return "НЕЙТРАЛЬНО";
}

//	Возвращает массив индикаторов для шкалы (1 - активен, 0 - неактивен)
function getIndicators(stats, patterns) {
  const percents = patterns.map(
    (p) => stats[(p.pattern.ru || p.pattern.en || '').trim().toLowerCase()] || 0
  );
  if (percents.some((p) => p >= 75)) return [0, 0, 1];
  if (percents.some((p) => p > 50)) return [1, 0, 0];
  return [0, 1, 0];
}

//	Компонент для отображения аналитики по подкатегории (шкала и статус)
const SubcategoryAnalytics = ({ stats, patterns }) => {
  const indicators = getIndicators(stats, patterns);
  const scaleLabels = ["УМЕРЕННО", "НЕЙТРАЛЬНО", "ЯВНО"];
  return (
    <div className="result-category__analytics analytics">
      <div className="analytics__block">
        <p className="analytics__scale-status">{getScaleStatus(stats, patterns)}</p>
        <div className="analytics__scale-container">
          <div className="analytics__scale-line"></div>
          <div className="analytics__scale-labels">
            {scaleLabels.map((label, idx) => (
              <div className="analytics__scale-labels-item" key={label}>
                <div className="analytics__indicator indicator" style={{ opacity: indicators[idx] ? 1 : 0 }}></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//	Блок подкатегории с паттернами и аналитикой
const SubcategoryBlock = ({
  catIdx,
  subcat,
  subIdx,
  stats,
  patterns,
  tooltipIndex,
  setTooltipIndex
}) => (
  <div className="result-category__subcategory subcategory-block" key={subcat.title?.ru || subcat.title?.en || subIdx}>
    <div className="result-category__subcategory-title subcategory-title _anim-active">
      {subcat.title?.ru || subcat.title?.en}
    </div>
    <div className="result-category__subcategory-wrapper subcategory-wrapper _anim-active">
      <SubcategoryAnalytics stats={stats} patterns={patterns} />
      <div className="result-category__proportion proportion">
        <div className="proportion__block">
          {patterns.map((pat, patIdx) => {
            const name = pat.pattern.ru || pat.pattern.en || "";
            const percent = stats[(name || '').trim().toLowerCase()] || 0;
            const tooltipActive =
              tooltipIndex.cat === catIdx &&
              tooltipIndex.sub === subIdx &&
              tooltipIndex.pat === patIdx;
            return (
              <PatternResult
                key={name}
                name={name}
                percent={percent}
                description={pat.description?.ru || pat.description?.en || ""}
                tooltipActive={tooltipActive}
                onTooltipToggle={() =>
                  setTooltipIndex(
                    tooltipActive
                      ? { cat: null, sub: null, pat: null }
                      : { cat: catIdx, sub: subIdx, pat: patIdx }
                  )
                }
                onTooltipLeave={() => setTooltipIndex({ cat: null, sub: null, pat: null })}
              />
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

//	Основной компонент для отображения результатов по категориям
const CategoryResultsSection = ({
  categories = [],
  patternResults = []
}) => {
  const [tooltipIndex, setTooltipIndex] = useState({ cat: null, sub: null, pat: null });


  return (
    <div className="result-category">
      <div className="result-category__container">
        <h2 className="result-category__subtitle">Паттерны по категориям</h2>
        <div className="result-category__content">
          {categories.map((cat, catIdx) => (
            <div className={`result-category__block category-block ${cat.cssClass || ""}`} key={cat.id || cat.title?.ru || cat.title?.en}>
              <h3 className="result-category__label category-label">
                {cat.title?.ru || cat.title?.en}
              </h3>
              {(cat.subcategories || []).map((subcat, subIdx) => {
                const stats = getSubcategoryPatternStats(patternResults, subcat);
                const patterns = subcat.patterns || [];
                return (
                  <SubcategoryBlock
                    key={subcat.title?.ru || subcat.title?.en || subIdx}
                    catIdx={catIdx}
                    subcat={subcat}
                    subIdx={subIdx}
                    stats={stats}
                    patterns={patterns}
                    tooltipIndex={tooltipIndex}
                    setTooltipIndex={setTooltipIndex}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryResultsSection;