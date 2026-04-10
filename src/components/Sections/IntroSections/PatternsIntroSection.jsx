import React from 'react';

const PatternsIntroSection = () => {
  return (
    <div className="patterns-description">
      <div className="patterns-description__container">
        <h2 className="patterns-description__title">Тест оценивает три компонента выгорания:</h2>
        <div className="patterns-description__content">
          <PatternItem
            icon="mind.svg"
            title="Психоэмоциональное истощение"
            text="Процесс исчерпания эмоциональных, физических и энергетических ресурсов. Проявляется в хроническом утомлении, равнодушии, раздражительности. (9 утверждений, макс. 54 балла)"
          />

          <PatternItem
            icon="man.svg"
            title="Деперсонализация"
            text="Специфическая форма социальной дезадаптации: уменьшение контактов, повышение раздражительности, негативизм по отношению к коллегам и подопечным. (5 утверждений, макс. 30 баллов)"
          />

          <PatternItem
            icon="hands.svg"
            title="Редукция личных достижений"
            text="Снижение чувства компетентности, недовольство собой, уменьшение ценности своей деятельности. По этой шкале интерпретация обратная: чем ниже балл — тем выше выгорание. (8 утверждений, макс. 48 баллов)"
          />
        </div>

        <div className="patterns-description__text">
          <p>Опросник содержит 22 утверждения. Для каждого выберите, как часто вы испытываете описанное состояние.</p>
          <p>
            Общий индекс психического выгорания рассчитывается как сумма всех трёх компонентов
            (для шкалы «Редукция» используется обратное значение). Максимум: 132 балла.
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