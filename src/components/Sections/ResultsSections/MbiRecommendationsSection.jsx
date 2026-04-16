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

  const { levels } = mbiResults;

  const cards = [];

  // Эмоциональное истощение
  if (isHighOrVeryHigh(levels.exhaustion)) {
    cards.push({
      key: "exhaustion",
      tone: "danger",
      title: "Высокое эмоциональное истощение",
      icon: ICONS.exhaustion,
      text:
        "Похоже, ресурс сейчас сильно перегружен. В приоритете — восстановление: сон, паузы, снижение темпа и количества задач, пересмотр режима и границ.",
      actions: [
        "Запланируй отдых и восстановление на ближайшие 7–14 дней",
        "Сократи нагрузку: делегирование, перенос дедлайнов, отказ от лишнего",
        "Если состояние держится и мешает жить — стоит обсудить это со специалистом",
      ],
    });
  } else if (isLowOrVeryLow(levels.exhaustion)) {
    cards.push({
      key: "exhaustion",
      tone: "good",
      title: "Низкое эмоциональное истощение",
      icon: ICONS.exhaustion,
      text: "Эмоциональный ресурс в целом сохранён. Важно поддерживать текущий режим и профилактику переутомления.",
      actions: ["Сохраняй регулярный отдых и сон", "Оставляй в графике время без задач", "Отслеживай ранние признаки усталости"],
    });
  }

  // Деперсонализация
  if (isHighOrVeryHigh(levels.depersonalization)) {
    cards.push({
      key: "depersonalization",
      tone: "warning",
      title: "Высокая деперсонализация",
      icon: ICONS.depersonalization,
      text:
        "Похоже, включилась защитная дистанция в отношении людей и общения. Это часто происходит при перегрузке и хроническом стрессе.",
      actions: [
        "Снизь эмоционально затратные контакты, если возможно (перераспределение задач)",
        "Добавь восстановления после общения: короткие паузы, смена деятельности",
        "Проверь связь с истощением: если оно высокое — начни с отдыха и разгрузки",
      ],
    });
  } else if (isLowOrVeryLow(levels.depersonalization)) {
    cards.push({
      key: "depersonalization",
      tone: "good",
      title: "Низкая деперсонализация",
      icon: ICONS.depersonalization,
      text: "Контакт с людьми и вовлечённость в общение сохранены. Это хороший защитный фактор.",
      actions: ["Поддерживай баланс работы и восстановления", "Сохраняй здоровые границы в общении", "Не копи перегрузку — разгружайся заранее"],
    });
  }

  // Редукция (уровень выгорания уже отражён в label)
  if (isHighOrVeryHigh(levels.reduction)) {
    cards.push({
      key: "reduction",
      tone: "danger",
      title: "Снижение ощущения профессиональной эффективности",
      icon: ICONS.reduction,
      text:
        "Есть признаки того, что профессиональная самооценка и ощущение результата просели. Это влияет на мотивацию и повышает риск выгорания.",
      actions: [
        "Сфокусируйся на маленьких измеримых задачах (быстрые победы)",
        "Верни себе обратную связь: что получилось за неделю/месяц",
        "Обсуди ожидания и приоритеты с руководителем/командой",
      ],
    });
  } else if (isLowOrVeryLow(levels.reduction)) {
    cards.push({
      key: "reduction",
      tone: "good",
      title: "Ощущение профессиональной эффективности сохранено",
      icon: ICONS.reduction,
      text: "Самооценка как специалиста и ощущение значимости результатов в порядке — это сильная опора.",
      actions: ["Продолжай фиксировать результаты", "Поддерживай нагрузку на устойчивом уровне", "Сохраняй задачи, которые дают смысл и интерес"],
    });
  }

  return cards;
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