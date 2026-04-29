import React from 'react';

const ResultsHeader = ({ fullName, timeDisplay, showSuccess, setShowSuccess, onDownloadPDF }) => {
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
            Вы прошли опросник MBI по методике К. Маслач и С. Джексон. Ниже представлены результаты по трём шкалам
            и общий индекс психического выгорания.
          </div>

          <div className="result-header__download">
            <span className="result-header__download-text">
              Скачать отчет в формате PDF
            </span>

            <button
              type="button"
              className="result-header__download-btn button"
              onClick={onDownloadPDF}
            >
              📄 Скачать PDF
            </button>
          </div>

          {showSuccess && (
            <div
              id="successModal"
              className="result-header__modal modal-result-header"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowSuccess(false);
              }}
            >
              <div className="modal-result-header__content" role="dialog" aria-modal="true" aria-labelledby="success-title">
                <button
                  type="button"
                  className="modal-result-header__close-btn"
                  onClick={() => setShowSuccess(false)}
                  aria-label="Закрыть сообщение"
                >
                  ×
                </button>

                <p id="success-title">Ссылка скопирована!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;