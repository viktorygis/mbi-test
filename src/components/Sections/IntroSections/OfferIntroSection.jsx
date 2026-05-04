import React from "react";

const bullets = [
  {
    id: "exhaustion",
    num: "01",
    title: "Эмоциональное истощение",
    text: "насколько вы чувствуете нехватку ресурса",
    icon: "img/mbi-test/emotional-exhaustion.svg",
    modifier: "exhaustion",
  },
  {
    id: "depersonalization",
    num: "02",
    title: "Деперсонализация",
    text: "не стало ли общение холоднее и формальнее",
    icon: "img/mbi-test/depersonalization.svg",
    modifier: "depersonalization",
  },
  {
    id: "reduction",
    num: "03",
    title: "Редукция личных достижений",
    text: "ощущаете ли вы, что ваши усилия дают результат",
    icon: "img/mbi-test/reduced-achievement.svg",
    modifier: "reduction",
  },
];

const trustFacts = ["22 вопроса", "3 шкалы", "международная методика"];

const OfferIntroSection = () => {
  return (
    <section className="offer-test" aria-labelledby="offer-test-title">
      <div className="offer-test__container">
        <div className="offer-test__body">
          <div className="offer-test__content">
            <div className="offer-test__overhead overhead">
              Тест для оценки признаков профессионального выгорания
            </div>

            <h1 className="offer-test__title" id="offer-test-title">
              MBI Test
            </h1>

            <div className="offer-test__subtitle">
              <span>Тест на определение уровня психического выгорания</span>
            </div>

            <p className="offer-test__lead">
              За 5 минут вы поймёте, какие именно признаки выгорания выражены сильнее всего.
            </p>

            <div className="offer-test__bullets" role="list" aria-label="Шкалы теста MBI">
              {bullets.map((item) => (
                <div
                  key={item.id}
                  className={`offer-test__bullet offer-test__bullet--${item.modifier}`}
                  role="listitem"
                >
                  <div className="offer-test__bullet-icon" aria-hidden="true">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="offer-test__bullet-body">
                    <span className="offer-test__bullet-num">{item.num}</span>
                    <div className="offer-test__bullet-title">{item.title}</div>
                    <div className="offer-test__bullet-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="offer-test__text">
              MBI — один из самых известных опросников для оценки эмоционального истощения,
              деперсонализации и снижения ощущения эффективности.
            </p>

            <div className="offer-test__bottom">
              <a href="#button-hipe-test" className="offer-test__button button">
                Пройти тест
              </a>

              <div className="offer-test__bottom-right">
                <div className="offer-test__clarification">≈ 5 минут</div>
              </div>
            </div>

            <ul className="offer-test__trust-list" aria-label="Короткие факты о тесте">
              {trustFacts.map((fact) => (
                <li key={fact} className="offer-test__trust-item">
                  ✓ {fact}
                </li>
              ))}
            </ul>

            <p className="offer-test__note">
              Тест носит информационный характер и не заменяет консультацию специалиста.
            </p>
          </div>

          <div className="offer-test__visual" aria-hidden="true">
            <div className="offer-test__visual-bg"></div>
            <div className="offer-test__visual-grid">
              <div className="offer-test__visual-item offer-test__visual-item--exhaustion">
                <div className="offer-test__visual-circle"></div>
                <img src="img/mbi-test/emotional-exhaustion.svg" alt="" />
              </div>
              <div className="offer-test__visual-item offer-test__visual-item--depersonalization">
                <div className="offer-test__visual-circle"></div>
                <img src="img/mbi-test/depersonalization.svg" alt="" />
              </div>
              <div className="offer-test__visual-item offer-test__visual-item--reduction">
                <div className="offer-test__visual-circle"></div>
                <img src="img/mbi-test/reduced-achievement.svg" alt="" />
              </div>
              <div className="offer-test__visual-item offer-test__visual-item--index">
                <div className="offer-test__visual-circle"></div>
                <img src="img/mbi-test/burnout-index.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferIntroSection;