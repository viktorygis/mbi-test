import React from 'react';

const PatternsIntroSection = () => {
  return (
    <div className="patterns-description">
      <div className="patterns-description__container">
        <h2 className="patterns-description__title">Тест определяет четыре типа паттернов:</h2>
        <div className="patterns-description__content">
          <PatternItem
            icon="clock.svg"
            title="Ориентации во времени"
            text="способность человека управлять своими временными ресурсами и планировать свою деятельность."
          />

          <PatternItem
            icon="man.svg"
            title="Поведения"
            text="способность реагирования или действования человека в различных ситуациях."
          />

          <PatternItem
            icon="hands.svg"
            title="Коммуникации"
            text="способность взаимодействия и обмена информацией между людьми."
          />

          <PatternItem
            icon="mind.svg"
            title="Мышления"
            text="способность обработки информации, решения задач и принятия решений."
          />
        </div>

        <div className="patterns-description__text">
          <p>У каждого человека явно проявляется разное количество паттернов, чаще всего 8-10.</p>
          <p>
            Если в тесте указано, что паттерн проявлен Нейтрально — это означает, что данный паттерн
            может проявляться ситуативно, либо у вас нет осознанного выбора в отношении этой стратегии поведения.
          </p>
          <p>Следует помнить, что явно проявленные паттерны – это не значит хорошо или плохо.</p>
          <p>
            Степень проявленности каждого паттерна говорит об индивидуальных особенностях реагирования
            человека и в целом об осознанности его поведения.
          </p>
        </div>
      </div>
    </div>
  );
};

const PatternItem = ({ icon, title, text }) => (
  <div className="patterns-description__item">
    <div className="patterns-description__block">
      <img src={`img/test-mbi/${icon}`} alt={title} />
      <div className="patterns-description__item-title">{title}</div>
    </div>
    <div className="patterns-description__item-text">{text}</div>
  </div>
);

export default PatternsIntroSection;