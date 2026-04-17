import React from "react";

const Badge = ({ children }) => <span className="mbi-description__badge">{children}</span>;

const Chip = ({ children, variant = "default" }) => (
  <span className={`mbi-description__chip mbi-description__chip--${variant}`}>{children}</span>
);

const PatternItem = ({
  icon,
  title,
  questions,
  maxScore,
  description,
  chips = [],
  variant = "default",
}) => (
  <article className={`mbi-description__card mbi-description__card--${variant}`}>
    <header className="mbi-description__card-header">
      <img className="mbi-description__icon" src={`img/test-mbi/${icon}`} alt={title} />

      <div className="mbi-description__headings">
        <div className="mbi-description__title-row">
          <h3 className="mbi-description__card-title">{title}</h3>
          {maxScore != null && <Badge>{maxScore} баллов</Badge>}
        </div>

        <div className="mbi-description__meta-line">
          {questions != null && <span className="mbi-description__meta">{questions} утверждений</span>}

          {chips?.length > 0 && (
            <div className="mbi-description__chips">
              {chips.map((c, idx) => (
                <Chip key={idx} variant={c.variant || "default"}>
                  {c.label}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>

    <div className="mbi-description__card-body">
      <p className="mbi-description__card-text">{description}</p>
    </div>
  </article>
);

const MbiIntroSection = () => {
  return (
    <section className="mbi-description" aria-labelledby="patterns-title">
      <div className="mbi-description__container">
        <h2 className="mbi-description__title" id="patterns-title">
          О тесте
        </h2>

        <div className="mbi-description__lead">
          <p>
            Опросник оценивает три компонента профессионального выгорания. Он содержит 22 утверждения — для каждого выберите,
            как часто вы испытываете описанное состояние.
          </p>
        </div>

        <div className="mbi-description__grid">
          <PatternItem
            icon="emotional-exhaustion.svg"
            title="Психоэмоциональное истощение"
            questions={9}
            maxScore={54}
            description="Исчерпание эмоциональных, физических и энергетических ресурсов. Проявляется в хроническом утомлении, равнодушии и раздражительности."
          />

          <PatternItem
            icon="depersonalization.svg"
            title="Деперсонализация"
            questions={5}
            maxScore={30}
            description="Снижение вовлечённости в общение: меньше контактов, больше раздражительности, негативное отношение к коллегам и окружающим."
          />

          <PatternItem
            icon="reduced-achievement.svg"
            title="Редукция личных достижений"
            questions={8}
            maxScore={48}
            chips={[{ label: "обратная шкала", variant: "warning" }]}
            description="Снижение чувства компетентности и удовлетворённости своей работой. По этой шкале интерпретация обратная: чем ниже балл — тем выше выгорание."
          />

          <PatternItem
            icon="burnout-index.svg"
            title="Итоговый индекс выгорания"
            maxScore={132}
            chips={[{ label: "сумма 3 шкал", variant: "info" }]}
            description="Рассчитывается по всем трём шкалам с учётом обратного значения по шкале «Редукция»."
            variant="total"
          />
        </div>
      </div>
    </section>
  );
};

export default MbiIntroSection;