import React from 'react';

const OfferIntroSection = () => {
  return (
    <div className="offer-test">
      <div className="offer-test__container">
        <div className="offer-test__body">
          <div className="offer-test__content">
            <div className="offer-test__overhead overhead">
              Опросник для оценки признаков профессионального выгорания
            </div>
            <h1 className="offer-test__title">Тест MBI</h1>

            <div className="offer-test__subtitle">
              <span>на определение уровня психического выгорания Маслач</span>
            </div>

            <div className="offer-test__text">
              Профессиональное (эмоциональное) выгорание рассматривается как результат хронического
              стресса на рабочем месте, с которым не удалось справиться. В международной практике оно
              описывается тремя ключевыми проявлениями: ощущением истощения энергии, ростом
              эмоциональной отстранённости/циничного отношения к работе и снижением чувства
              профессиональной эффективности (личных достижений).
            </div>

            <div className="offer-test__text">
              Опросник <b>MBI</b>, разработанный К. Маслач и С. Джексон, считается одним из наиболее
              используемых инструментов для измерения выгорания в исследованиях. Данный вариант
              опросника адаптирован Н.Е. Водопьяновой. Результаты помогут оценить выраженность
              эмоционального истощения, деперсонализации/цинизма и снижения профессиональной
              эффективности.
            </div>

            <div className="offer-test__text">
              Важно: тест носит информационный характер и не является медицинской диагностикой.
              Если вы чувствуете выраженное ухудшение самочувствия или вам нужна поддержка —
              обратитесь к специалисту.
            </div>

            <div className="offer-test__bottom">
              <a href="#button-hipe-test" className="offer-test__button patterns-button">Пройти тест</a>
              <div className="offer-test__clarification">Попробуй прямо сейчас</div>
            </div>
          </div>

          <img className="offer-test__image"
            src="img/test-mbi/plane.png"
            alt="Тест MBI" />
        </div>
      </div>
    </div>
  );
};

export default OfferIntroSection;