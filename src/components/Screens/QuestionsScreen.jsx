//  Расположение файла: src/components/Screens/QuestionsScreen.jsx
//  QuestionsScreen - экран с вопросами теста MBI (Маслач-Джексон)
import React, { useState, useEffect } from 'react';

//	Основной компонент экрана вопросов
const QuestionsScreen = ({
	questionsUrl = '/data/questions.json',
	onComplete,
	userData,
	timeDisplay = '',
	showTestFillButton = true
}) => {
	const fullName = userData?.fullName || "";

	const [mbiData, setMbiData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// answerIndices[i] - индекс выбранного варианта ответа (0..5) для вопроса i
	const [answerIndices, setAnswerIndices] = useState([]);
	const [showError, setShowError] = useState(false);
	const [selected, setSelected] = useState(null);
	const [error, setError] = useState('');
	const [autoLoading, setAutoLoading] = useState(false);

	useEffect(() => {
		const loadQuestions = async () => {
			try {
				setLoading(true);
				setError('');
				const response = await fetch(questionsUrl);
				if (!response.ok) throw new Error(`Ошибка HTTP: статус ${response.status}`);
				const data = await response.json();
				if (!Array.isArray(data.questions) || data.questions.length === 0) {
					throw new Error('Данные вопросов не найдены.');
				}
				setMbiData(data);
				setAnswerIndices([]);
				setCurrentQuestionIndex(0);
				setSelected(null);
			} catch (err) {
				setError(err.message || 'Ошибка загрузки вопросов');
			} finally {
				setLoading(false);
			}
		};
		loadQuestions();
	}, [questionsUrl]);

	// Сброс выбора при смене вопроса
	useEffect(() => {
		setSelected(answerIndices[currentQuestionIndex] ?? null);
		setShowError(false);
	}, [currentQuestionIndex, answerIndices]);

	// Обработка выбора варианта ответа и автопереход на следующий вопрос
	const handleSelect = (optionIndex) => {
		setSelected(optionIndex);
		setShowError(false);

		const newIndices = [...answerIndices];
		newIndices[currentQuestionIndex] = optionIndex;
		setAnswerIndices(newIndices);

		setAutoLoading(true);
		setTimeout(() => {
			setAutoLoading(false);
			const total = mbiData.questions.length;
			if (currentQuestionIndex + 1 < total) {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
			} else {
				if (onComplete) onComplete({ answerIndices: newIndices, fullName, timeDisplay });
			}
		}, 500);
	};

	const handleReload = () => {
		setMbiData(null);
		setLoading(true);
		setError('');
		setCurrentQuestionIndex(0);
		setAnswerIndices([]);
		setSelected(null);
	};

	// Заполнить первым вариантом (индекс 0 = "Никогда") для быстрого тестирования
	const handleFillTestAnswers = () => {
		if (!mbiData) return;
		const autoIndices = mbiData.questions.map(() => 0);
		if (onComplete) onComplete({ answerIndices: autoIndices, fullName, timeDisplay });
	};

	if (loading) {
		return (
			<div className="question-test" style={{ display: 'block' }}>
				<div className="question-test__container">
					<div className="question-header">
						<div id="fio-display">ФИО: <span>{fullName}</span></div>
						<div id="time-display">Дата: <span>{timeDisplay}</span></div>
					</div>
					<div className="question-test__content">
						<div className="question__loader-test" style={{ display: 'block', textAlign: 'center' }}>
							<span></span>
							<div>Загрузка вопросов...</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="question-test" style={{ display: 'block' }}>
				<div className="question-test__container">
					<div className="question-test__content">
						<div className="error-message" style={{ color: '#dc2626', marginTop: 10 }}>{error}</div>
						<button className="patterns-button" onClick={handleReload}>Повторить попытку</button>
					</div>
				</div>
			</div>
		);
	}

	if (!mbiData) return null;

	const question = mbiData.questions[currentQuestionIndex];
	if (!question) return null;

	const answerOptions = mbiData.answerOptions || [];

	return (
		<div className="question-test">
			<div className="question-test__container">
				<div className="question-test__content">
					<div className="question-test__info">
						<div id="fio-display" className="question-block__item">
							ФИО: <span>{fullName}</span>
						</div>
						<div id="time-display" className="question-block__item">
							Дата: <span>{timeDisplay}</span>
						</div>
					</div>
					<div className="question-test__counter">
						Вопрос {currentQuestionIndex + 1} из {mbiData.questions.length}
					</div>
					<div className="question-test__block">
						<div className="question-test__question">
							{question.id}. {question.text}
						</div>
						<div className="question-test__options">
							{answerOptions.map((option, i) => (
								<label className="question-test__option" key={i}>
									<input
										type="radio"
										name={`answer_${currentQuestionIndex}`}
										value={i}
										checked={selected === i}
										onChange={() => {
											if (!autoLoading) handleSelect(i);
										}}
										tabIndex={0}
										disabled={autoLoading}
									/>
									<span className="question-test__radio-label">{option}</span>
								</label>
							))}
						</div>

						<div
							id="error-message"
							className="error-message"
							style={{
								display: showError ? 'block' : 'none',
								color: '#dc2626',
								marginTop: 10,
							}}
						>
							Пожалуйста, выберите вариант ответа!
						</div>
					</div>
					{showTestFillButton && (
						<button
							className="patterns-button"
							type="button"
							style={{ margin: '20px auto', display: 'block' }}
							onClick={handleFillTestAnswers}
							disabled={autoLoading}
						>
							Заполнить тестовые ответы
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuestionsScreen;