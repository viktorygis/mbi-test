import React from "react";

const ICONS = {
  exhaustion: "img/test-mbi/emotional-exhaustion.svg",
  depersonalization: "img/test-mbi/depersonalization.svg",
  reduction: "img/test-mbi/reduced-achievement.svg",
  burnoutIndex: "img/test-mbi/burnout-index.svg",
};

// Нормализация: "Высокое/Высокий/Высокая" → high, "Крайне высокое" → veryHigh, и т.п.
function normalizeLevelKey(levelLabel) {
  const s = String(levelLabel || "").trim().toLowerCase().replaceAll("ё", "е");
  if (s.startsWith("крайне низк")) return "veryLow";
  if (s.startsWith("низк")) return "low";
  if (s.startsWith("средн")) return "mid";
  if (s.startsWith("высок")) return "high";
  if (s.startsWith("крайне высок")) return "veryHigh";
  return null;
}

function isHighOrVeryHigh(level) {
  const k = normalizeLevelKey(level);
  return k === "high" || k === "veryHigh";
}

function isLowOrVeryLow(level) {
  const k = normalizeLevelKey(level);
  return k === "low" || k === "veryLow";
}

/**
 * ВАЖНО про редукцию:
 * - В вашей логике MBI reduction — обратная шкала по смыслу выгорания.
 * - Но нормы в questions.json уже составлены так, что label отражает "уровень выгорания",
 *   поэтому здесь мы ориентируемся на levels.reduction как на уровень выгорания.
 */
function buildRecommendations(mbiResults) {
  if (!mbiResults) return [];

  const { levels, scales } = mbiResults;

  const recommendationsConfig = [
    { key: "exhaustion", level: levels?.exhaustion },
    { key: "depersonalization", level: levels?.depersonalization },
    { key: "reduction", level: levels?.reduction },
  ];

  return recommendationsConfig.reduce((cards, config) => {
    const scaleInterpretations = scales?.[config.key]?.interpretations;
    if (!scaleInterpretations) return cards;

    const interpretationKey = isHighOrVeryHigh(config.level)
      ? "high"
      : isLowOrVeryLow(config.level)
        ? "low"
        : null;

    const interpretation = interpretationKey ? scaleInterpretations[interpretationKey] : null;
    if (!interpretation) return cards;

    cards.push({
      key: config.key,
      icon: ICONS[config.key],
      ...interpretation,
    });

    return cards;
  }, []);
}

const MbiRecommendationsSection = ({ mbiResults }) => {
  const cards = buildRecommendations(mbiResults);

  // Если нет ни одного триггера — можно показать нейтральную карточку
  const showNeutral = cards.length === 0;

  return (
    <section className="mbi-recommendations" aria-labelledby="mbi-recommendations-title">
      <div className="mbi-recommendations__container">
        <h2 className="mbi-recommendations__title" id="mbi-recommendations-title">
          Рекомендации по результатам
        </h2>

        {showNeutral ? (
          <div className="mbi-recommendations__neutral">
            Уровни по шкалам находятся в средней зоне. Если есть субъективное ощущение перегрузки — ориентируйтесь на самочувствие
            и добавляйте восстановление.
          </div>
        ) : (
          <div className="mbi-recommendations__grid">
            {cards.map((c) => (
              <article key={c.key} className={`mbi-recommendations__card mbi-recommendations__card--${c.tone}`}>
                <div className="mbi-recommendations__header">
                  <div className="mbi-recommendations__icon-wrap" aria-hidden="true">
                    <img className="mbi-recommendations__icon" src={c.icon} alt="" />
                  </div>
                  <div className="mbi-recommendations__heading">
                    <div className="mbi-recommendations__card-title">{c.title}</div>
                  </div>
                </div>

                <div className="mbi-recommendations__text">{c.text}</div>

                {c.actions?.length > 0 && (
                  <ul className="mbi-recommendations__list">
                    {c.actions.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MbiRecommendationsSection;
