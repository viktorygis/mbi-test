// src/components/Sections/ResultsSections/MbiScalesSection.jsx
import React from 'react';
import { getLevelColor } from '../../../utils/mbiHelpers';
import { getRecommendation } from '../../../utils/mbiNorms';

// Одна строка для выводимой шкалы
const ScaleRow = ({ title, score, maxScore, level, scaleConfig }) => {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const recommendationObj = getRecommendation({ [scaleConfig.key]: scaleConfig }, scaleConfig.key, score);
  return (
    <div className="mbi-scale">
      <div className="mbi-scale__header">
        <h3 className="mbi-scale__title">{title}</h3>
      </div>
      <div className="mbi-scale__score-line">
        <span className="mbi-scale__score">{score}</span>
        <span className="mbi-scale__max"> / {maxScore}</span>
      </div>
      <div className="mbi-scale__bar-labels-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
        <span>0%</span>
        <span>100%</span>
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
      {/* ======= СЮДА: подпись уровня ======= */}
      {level && (
        <div
          className="mbi-scale__level-label"
          style={{
            color: getLevelColor(level),
            fontWeight: 'bold',
            marginTop: '4px',
            fontSize: '14px',
            textAlign: 'right'
          }}
        >
          {level}
        </div>
      )}
      {/* ======/ конец подписи уровня ====== */}
      {/* Интерпретация */}
      <div className="mbi-scale__recommendation">
        {recommendationObj?.short || recommendationObj}
      </div>
    </div>
  );
};

// Блок с общим индексом выгорания
const BurnoutIndexBlock = ({
  burnoutIndex,
  maxScore,
  burnoutLevel,
  burnoutConfig
}) => {
  const percent = maxScore > 0 ? Math.round((burnoutIndex / maxScore) * 100) : 0;
  // Рекомендация для общего индекса (например, через "burnoutIndex" или "burnout" как key)
  const recommendationObj = getRecommendation(
    { burnoutIndex: burnoutConfig }, // объект-конфиг
    'burnoutIndex',                  // ключ
    burnoutIndex                     // число баллов
  );

  return (
    <div className="mbi-burnout-index">
      <h3 className="mbi-burnout-index__title">
        Общий индекс психического выгорания
      </h3>
      <div className="mbi-burnout-index__score-line">
        <div>
          <span className="mbi-burnout-index__score">{burnoutIndex}</span>
          <span className="mbi-burnout-index__max"> / {maxScore}</span>
        </div>
      </div>
      {/* Подписи 0% и 100% */}
      <div
        className="mbi-burnout-index__bar-labels-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          marginBottom: '2px'
        }}>
        <span>0%</span>
        <span>100%</span>
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
      {/* Только интерпретация, уровень не выводим */}
      <div className="mbi-burnout-index__recommendation">
        {recommendationObj?.short || recommendationObj}

      </div>
    </div>
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
            score={scores.exhaustion}
            maxScore={scales.exhaustion.maxScore}
            level={levels.exhaustion}
            scaleConfig={{ ...scales.exhaustion, key: 'exhaustion' }}
          />
          <ScaleRow
            title={scales.depersonalization.title}
            score={scores.depersonalization}
            maxScore={scales.depersonalization.maxScore}
            level={levels.depersonalization}
            scaleConfig={{ ...scales.depersonalization, key: 'depersonalization' }}
          />
          <ScaleRow
            title={scales.reduction.title}
            score={scores.reduction}
            maxScore={scales.reduction.maxScore}
            level={levels.reduction}
            scaleConfig={{ ...scales.reduction, key: 'reduction' }}
          />
        </div>
        <BurnoutIndexBlock
          burnoutIndex={burnoutIndex}
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