// src/components/Sections/ResultsSections/MbiScalesSection.jsx
// Секция с результатами по шкалам MBI и общим индексом выгорания

import React from 'react';

/**
 * Возвращает CSS-класс для уровня выгорания
 */
function getLevelClass(label) {
  switch (label) {
    case 'Крайне низкое': return 'mbi-level mbi-level--very-low';
    case 'Низкое': return 'mbi-level mbi-level--low';
    case 'Среднее': return 'mbi-level mbi-level--medium';
    case 'Высокое': return 'mbi-level mbi-level--high';
    case 'Крайне высокое': return 'mbi-level mbi-level--very-high';
    default: return 'mbi-level';
  }
}

/**
 * Одна строка шкалы MBI с прогресс-баром
 */
const ScaleRow = ({ title, score, maxScore, level, description, invertedNote }) => {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return (
    <div className="mbi-scale">
      <div className="mbi-scale__header">
        <h3 className="mbi-scale__title">{title}</h3>
        <span className={getLevelClass(level)}>{level}</span>
      </div>
      <div className="mbi-scale__score-line">
        <span className="mbi-scale__score">{score}</span>
        <span className="mbi-scale__max"> / {maxScore}</span>
      </div>
      <div className="mbi-scale__bar-container">
        <div className="mbi-scale__bar" style={{ width: `${percent}%` }} />
      </div>
      {description && (
        <p className="mbi-scale__description">{description}</p>
      )}
      {invertedNote && (
        <p className="mbi-scale__note mbi-scale__note--inverted">{invertedNote}</p>
      )}
    </div>
  );
};

/**
 * Блок с общим индексом выгорания
 */
const BurnoutIndexBlock = ({ burnoutIndex, maxScore, burnoutLevel, description }) => {
  const percent = maxScore > 0 ? Math.round((burnoutIndex / maxScore) * 100) : 0;
  return (
    <div className="mbi-burnout-index">
      <h3 className="mbi-burnout-index__title">Общий индекс психического выгорания</h3>
      <div className="mbi-burnout-index__score-line">
        <span className="mbi-burnout-index__score">{burnoutIndex}</span>
        <span className="mbi-burnout-index__max"> / {maxScore}</span>
        <span className={getLevelClass(burnoutLevel) + ' mbi-burnout-index__level'}>
          {burnoutLevel}
        </span>
      </div>
      <div className="mbi-burnout-index__bar-container">
        <div className="mbi-burnout-index__bar" style={{ width: `${percent}%` }} />
      </div>
      {description && (
        <p className="mbi-burnout-index__description">{description}</p>
      )}
    </div>
  );
};

/**
 * Таблица норм для шкалы
 */
const NormsTable = ({ norms, currentScore, title }) => (
  <div className="mbi-norms">
    <h4 className="mbi-norms__title">Нормы: {title}</h4>
    <table className="mbi-norms__table">
      <thead>
        <tr>
          <th>Уровень</th>
          <th>Диапазон баллов</th>
        </tr>
      </thead>
      <tbody>
        {norms.map((norm) => {
          const isActive = currentScore >= norm.min && currentScore <= norm.max;
          return (
            <tr key={norm.label} className={isActive ? 'mbi-norms__row--active' : ''}>
              <td>{norm.label}</td>
              <td>{norm.min}–{norm.max}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/**
 * Основной компонент секции MBI результатов
 */
const MbiScalesSection = ({ mbiResults }) => {
  if (!mbiResults) return null;

  const { scores, levels, burnoutIndex, burnoutLevel, scales, burnoutConfig } = mbiResults;

  return (
    <div className="mbi-scales-section">
      <div className="mbi-scales-section__container">

        {/* Три шкалы */}
        <div className="mbi-scales-section__scales">
          <ScaleRow
            title={scales.exhaustion.title}
            score={scores.exhaustion}
            maxScore={scales.exhaustion.maxScore}
            level={levels.exhaustion}
            description={scales.exhaustion.description}
          />
          <ScaleRow
            title={scales.depersonalization.title}
            score={scores.depersonalization}
            maxScore={scales.depersonalization.maxScore}
            level={levels.depersonalization}
            description={scales.depersonalization.description}
          />
          <ScaleRow
            title={scales.reduction.title}
            score={scores.reduction}
            maxScore={scales.reduction.maxScore}
            level={levels.reduction}
            description={scales.reduction.description}
            invertedNote="По данной шкале интерпретация обратная: чем ниже балл — тем выше выгорание."
          />
        </div>

        {/* Общий индекс выгорания */}
        <BurnoutIndexBlock
          burnoutIndex={burnoutIndex}
          maxScore={burnoutConfig.maxScore}
          burnoutLevel={burnoutLevel}
          description={burnoutConfig.description}
        />

        {/* Таблицы норм */}
        <div className="mbi-scales-section__norms">
          <NormsTable
            title={scales.exhaustion.title}
            norms={scales.exhaustion.norms}
            currentScore={scores.exhaustion}
          />
          <NormsTable
            title={scales.depersonalization.title}
            norms={scales.depersonalization.norms}
            currentScore={scores.depersonalization}
          />
          <NormsTable
            title={`${scales.reduction.title} (обратная шкала)`}
            norms={scales.reduction.norms}
            currentScore={scores.reduction}
          />
          <NormsTable
            title="Общий индекс психического выгорания"
            norms={burnoutConfig.norms}
            currentScore={burnoutIndex}
          />
        </div>

      </div>
    </div>
  );
};

export default MbiScalesSection;
