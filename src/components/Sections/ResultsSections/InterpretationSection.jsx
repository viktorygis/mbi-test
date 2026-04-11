//src/components/Sections/ResultsSections/InterpretationSection.jsx
//	InterpretationSection.jsx - Компонент для отображения интерпретации результатов теста.
import React, { useEffect, useState } from 'react';

const DEFAULT_TYPE = 'Моноактивный';

const InterpretationSection = ({
	topCategory,
	patternMessage,
	topPatterns,
	responseType,
	behaviorModel,
	strengths,
}) => {
	const [responseTypeTexts, setResponseTypeTexts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let isMounted = true;

		fetch('/data/responseTypes.json')
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP ${res.status} - Файл не найден`);
				}
				return res.json();
			})
			.then(data => {
				if (isMounted) {
					console.log('✅ responseTypes.json загружен успешно');
					setResponseTypeTexts(data);
					setLoading(false);
					setError(false);
				}
			})
			.catch(err => {
				console.error('❌ Ошибка загрузки responseTypes.json:', err);
				if (isMounted) {
					setError(true);
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const safeResponseType = responseType || DEFAULT_TYPE;

	// Проверка, есть ли данные в responseTypeTexts
	const hasResponseTypeData = responseTypeTexts && responseTypeTexts[safeResponseType];

	if (loading) {
		return <div>Загрузка интерпретации...</div>;
	}

	if (error || !responseTypeTexts) {
		return (
			<div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
				<p>⚠️ Ошибка при загрузке данных интерпретации</p>
				<p style={{ fontSize: '12px', color: '#666' }}>
					Проверьте консоль браузера для подробностей
				</p>
			</div>
		);
	}

	if (!hasResponseTypeData) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<p>Данные для типа реагирования "{safeResponseType}" не найдены</p>
				<p style={{ fontSize: '12px', color: '#666' }}>
					Доступные типы: {Object.keys(responseTypeTexts).join(', ')}
				</p>
			</div>
		);
	}

	return (
		<div className="interpretation">
			<div className="interpretation__container">
				<div className="interpretation__body">
					<h2 className="interpretation__title">Интерпретация вашего теста</h2>
					<div className="interpretation__content">
						<div className="interpretation__sections">
							{/* 	Наиболее выраженная категория паттернов */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">
									Наиболее выраженная <br />
									категория паттернов
								</h3>
								<h3 className="interpretation__section-subtitle">
									{
										!topCategory
											? 'Нет выраженной категории паттернов'
											: Array.isArray(topCategory)
												? 'Несколько выраженных категорий'
												: topCategory.title || topCategory.titleRu || topCategory.titleEn || topCategory
									}
								</h3>
								<div className="interpretation__list-item" dangerouslySetInnerHTML={{ __html: patternMessage || '' }} />
							</div>

							{/* Ведущие паттерны */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Ведущие паттерны</h3>
								<div className="interpretation__list-item">
									{(!topPatterns || topPatterns.length === 0) ? (
										<div>
											<h4>У вас не выявлено ведущих паттернов.</h4>
											<p>Ваше поведение не подчинено выраженным шаблонам, что свидетельствует о гибкости и способности адаптироваться к обстоятельствам.</p>
										</div>
									) : (
										<ul className="interpretation__pattern-list interpretation__pattern-list_multiple">
											{topPatterns.map((p, i) => (
												<li className="interpretation__pattern-item" key={i}>
													{p}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>

							{/* Тип реагирования */}
							<div className="interpretation__section interpretation__section_results">
								<h3 className="interpretation__section-title">Тип реагирования</h3>
								<h3 className="interpretation__section-subtitle">
									{safeResponseType}
								</h3>
								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{ __html: responseTypeTexts[safeResponseType]?.description || '' }}
								/>
							</div>

							{/* Возможности и ограничения */}
							<div className="interpretation__section interpretation__section_results">
								<h3 className="interpretation__section-title">Возможности и ограничения</h3>

								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{ __html: responseTypeTexts[safeResponseType]?.opportunities || '' }}
								/>
							</div>

							{/* Ваша модель поведения */}
							{behaviorModel && (
								<div className="interpretation__section">
									<h3 className="interpretation__section-title">Ваша модель поведения</h3>
									<div
										className="interpretation__list-item"
										dangerouslySetInnerHTML={{
											__html: behaviorModel
										}}
									/>
								</div>
							)}

							{/* Сильные стороны */}
							{strengths && (
								<div className="interpretation__section">
									<h3 className="interpretation__section-title">Сильные стороны</h3>
									<div
										className="interpretation__list-item"
										dangerouslySetInnerHTML={{
											__html: strengths
										}}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InterpretationSection;