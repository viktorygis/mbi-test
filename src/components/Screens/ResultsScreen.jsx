import React, { useState, useMemo } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import MbiScalesSection from './../Sections/ResultsSections/MbiScalesSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import ExtrasSection from './../Sections/ResultsSections/ExtrasSection';
import { downloadMbiPDF } from '../../utils/pdf/mbiPdfGenerator';

const ResultsScreen = ({
	mbiResults,
	userData,
	timeDisplay,
	answerIndices = [],
	questions = [],
	answerOptions = [],
}) => {
	const [showSuccess, setShowSuccess] = useState(false);

	// Режим отладки: ?debug=1 или localStorage.getItem('debug') === '1'
	const isDebug = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get('debug') === '1' || localStorage.getItem('debug') === '1';
	}, []);

	// Функция скачивания PDF
	const handleDownloadPDF = () => {
		downloadMbiPDF(mbiResults, userData, timeDisplay).catch((err) => {
			console.error('Ошибка создания PDF:', err);
			alert('Не удалось создать PDF. Попробуйте ещё раз.');
		});
	};

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

	// Строим карту question.id → scale для debug-таблицы
	const questionScaleMap = useMemo(() => {
		if (!mbiResults?.scales) return {};
		const map = {};
		const { exhaustion, depersonalization, reduction } = mbiResults.scales;
		exhaustion?.items?.forEach((id) => { map[id] = exhaustion.title; });
		depersonalization?.items?.forEach((id) => { map[id] = depersonalization.title; });
		reduction?.items?.forEach((id) => { map[id] = reduction.title; });
		return map;
	}, [mbiResults]);

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
				<div className="result-main__download">
					<button className="result-main__download-btn patterns-button" onClick={handleDownloadPDF}>
						⬇ Скачать результаты PDF
					</button>
				</div>
			</div>

			{isDebug && questions.length > 0 && (
				<div style={{ margin: '24px auto', maxWidth: 900, overflowX: 'auto' }}>
					<h3 style={{ textAlign: 'center', marginBottom: 12 }}>🐛 Отладка: выбранные ответы</h3>
					<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
						<thead>
							<tr style={{ background: '#f3f4f6' }}>
								<th style={thStyle}>№</th>
								<th style={thStyle}>Вопрос</th>
								<th style={thStyle}>Ответ (метка)</th>
								<th style={thStyle}>Индекс (0..5)</th>
								<th style={thStyle}>Шкала MBI</th>
							</tr>
						</thead>
						<tbody>
							{questions.map((q, i) => {
								const idx = answerIndices[i];
								const label = (idx !== undefined && idx !== null && answerOptions[idx] !== undefined)
									? answerOptions[idx]
									: '—';
								const scale = questionScaleMap[q.id] ?? '—';
								const isValid = idx !== undefined && idx !== null && idx >= 0 && idx < answerOptions.length;
								if (!isValid && idx !== undefined && idx !== null) {
									console.warn(`[MBI debug] Q${q.id}: answerIndex=${idx} вне диапазона 0..${answerOptions.length - 1}`);
								}
								return (
									<tr key={q.id} style={{ borderBottom: '1px solid #e5e7eb', background: isValid ? undefined : '#fef2f2' }}>
										<td style={tdStyle}>{q.id}</td>
										<td style={{ ...tdStyle, textAlign: 'left' }}>{q.text}</td>
										<td style={tdStyle}>{label}</td>
										<td style={tdStyle}>{idx ?? '—'}</td>
										<td style={tdStyle}>{scale}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			<ExtrasSection onRetakeTest={handleRetakeTest} onShare={handleShare} />

			<LiteratureSection />
		</div>
	);
};

const thStyle = {
	padding: '8px 12px',
	textAlign: 'center',
	borderBottom: '2px solid #d1d5db',
	fontWeight: 600,
};

const tdStyle = {
	padding: '6px 12px',
	textAlign: 'center',
};

export default ResultsScreen;