// src/components/Sections/ResultsSections/MbiScalesSection.jsx
// Секция с результатами по шкалам MBI и общим индексом выгорания

import React from 'react';
import { getLevelColor, SCALE_BAR_COLORS } from '../../../utils/mbiHelpers';



/**
 * Одна строка шкалы MBI с прогресс-баром
 */
const ScaleRow = ({ title, score, maxScore, level, description, barColor }) => {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return (
    <div className="mbi-scale">
      <div className="mbi-scale__header">
        <h3 className="mbi-scale__title">{title}</h3>
        <span className="mbi-level" style={{ color: getLevelColor(level) }}>
          {level}
        </span>
      </div>

      <div className="mbi-scale__score-line">
        <span className="mbi-scale__score">{score}</span>
        <span className="mbi-scale__max"> / {maxScore}</span>
      </div>

      <div className="mbi-scale__bar-container">
        <div
          className="mbi-scale__bar"
          style={{ width: `${percent}%`, backgroundColor: barColor }}
        />
      </div>

      {description && <p className="mbi-scale__description">{description}</p>}
    </div>
  );
};

/**
 * Блок с общим индексом выгорания
 */
const BurnoutIndexBlock = ({ burnoutIndex, maxScore, burnoutLevel, description, barColor }) => {
  const percent = maxScore > 0 ? Math.round((burnoutIndex / maxScore) * 100) : 0;

  return (
    <div className="mbi-burnout-index">
      <h3 className="mbi-burnout-index__title">Общий индекс психического выгорания</h3>

      <div className="mbi-burnout-index__score-line">
        <div>
          <span className="mbi-burnout-index__score">{burnoutIndex}</span>
          <span className="mbi-burnout-index__max"> / {maxScore}</span>
        </div>
        <span
          className="mbi-level mbi-burnout-index__level"
          style={{ color: getLevelColor(burnoutLevel) }}
        >
          {burnoutLevel}
        </span>
      </div>

      <div className="mbi-burnout-index__bar-container">
        <div
          className="mbi-burnout-index__bar"
          style={{ width: `${percent}%`, backgroundColor: barColor }}
        />
      </div>

      {description && (
        <p className="mbi-burnout-index__description">{description}</p>
      )}
    </div>
  );
};

/**
 * Основной компонент секции MBI результатов
 */
const MbiScalesSection = ({ mbiResults }) => {
  if (!mbiResults) return null;

  const { scores, levels, burnoutIndex, burnoutLevel, scales, burnoutConfig } = mbiResults;

  return (
    <div className="mbi-scales-section">
      <div className="mbi-scales-section__container">
        <h2 className="mbi-scales-section__subtitle">Результаты вашего тестирования</h2>

        {/* Три шкалы */}
        <div className="mbi-scales-section__scales">
          <ScaleRow
            title={scales.exhaustion.title}
            score={scores.exhaustion}
            maxScore={scales.exhaustion.maxScore}
            level={levels.exhaustion}
            description={scales.exhaustion.description}
            barColor={SCALE_BAR_COLORS.exhaustion}
          />
          <ScaleRow
            title={scales.depersonalization.title}
            score={scores.depersonalization}
            maxScore={scales.depersonalization.maxScore}
            level={levels.depersonalization}
            description={scales.depersonalization.description}
            barColor={SCALE_BAR_COLORS.depersonalization}
          />
          <ScaleRow
            title={scales.reduction.title}
            score={scores.reduction}
            maxScore={scales.reduction.maxScore}
            level={levels.reduction}
            description={scales.reduction.description}
            barColor={SCALE_BAR_COLORS.reduction}
          />
        </div>

        {/* Общий индекс выгорания */}
        <BurnoutIndexBlock
          burnoutIndex={burnoutIndex}
          maxScore={burnoutConfig.maxScore}
          burnoutLevel={burnoutLevel}
          description={burnoutConfig.description}
          barColor={SCALE_BAR_COLORS.burnoutIndex}
        />
      </div>
    </div>
  );
};

export default MbiScalesSection;