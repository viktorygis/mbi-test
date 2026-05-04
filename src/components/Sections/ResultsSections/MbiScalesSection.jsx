// src/components/Sections/ResultsSections/MbiScalesSection.jsx
import React from 'react';
import { getLevelColor } from '../../../utils/mbi/mbiHelpers';
import { getLevelForScore, getRecommendation, getLevelKey, combinedInterpretation } from '../../../utils/mbi/mbiNorms';

const ICONS = {
  exhaustion: "img/mbi-test/emotional-exhaustion.svg",
  depersonalization: "img/mbi-test/depersonalization.svg",
  reduction: "img/mbi-test/reduced-achievement.svg",
  burnoutIndex: "img/mbi-test/burnout-index.svg",
};

const LEVEL_PRIORITY = {
  veryHigh: 5,
  high: 4,
  mid: 3,
  low: 2,
  veryLow: 1,
};

const SEG_COLORS = {
  veryLow:  "#4ade80",
  low:      "#a3e635",
  mid:      "#fbbf24",
  high:     "#fb923c",
  veryHigh: "#f87171",
};

// Сегментированная цветная полоса
const SegmentedBar = ({ score, maxScore, norms }) => {
  if (!norms || !Array.isArray(norms) || maxScore <= 0) return null;

  const pinPercent = Math.max(0, Math.min((score / maxScore) * 100, 100));

  return (
    <div className="segmented-bar">
      <div className="segmented-bar__pin-row">
        <span
          className="segmented-bar__score-pin"
          style={{ left: `${pinPercent}%` }}
        >
          {score}
        </span>
      </div>
      <div className="segmented-bar__track">
        {norms.map((norm, i) => {
          const levelKey = getLevelKey(norm.label);
          const segWidth = ((norm.max - norm.min + 1) / maxScore) * 100;
          return (
            <div
              key={i}
              className="segmented-bar__segment"
              style={{
                width: `${segWidth}%`,
                backgroundColor: SEG_COLORS[levelKey] ?? "#94a3b8",
              }}
            />
          );
        })}
        <div
          className="segmented-bar__marker"
          style={{ left: `${pinPercent}%` }}
        />
      </div>
      <div className="segmented-bar__labels">
        {norms.map((norm, i) => {
          const segWidth = ((norm.max - norm.min + 1) / maxScore) * 100;
          return (
            <div
              key={i}
              className="segmented-bar__label"
              style={{ width: `${segWidth}%` }}
            >
              {norm.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Одна строка для выводимой шкалы
const ScaleRow = ({ scaleKey, title, icon, score, maxScore, scaleConfig }) => {
  const level = getLevelForScore({ [scaleKey]: scaleConfig }, scaleKey, score);
  const levelColor = getLevelColor(level);
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const rec = getRecommendation({ [scaleKey]: scaleConfig }, scaleKey, score);
  const hasNorms = scaleConfig?.norms && Array.isArray(scaleConfig.norms);

  return (
    <div className="mbi-scale">
      <div className="mbi-scale__header">
        {icon && (
          <div className="mbi-scale__icon-wrap">
            <img src={icon} alt="" className="mbi-scale__icon" />
          </div>
        )}
        <h3 className="mbi-scale__title">{title}</h3>
        {level && (
          <div className="mbi-scale__level-label" style={{ color: levelColor }}>
            {level}
          </div>
        )}
      </div>
      <div className="mbi-scale__score-line">
        <span className="mbi-scale__score">{score}</span>
        <span className="mbi-scale__max"> баллов из {maxScore}</span>
      </div>
      {hasNorms ? (
        <SegmentedBar score={score} maxScore={maxScore} norms={scaleConfig.norms} />
      ) : (
        <>
          <div className="mbi-scale__bar-container">
            <div
              className="mbi-scale__bar"
              style={{ width: `${percent}%`, backgroundColor: levelColor }}
            />
          </div>
          <div className="mbi-scale__bar-labels-row">
            <span>0%</span>
            <span>100%</span>
          </div>
        </>
      )}
      {scaleKey === 'reduction' && (
        <p className="mbi-scale__hint">
          Чем выше балл — тем сильнее выражено снижение ощущения эффективности.
        </p>
      )}
      {rec?.short && (
        <div className="mbi-scale__recommendation">{rec.short}</div>
      )}
      {rec?.details && Array.isArray(rec.details) && rec.details.length > 0 && (
        <ul className="mbi-scale__list">
          {rec.details.map((item, i) => (
            <li key={i} className="mbi-scale__details-item">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Блок с общим индексом выгорания
const BurnoutIndexBlock = ({ burnoutIndex, maxScore, burnoutConfig, icon }) => {
  const burnoutLevel = getLevelForScore({ burnoutIndex: burnoutConfig }, 'burnoutIndex', burnoutIndex);
  const levelColor = getLevelColor(burnoutLevel);
  const percent = maxScore > 0 ? Math.round((burnoutIndex / maxScore) * 100) : 0;
  const rec = getRecommendation({ burnoutIndex: burnoutConfig }, 'burnoutIndex', burnoutIndex);
  const hasNorms = burnoutConfig?.norms && Array.isArray(burnoutConfig.norms);
  const title = burnoutConfig?.title ?? "Общий индекс психического выгорания";

  return (
    <div className="mbi-burnout-index">
      <div className="mbi-burnout-index__header">
        {icon && (
          <div className="mbi-burnout-index__icon-wrap">
            <img src={icon} alt="" className="mbi-burnout-index__icon" />
          </div>
        )}
        <h3 className="mbi-burnout-index__title">{title}</h3>
      </div>
      <div className="mbi-burnout-index__score-row">
        {burnoutLevel && (
          <div className="mbi-burnout-index__level-label" style={{ color: levelColor }}>
            {burnoutLevel}
          </div>
        )}
        <div className="mbi-burnout-index__score-line">
          <span className="mbi-burnout-index__score">{burnoutIndex}</span>
          <span className="mbi-burnout-index__max"> / {maxScore}</span>
        </div>
      </div>
      {hasNorms ? (
        <SegmentedBar score={burnoutIndex} maxScore={maxScore} norms={burnoutConfig.norms} />
      ) : (
        <>
          <div className="mbi-burnout-index__bar-container">
            <div
              className="mbi-burnout-index__bar"
              style={{ width: `${percent}%`, backgroundColor: levelColor }}
            />
          </div>
          <div className="mbi-burnout-index__bar-labels-row">
            <span>0%</span>
            <span>100%</span>
          </div>
        </>
      )}
      {rec?.short && (
        <div className="mbi-burnout-index__recommendation">{rec.short}</div>
      )}
      {rec?.details && Array.isArray(rec.details) && rec.details.length > 0 && (
        <ul className="mbi-burnout-index__list">
          {rec.details.map((item, i) => (
            <li key={i} className="mbi-burnout-index__details-item">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Профиль выгорания
const ProfileSummaryBlock = ({ scores, scalesData }) => {
  const messages = combinedInterpretation(scores, scalesData);
  const hasMessages = Array.isArray(messages) && messages.length > 0;

  return (
    <div className="mbi-profile-summary">
      <p className="mbi-profile-summary__title">Профиль выгорания</p>
      {hasMessages ? (
        <ul className="mbi-profile-summary__list">
          {messages.map((msg, i) => (
            <li key={i} className="mbi-profile-summary__item">{msg}</li>
          ))}
        </ul>
      ) : (
        <p className="mbi-profile-summary__empty">
          Тревожные сочетания по шкалам не выражены.
        </p>
      )}
    </div>
  );
};

// Блок обращения за поддержкой
const SeekHelpBlock = () => (
  <div className="mbi-seek-help">
    <p className="mbi-seek-help__title">Когда стоит обратиться за поддержкой</p>
    <p className="mbi-seek-help__text">
      Если усталость, раздражительность, проблемы со сном или ощущение беспомощности не проходят несколько недель и начинают мешать жизни — имеет смысл обсудить это со специалистом. Это обычный и рабочий способ поддержки.
    </p>
  </div>
);

function getProblemPriority(scaleKey, scaleConfig, score) {
  const level = getLevelForScore({ [scaleKey]: scaleConfig }, scaleKey, score);
  const key = getLevelKey(level);
  return LEVEL_PRIORITY[key] ?? 3;
}

// Основной компонент секции
const MbiScalesSection = ({ mbiResults, scalesData }) => {
  if (!mbiResults) return null;

  const { scores, burnoutIndex, scales, burnoutConfig } = mbiResults;

  const scalesConfig = [
    { key: 'exhaustion',       title: scales.exhaustion.title,       icon: ICONS.exhaustion,       score: scores.exhaustion,       maxScore: scales.exhaustion.maxScore,       config: scales.exhaustion },
    { key: 'depersonalization', title: scales.depersonalization.title, icon: ICONS.depersonalization, score: scores.depersonalization, maxScore: scales.depersonalization.maxScore, config: scales.depersonalization },
    { key: 'reduction',        title: scales.reduction.title,        icon: ICONS.reduction,        score: scores.reduction,        maxScore: scales.reduction.maxScore,        config: scales.reduction },
  ].sort((a, b) => getProblemPriority(b.key, b.config, b.score) - getProblemPriority(a.key, a.config, a.score));

  return (
    <div className="mbi-scales-section">
      <div className="mbi-scales-section__container">
        {/* Блок 1: Итоговый результат */}
        <h2 className="mbi-scales-section__title">Итоговый результат</h2>
        <p className="mbi-scales-section__subtitle">
          Чем выше балл, тем выше ваш уровень профессионального выгорания.
        </p>
        <BurnoutIndexBlock
          burnoutIndex={burnoutIndex}
          icon={ICONS.burnoutIndex}
          maxScore={burnoutConfig.maxScore}
          burnoutConfig={burnoutConfig}
        />
        <ProfileSummaryBlock scores={scores} scalesData={scalesData} />

        {/* Блок 2: Расшифровка результата */}
        <h2 className="mbi-scales-section__breakdown-title">Расшифровка результата</h2>
        <div className="mbi-scales-section__scales">
          {scalesConfig.map(({ key, title, icon, score, maxScore, config }) => (
            <ScaleRow
              key={key}
              scaleKey={key}
              title={title}
              icon={icon}
              score={score}
              maxScore={maxScore}
              scaleConfig={config}
            />
          ))}
        </div>
        <SeekHelpBlock />
      </div>
    </div>
  );
};

export default MbiScalesSection;