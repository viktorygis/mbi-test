import { getLevelForScore, getRecommendation, combinedInterpretation } from '../../../utils/mbiNorms';
import RecommendationCard from './RecommendationCard';

const ICONS = {
  exhaustion: "img/test-mbi/emotional-exhaustion.svg",
  depersonalization: "img/test-mbi/depersonalization.svg",
  reduction: "img/test-mbi/reduced-achievement.svg",
  burnoutIndex: "img/test-mbi/burnout-index.svg",
};

const TITLES = {
  exhaustion: "Эмоциональное истощение",
  depersonalization: "Деперсонализация",
  reduction: "Редукция профессиональных достижений",
};

function buildRecommendations(mbiResults) {
  if (!mbiResults) return [];
  const { scores } = mbiResults;
  const keys = ["exhaustion", "depersonalization", "reduction"];
  return keys.map(key => {
    const score = scores[key];
    const levelLabel = getLevelForScore(key, score);
    const recommendation = getRecommendation(key, score);
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

const MbiRecommendationsSection = ({ mbiResults }) => {
  const cards = buildRecommendations(mbiResults);
  const showNeutral = cards.length === 0;
  const combined =
    mbiResults && Array.isArray(mbiResults.scores)
      ? combinedInterpretation(mbiResults.scores)
      : mbiResults
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
                    src="img/test-mbi/burnout-index.svg"
                    alt=""
                    aria-hidden="true"
                  />  </div>
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

export default MbiRecommendationsSection;