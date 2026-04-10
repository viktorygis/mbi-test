import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import HistogramSection from './../Sections/ResultsSections/HistogramSection';
import InterpretationSection from './../Sections/ResultsSections/InterpretationSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import CategoryResultsSection from './../Sections/ResultsSections/CategoryResultsSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';

const ResultsScreen = ({
	resultsData,
	answers,
	categories,
	patternResults,
	topPatterns,
	topCategory,
	patternMessage,
	opportunities,
	behaviorModel,
	strengths
}) => {
	const [showSuccess, setShowSuccess] = useState(false);

	// Функция для повторного прохождения теста
	const handleRetakeTest = () => {
		window.open('https://ai4g.ru/test-mbi', '_blank');
	};

	// Функция для шаринга результата (можно доработать)
	const handleShare = () => {
		const shareUrl = 'https://ai4g.ru/test-mbi';
		if (navigator.share) {
			navigator.share({
				title: 'Мой результат теста на паттерны',
				url: shareUrl,
			}).then(() => setShowSuccess(true));
		} else {
			navigator.clipboard.writeText(shareUrl);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 2000);
		}
	};

	return (
		<div className="result">
			<ResultsHeader
				resultsData={resultsData}
				showSuccess={showSuccess}
				setShowSuccess={setShowSuccess}
			/>

			<div className="result-main">
				<h2 className="result-main__subtitle">Результаты вашего тестирования</h2>
				<HistogramSection
					categories={categories}
					patternResults={patternResults}
					topCategory={resultsData.topCategory}
				/>
				<InterpretationSection
					topCategory={resultsData.topCategory}
					patternMessage={patternMessage}
					topPatterns={topPatterns}
					opportunities={opportunities}
					strengths={strengths}
					responseType={resultsData.responseType}
				/>
			</div>

			<CategoryResultsSection categories={categories} patternResults={patternResults} />

			{/* Новая секция со всеми дополнительными материалами, контактами, повторным тестом и пр. */}
			{/* onRetakeTest это функция, которая будет вызвана при нажатии на кнопку "Пройти тест повторно", handleRetakeTest это функция для повторного прохождения теста */}
			{/* Можно передать onShare для шаринга результата handleShare это функция для шаринга результата */}
			<ExtrasSection onRetakeTest={handleRetakeTest} onShare={handleShare} />

			<LiteratureSection />
		</div>
	);
};

export default ResultsScreen;