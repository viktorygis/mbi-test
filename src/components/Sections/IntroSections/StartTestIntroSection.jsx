import React from 'react';

const StartTestIntroSection = ({ onStart }) => (
  <div>
    <div id="button-hipe-test"></div>
    <div className="trek" id="trek">
      <div className="trek__container">
        <div className="trek__body">
          <h2 className="trek__title">Перейти к тестированию</h2>
          <img src="img/test-mbi/fairway-example.svg" alt="Пример фарватера" />
          <button
            id="trek-button"
            className="trek__button button button-primary"
            onClick={onStart}
          >
            Пройти тест
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default StartTestIntroSection;