// src/components/Sections/ResultsSections/ResultsHeader.jsx
// Компонент заголовка результатов тестирования MBI
import React from 'react';


const ResultsHeader = ({ fullName, timeDisplay, showSuccess, setShowSuccess }) => {

  return (
    <div className="result-header">
      <div className="result-header__container">
        <div className="result-header__body">
          <h2 className="result-header__subtitle">Спасибо за ваше участие в тестировании!</h2>
          <div className="result-header__info">
            <div className="result-header__info-item">
              ФИО: <span>{fullName}</span>
            </div>
            <div className="result-header__info-item">
              Дата тестирования: <span>{timeDisplay}</span>
            </div>
          </div>
          <div className="result-header__text">
            Вы прошли опросник на определение уровня психического выгорания (MBI) по К. Маслач и С. Джексон
            (адаптация Н.Е. Водопьяновой). Ниже представлены ваши результаты по трём шкалам и общий индекс
            психического выгорания. Используйте полученные данные для осознания своего состояния и принятия
            своевременных мер для профилактики профессионального выгорания.
          </div>

          {/* Модальное окно успешного шаринга */}
          {showSuccess && (
            <div
              id="successModal"
              className="result-header__modal modal-result-header"
              style={{ display: 'block' }}
              onClick={e => {
                if (e.target === e.currentTarget) setShowSuccess(false);
              }}
            >
              <div className="modal-result-header__content">
                <span className="modal-result-header__close-btn" onClick={() => setShowSuccess(false)}>
                  &times;
                </span>
                <p>Ссылка скопирована!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;