import React from "react";

const OfferIntroSection = () => {
  return (
    <section className="offer-test" aria-labelledby="offer-test-title">
      <div className="offer-test__container">
        <div className="offer-test__body">
          <div className="offer-test__content">
            <div className="offer-test__overhead overhead">
              Опросник для оценки признаков профессионального выгорания
            </div>

            <h1 className="offer-test__title" id="offer-test-title">
              Тест MBI
            </h1>

            <div className="offer-test__subtitle">
              <span>на определение уровня психического выгорания Маслач</span>
            </div>

            <p className="offer-test__lead">
              За 5 минут ты поймёшь не «что-то не так», а конкретно — что именно и насколько.
            </p>

            <div className="offer-test__bullets" role="list">
              <div className="offer-test__bullet offer-test__bullet--exhaustion" role="listitem">
                <div className="offer-test__bullet-icon">
                  <img src="img/mbi-test/emotional-exhaustion.svg" alt="" />
                </div>
                <div className="offer-test__bullet-body">
                  <span className="offer-test__bullet-num">01</span>
                  <div className="offer-test__bullet-title">Эмоциональное истощение</div>
                  <div className="offer-test__bullet-text">насколько ты эмоционально истощён</div>
                </div>
              </div>

              <div className="offer-test__bullet offer-test__bullet--depersonalization" role="listitem">
                <div className="offer-test__bullet-icon">
                  <img src="img/mbi-test/depersonalization.svg" alt="" />
                </div>
                <div className="offer-test__bullet-body">
                  <span className="offer-test__bullet-num">02</span>
                  <div className="offer-test__bullet-title">Деперсонализация</div>
                  <div className="offer-test__bullet-text">не стал ли ты относиться к людям и работе холоднее, чем раньше</div>
                </div>
              </div>

              <div className="offer-test__bullet offer-test__bullet--reduction" role="listitem">
                <div className="offer-test__bullet-icon">
                  <img src="img/mbi-test/reduced-achievement.svg" alt="" />
                </div>
                <div className="offer-test__bullet-body">
                  <span className="offer-test__bullet-num">03</span>
                  <div className="offer-test__bullet-title">Редукция достижений</div>
                  <div className="offer-test__bullet-text">ощущаешь ли ты, что твои усилия дают результат</div>
                </div>
              </div>
            </div>

            <p className="offer-test__text">
              Тест MBI разработан профессором К. Маслач из Стэнфорда — сегодня это золотой стандарт диагностики,
              который используется в корпоративной и клинической практике по всему миру.
            </p>

            <div className="offer-test__bottom">
              <a href="#button-hipe-test" className="offer-test__button button">
                Пройти тест
              </a>

              <div className="offer-test__bottom-right">
                <div className="offer-test__clarification">≈ 5 минут</div>
              </div>
            </div>
            <div className="offer-test__trust-list" aria-label="Короткие факты о тесте">
              <div className="offer-test__trust-item">✓ 22 вопроса</div>
              <div className="offer-test__trust-item">✓ 3 шкалы</div>
              <div className="offer-test__trust-item">✓ международный стандарт</div>
            </div>
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
