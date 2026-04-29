import React from "react";

const responseOptions = [
  "Никогда",
  "Очень редко",
  "Иногда",
  "Часто",
  "Очень часто",
  "Каждый день",
];

const steps = [
  {
    number: "1",
    text: "Ответьте, как часто вы испытываете перечисленные чувства. Для каждого утверждения выберите вариант, который лучше всего описывает ваши переживания.",
    list: true,
  },
  {
    number: "2",
    text: "Тест состоит из 22 утверждений. Прохождение займёт около 5 минут. Отвечайте честно и не задерживайтесь надолго на каждом пункте.",
  },
];

const InstructionItem = ({ number, children }) => (
  <li className="instruction-test__item _anim-items _anim-no-hide">
    <div className="instruction-test__number-item" aria-hidden="true">
      {number}.
    </div>
    <div className="instruction-test__text-item">{children}</div>
  </li>
);

const InstructionIntroSection = () => {
  return (
    <section className="instruction-test" id="instruction-test" aria-labelledby="instruction-test-title">
      <div className="instruction-test__container">
        <div className="instruction-test__body">
          <h2 className="instruction-test__title _anim-items _anim-no-hide" id="instruction-test-title">
            Инструкция
          </h2>

          <div className="instruction-test__content">
            <InstructionItem number="1">
              <p>
                Ответьте, как часто вы испытываете чувства, перечисленные ниже. Для каждого утверждения выберите вариант,
                который лучше всего описывает ваши переживания.
              </p>

              <ul className="instruction-test__list">
                {responseOptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InstructionItem>

            <InstructionItem number="2">
              <p>
                Тест состоит из 22 утверждений. Прохождение займёт около 5 минут. Отвечайте честно и не задерживайтесь
                надолго на каждом пункте.
              </p>
            </InstructionItem>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructionIntroSection;