// Компонент экрана результатов теста MBI.
import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import MbiScalesSection from './../Sections/ResultsSections/MbiScalesSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';
import { downloadMbiPDF } from '../../utils/pdf/mbiPdfGenerator';
import MbiInformationSection from './../Sections/ResultsSections/MbiInformationSection';
//import MbiRecommendationsSection from './../Sections/ResultsSections/MbiRecommendationsSection';

// Один флаг — и вся отладка отключена.
// Если хочешь убрать полностью — просто удали импорт и блок ниже.
const ENABLE_RESULTS_DEBUG = false;

const ResultsScreen = ({
  mbiResults,
  userData,
  timeDisplay,
  preliminaryAnswers = {},  // ✅ Новый проп (fallback на {})
  answerIndices = [],       // ✅ Для PDF/отладки
  questions = []            // ✅ Для PDF/отладки
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownloadPDF = () => {
    downloadMbiPDF(mbiResults, userData, timeDisplay, {
      preliminaryAnswers,  // ✅ Передаем в PDF
      answerIndices,
      questions
    }).catch((err) => {
      console.error('Ошибка создания PDF:', err);
      alert('Не удалось создать PDF. Попробуйте ещё раз.');
    });
  };

  const handleRetakeTest = () => {
    window.open('https://ai4g.ru/mbi-test/', '_blank');
  };

  const fullName = userData?.fullName || '';

  // ✅ Форматируем preliminary для красивого показа
  const formatPreliminary = (answers) => {
    const ageMap = {
      'до 25 лет': 'молодой специалист',
      '25-35': 'средний возраст',
      '35-45': 'опытный специалист',
      '45+': 'ветеран'
    };

    const occupationMap = {
      'Топ-менеджер': '📈 Топ-менеджер',
      'Предприниматель': '🚀 Предприниматель',
      'Студент': '🎓 Студент',
      'Наемный работник': '💼 Наемный сотрудник',
      'В поиске': '🔍 В поиске работы',
      'Домохозяйка': '🏠 Домохозяйка',
      'Другое': '❓ Другое'
    };

    return {
      age: ageMap[answers.age] || answers.age || 'Не указано',
      occupation: occupationMap[answers.occupation] || answers.occupation || 'Не указано',
      priority: answers.priority || 'Не указано'
    };
  };

  const formattedPreliminary = formatPreliminary(preliminaryAnswers);

  // ✅ Отладка (если ENABLE_RESULTS_DEBUG = true)
  if (ENABLE_RESULTS_DEBUG) {
    console.log('ResultsScreen debug:', {
      preliminaryAnswers,
      formattedPreliminary,
      mbiResults,
      userData
    });
  }

  return (
    <div className="result">
      <ResultsHeader
        fullName={fullName}
        timeDisplay={timeDisplay}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* ✅ НОВЫЙ БЛОК: Предварительная информация */}
 {/*      {Object.values(formattedPreliminary).some(v => v !== 'Не указано') && (
        <div className="preliminary-info" style={{
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%)',
          border: '1px solid #d1d9ff',
          borderRadius: '12px',
          padding: '20px',
          margin: '20px 0',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
        }}>
          <h3 style={{ color: '#6366f1', margin: '0 0 16px 0', fontSize: '1.2em' }}>
            👤 Ваш профиль
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <strong>Возраст:</strong> <span>{formattedPreliminary.age}</span>
            </div>
            <div>
              <strong>Занятие:</strong> <span>{formattedPreliminary.occupation}</span>
            </div>
            <div>
              <strong>Приоритет:</strong> <span>{formattedPreliminary.priority}</span>
            </div>
          </div>
        </div>
      )} */}

      <div className="result-main">
        <MbiScalesSection mbiResults={mbiResults} />
        {/* <MbiRecommendationsSection mbiResults={mbiResults} scales={mbiResults?.scales} /> */}

        <MbiInformationSection results={mbiResults} />
      </div>

      <ExtrasSection onRetakeTest={handleRetakeTest} />
      <LiteratureSection />
    </div>
  );
};

export default ResultsScreen;