// Компонент экрана результатов теста MBI.
import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import MbiScalesSection from './../Sections/ResultsSections/MbiScalesSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';
import { downloadMbiPDF } from '../../utils/pdf/mbiPdfGenerator';
import MbiInterpretationSection from './../Sections/ResultsSections/MbiInterpretationSection';
import MbiRecommendationsSection from './../Sections/ResultsSections/MbiRecommendationsSection';

// Один флаг — и вся отладка отключена.
// Если хочешь убрать полностью — просто удали импорт и блок ниже.
const ENABLE_RESULTS_DEBUG = false;

const ResultsScreen = ({
  mbiResults,
  userData,
  timeDisplay,
  answerIndices = [],
  questions = [],
  answerOptions = [],
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownloadPDF = () => {
    downloadMbiPDF(mbiResults, userData, timeDisplay).catch((err) => {
      console.error('Ошибка создания PDF:', err);
      alert('Не удалось создать PDF. Попробуйте ещё раз.');
    });
  };

  const handleRetakeTest = () => {
    window.open('https://ai4g.ru/mbi-test/', '_blank');
  };

  const fullName = userData?.fullName || '';

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
        <MbiRecommendationsSection mbiResults={mbiResults} />
        <MbiInterpretationSection results={mbiResults} />

      </div>
      <ExtrasSection onRetakeTest={handleRetakeTest} />
      <LiteratureSection />
    </div>
  );
};

export default ResultsScreen;