// src/components/Sections/ResultsSections/MbiScalesSection.jsx
import React from 'react';
import { getLevelColor } from '../../../utils/mbiHelpers';
import { getRecommendation } from '../../../utils/mbiNorms';

const ICONS = {
  exhaustion: "img/mbi-test/emotional-exhaustion.svg",
  depersonalization: "img/mbi-test/depersonalization.svg",
  reduction: "img/mbi-test/reduced-achievement.svg",
  burnoutIndex: "img/mbi-test/burnout-index.svg",
};
// Одна строка для выводимой шкалы
const ScaleRow = ({ title, score, maxScore, level, scaleConfig, icon }) => {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const recommendationObj = getRecommendation({ [scaleConfig.key]: scaleConfig }, scaleConfig.key, score);
  return (
    <div className="mbi-scale">
      <div className="mbi-scale__header">
        {icon && (
          <div className="mbi-scale__icon-wrap">
            <img src={icon} alt="" className="mbi-scale__icon" />
          </div>
        )}
        <h3 className="mbi-scale__title">{title}</h3>
      </div>
      <div className="mbi-scale__score-row">
        {level && (
          <div className="mbi-scale__level-label" style={{ color: getLevelColor(level), }}>
            {level}
          </div>
        )}
        <div className="mbi-scale__score-line">
          <span className="mbi-scale__score">{score}</span>
          <span className="mbi-scale__max"> / {maxScore}</span>
        </div>
      </div>


      <div className="mbi-scale__bar-container">
        <div
          className="mbi-scale__bar"
          style={{
            width: `${percent}%`,
            backgroundColor: getLevelColor(level)
          }}
        />
      </div>
      {/* ====== проценты под полосой ====== */}
      <div
        className="mbi-scale__bar-labels-row"
      >
        <span>0%</span>
        <span>100%</span>
      </div>
      {/* Интерпретация */}
      <div className="mbi-scale__recommendation">
        {recommendationObj?.short || recommendationObj}
      </div>
    </div>
  );
};

// Блок с общим индексом выгорания
const BurnoutIndexBlock = ({ burnoutIndex, maxScore, burnoutLevel, burnoutConfig, icon }) => {
  const percent = maxScore > 0 ? Math.round((burnoutIndex / maxScore) * 100) : 0;
  const recommendationObj = getRecommendation(
    { burnoutIndex: burnoutConfig },
    'burnoutIndex',
    burnoutIndex
  );

  return (
    <div className="mbi-burnout-index">
      <div className="mbi-burnout-index__header">
        {icon && (
          <div className="mbi-burnout-index__icon-wrap">
            <img src={icon} alt="" className="mbi-burnout-index__icon" />
          </div>
        )}
        <h3 className="mbi-burnout-index__title">
          Общий индекс психического выгорания
        </h3>
      </div>
      <div className="mbi-burnout-index__score-row">
        {/* ======= Уровень теперь сверху полосы ======= */}
        {burnoutLevel && (
          <div
            className="mbi-burnout-index__level-label"
            style={{
              color: getLevelColor(burnoutLevel),
            }}

          >
            {burnoutLevel}
          </div>

        )
        }
        <div className="mbi-burnout-index__score-line">
          <span className="mbi-burnout-index__score">{burnoutIndex}</span>
          <span className="mbi-burnout-index__max"> / {maxScore}</span>
        </div>
      </div>
      <div className="mbi-burnout-index__bar-container">
        <div
          className="mbi-burnout-index__bar"
          style={{
            width: `${percent}%`,
            backgroundColor: getLevelColor(burnoutLevel)
          }}
        />
      </div>
      {/* ====== проценты под полосой ====== */}
      <div
        className="mbi-burnout-index__bar-labels-row"
      >
        <span>0%</span>
        <span>100%</span>
      </div>
      {/* Интерпретация */}
      <div className="mbi-burnout-index__recommendation">
        {recommendationObj?.short || recommendationObj}
      </div>
    </div >
  );
};

// Основной компонент секции
const MbiScalesSection = ({ mbiResults }) => {
  if (!mbiResults) return null;

  const { scores, levels, burnoutIndex, burnoutLevel, scales, burnoutConfig } = mbiResults;

  return (
    <div className="mbi-scales-section">
      <div className="mbi-scales-section__container">
        <h2 className="mbi-scales-section__subtitle">Результаты вашего тестирования</h2>
        <div className="mbi-scales-section__scales">
          <ScaleRow
            title={scales.exhaustion.title}
            icon={ICONS.exhaustion}
            score={scores.exhaustion}
            maxScore={scales.exhaustion.maxScore}
            level={levels.exhaustion}
            scaleConfig={{ ...scales.exhaustion, key: 'exhaustion' }}
          />
          <ScaleRow
            title={scales.depersonalization.title}
            icon={ICONS.depersonalization}
            score={scores.depersonalization}
            maxScore={scales.depersonalization.maxScore}
            level={levels.depersonalization}
            scaleConfig={{ ...scales.depersonalization, key: 'depersonalization' }}
          />
          <ScaleRow
            title={scales.reduction.title}
            icon={ICONS.reduction}
            score={scores.reduction}
            maxScore={scales.reduction.maxScore}
            level={levels.reduction}
            scaleConfig={{ ...scales.reduction, key: 'reduction' }}
          />
        </div>
        <BurnoutIndexBlock
          burnoutIndex={burnoutIndex}
          icon={ICONS.burnoutIndex}
          maxScore={burnoutConfig.maxScore}
          burnoutLevel={burnoutLevel}
          burnoutConfig={burnoutConfig}
          description={burnoutConfig.description}
        />
      </div>
    </div>
  );
};

export default MbiScalesSection;