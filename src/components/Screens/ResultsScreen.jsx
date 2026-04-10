import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import MbiScalesSection from './../Sections/ResultsSections/MbiScalesSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';

const ResultsScreen = ({
	mbiResults,
	userData,
	timeDisplay,
}) => {
	const [showSuccess, setShowSuccess] = useState(false);

	// Функция для повторного прохождения теста
	const handleRetakeTest = () => {
		window.open('https://ai4g.ru/test-mbi', '_blank');
	};

	// Функция для шаринга результата
	const handleShare = () => {
		const shareUrl = 'https://ai4g.ru/test-mbi';
		if (navigator.share) {
			navigator.share({
				title: 'Мой результат теста MBI на выгорание',
				url: shareUrl,
			}).then(() => setShowSuccess(true));
		} else {
			navigator.clipboard.writeText(shareUrl);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 2000);
		}
	};

	const fullName = userData?.fullName || '';

	return (
		<div className="result">
			<ResultsHeader
				fullName={fullName}
				timeDisplay={timeDisplay}
				showSuccess={showSuccess}
				setShowSuccess={setShowSuccess}
			/>

			<div className="result-main">
				<h2 className="result-main__subtitle">Результаты вашего тестирования</h2>
				<MbiScalesSection mbiResults={mbiResults} />
			</div>

			<ExtrasSection onRetakeTest={handleRetakeTest} onShare={handleShare} />

			<LiteratureSection />
		</div>
	);
};

export default ResultsScreen;