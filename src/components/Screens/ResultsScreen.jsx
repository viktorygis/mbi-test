// Компонент экрана результатов теста MBI.
import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import MbiScalesSection from './../Sections/ResultsSections/MbiScalesSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';
import { downloadMbiPDF } from '../../utils/pdf/mbiPdfGenerator';
import MbiInformationSection from './../Sections/ResultsSections/MbiInformationSection';

const ENABLE_RESULTS_DEBUG = false;

const ResultsScreen = ({
  mbiResults,
  userData,
  timeDisplay,
  preliminaryAnswers = {},  // ✅ Только для PDF/БД
  answerIndices = [],
  questions = []
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownloadPDF = () => {
    downloadMbiPDF(mbiResults, userData, timeDisplay, {
      preliminaryAnswers,  // ✅ В PDF попадает
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

  // ✅ Отладка (не показываем пользователю)
  if (ENABLE_RESULTS_DEBUG) {
    console.log('Preliminary в БД:', preliminaryAnswers);
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


      <div className="result-main">
        <MbiScalesSection mbiResults={mbiResults} />
        <MbiInformationSection results={mbiResults} />
      </div>

      <ExtrasSection onRetakeTest={handleRetakeTest} />
      <LiteratureSection />
    </div>
  );
};

export default ResultsScreen;