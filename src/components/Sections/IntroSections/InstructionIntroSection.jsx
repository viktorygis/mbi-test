import React from 'react';

const InstructionIntroSection = () => {
  return (
    <div className="instruction-test" id="instruction-test">
      <div className="instruction-test__container">
        <div className="instruction-test__body">
          <h2 className="instruction-test__title _anim-items _anim-no-hide">Инструкция</h2>

          <div className="instruction-test__content">
            <InstructionItem number="1">
              <p>
                Ответьте, пожалуйста, как часто вы испытываете чувства, перечисленные ниже в опроснике.
                Для этого по каждому пункту отметьте позицию, которая соответствует частоте ваших мыслей и
                переживаний:
              </p>

              <ul  className="instruction-test__list">
                <li>Никогда</li>
                <li>Очень редко</li>
                <li>Иногда</li>
                <li>Часто</li>
                <li>Очень часто</li>
                <li>Каждый день</li>
              </ul>
            </InstructionItem>

            <InstructionItem number="2">
              <p>
                Тест состоит из 22 утверждений. Прохождение займёт около 5 минут. Отвечайте честно и не
                задумывайтесь долго над каждым пунктом — важна ваша первая реакция.
              </p>
            </InstructionItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructionItem = ({ number, children }) => (
  <div className="instruction-test__item _anim-items _anim-no-hide">
    <div className="instruction-test__number-item">{number}.</div>
    <div className="instruction-test__title-item">
      <div className="instruction-test__text-item">{children}</div>
    </div>
  </div>
);

export default InstructionIntroSection;