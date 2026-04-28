// MbiRecommendationsSection.jsx - отображение рекомендаций по результатам теста MBI

import { getLevelForScore, getRecommendation, combinedInterpretation } from '../../../utils/mbiNorms';
import RecommendationCard from './RecommendationCard';

const ICONS = {
  exhaustion: "img/mbi-test/emotional-exhaustion.svg",
  depersonalization: "img/mbi-test/depersonalization.svg",
  reduction: "img/mbi-test/reduced-achievement.svg",
  burnoutIndex: "img/mbi-test/burnout-index.svg",
};

const TITLES = {
  exhaustion: "Эмоциональное истощение",
  depersonalization: "Деперсонализация",
  reduction: "Редукция профессиональных достижений",
};

const MbiRecommendationsSection = ({ mbiResults, scales }) => {
  const cards = buildRecommendations(mbiResults, scales);
  const showNeutral = cards.length === 0;
  const combined = mbiResults && mbiResults.scores
    ? combinedInterpretation(mbiResults.scores)
    : [];

  return (
    <section className="mbi-recommendations" aria-labelledby="mbi-recommendations-title">
      <div className="mbi-recommendations__container">
        <h2 className="mbi-recommendations__title" id="mbi-recommendations-title">
          Рекомендации по результатам
        </h2>
        {showNeutral ? (
          <div className="mbi-recommendations__neutral">
            У вас нет выраженных рисков эмоционального выгорания по основным шкалам. Поддерживайте профилактические практики и наблюдайте за своим состоянием.
          </div>
        ) : (
          <>
            <div className="mbi-recommendations__grid">
              {cards.map(card => (
                <RecommendationCard
                  key={card.key}
                  icon={card.icon}
                  title={card.title}
                  level={card.level}
                  recommendation={card.recommendation}
                />
              ))}
            </div>
            {combined && combined.length > 0 && (
              <div className="mbi-recommendations__combined">
                <div className="mbi-recommendations__combined-header">
                  <div className="mbi-recommendations__combined-icon-wrap">
                    <img
                      className="mbi-recommendations__combined-icon"
                      src="img/mbi-test/burnout-index.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mbi-recommendations__combined-title">
                    Профиль выгорания
                  </h3>
                </div>
                <div className="mbi-recommendations__combined-text">
                  {combined}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

function buildRecommendations(mbiResults, scales) {
  if (!mbiResults || !mbiResults.scores || !scales) {
    return [];
  }
  const keys = ["exhaustion", "depersonalization", "reduction"];
  return keys.map(key => {
    const score = mbiResults.scores[key];
    const recommendation = getRecommendation(scales, key, score);
    const levelLabel = getLevelForScore(scales, key, score);
    if (!recommendation) return null;
    return {
      key,
      icon: ICONS[key],
      title: TITLES[key],
      level: levelLabel,
      recommendation,
    };
  }).filter(Boolean);
}

export default MbiRecommendationsSection;