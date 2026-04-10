//	src/components/Sections/ResultsSections/ResultsHeader.jsx
//	Компонент заголовка результатов тестирования паттернов реагирования
import React, { useEffect } from 'react';
import { downloadPDF } from '../../../utils/pdf/pdfmakeGenerator';


const ResultsHeader = ({ loading, showSuccess, setShowSuccess, resultsData }) => {

  //	Сохраняем данные результатов в глобальную переменную для отладки
  useEffect(() => {
    if (resultsData) {
      window._resultsData = resultsData;
    }
  }, [resultsData]);

  //	Обработчик клика по кнопке скачать PDF
  const handleDownloadPDF = async () => {
    //Если уже идет загрузка, ничего не делаем
    if (loading) return;

    //Загружаем описания типов реагирования из внешнего JSON
    let responseTypeTexts = null;
    try {
      //res - ответ от fetch (асинхронный)
      const res = await fetch('/data/responseTypes.json');
      //responseTypeTexts - парсим JSON из ответа
      responseTypeTexts = await res.json();
    } catch (error) {
      console.error(error);
      alert('Не удалось загрузить описания типов реагирования для PDF!');
      return;
    }
    //	Генерируем и скачиваем PDF с результатами теста
    downloadPDF({
      //resultsData - данные результатов теста
      ...resultsData,
      //responseTypeTexts - описания типов реагирования
      responseTypeTexts,
    });
    //	Показываем модальное окно успешной загрузки
    setShowSuccess(true);
  };

  //	Данные пользователя
  const fullName = resultsData?.fullName || "";
  const timeDisplay = resultsData?.timeDisplay || "";

  //	Рендер компонента
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
            Вы сделали важный шаг к осознанию своих привычных моделей реагирования и поведения. Понимание своих паттернов помогает лучше понять, как вы
            взаимодействуете с окружающим миром, и позволяет находить баланс между личными потребностями и внешними вызовами. Используйте эту информацию
            для развития своих сильных сторон и эффективного преодоления возможных ограничений. Каждый паттерн – это ваш ресурс, который может быть
            направлен в нужное вам русло.
          </div>
          {/*	Блок скачать PDF */}
          <div className="result-header__download download">
            {/*	Лоадер при генерации PDF */}
            {loading && (
              <div className="download__loader  loader">
                <div className="loader__overlay">
                  <div className="loader__spinner"></div>
                  <p id="loader__text">Подождите, идет генерация PDF...</p>
                </div>
              </div>
            )}
            {/*	Заголовок скачать PDF */}
            <div className="download__title">Скачать ваш отчет в формате pdf</div>

            {/* кнопка скачать */}
            <button
              className="patterns-button patterns-button-download"
              onClick={handleDownloadPDF}
              disabled={loading}
            >
              Скачать PDF
            </button>

            {/* Модальное окно успешной загрузки */}
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
                  <p>Файл успешно скачан!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;