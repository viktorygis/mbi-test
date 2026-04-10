//src/components/Sections/IntroSections/OfferIntroSection.jsx - Секция с предложением пройти тест
import React from 'react';

const OfferIntroSection = () => {
	return (
		<div className="offer-test">
			<div className="offer-test__container">
				<div className="offer-test__body">
					<div className="offer-test__content">
						<div className="offer-test__overhead overhead">
							Тест на определение паттернов
						</div>
						<h1 className="offer-test__title">Тест Паттернов</h1>

						<div className="offer-test__subtitle">
							<span>Pattern Test</span> (PT)
						</div>

						<div className="offer-test__text">
							Паттерн — устойчивая модель реагирования, предпочтение мыслить, действовать и чувствовать
							определенным образом. Паттерны зависят от контекста и уровня стресса и способны со временем
							изменяться. Паттерн отражает, что находится в фокусе внимания, а что отфильтровывается из
							области осознания. Зная свои паттерны, мы осознаем свои привычные способы автоматического
							реагирования.
						</div>

						<div className="offer-test__text">
							Узнать профиль ваших паттернов вы можете, пройдя авторский тест паттернов (создатель Е.Н. Семенова, 2024).
							Результаты теста можно использовать для прогнозирования вашего поведения, построения отношений,
							разработки индивидуальной траектории развития, анализа профессионального (карьерного) сценария,
							выбора подходящих ролей, прохождения тупиков, разрешения конфликтов.
						</div>

						<div className="offer-test__bottom">

							<a href="#button-hipe-test" className="offer-test__button patterns-button">Пройти тест </a>

							<div className="offer-test__clarification">Попробуй прямо сейчас</div>
						</div>
					</div>

					<img className="offer-test__image"
						src="img/test-mbi/plane.png"
						alt="Плоскости" />
				</div>
			</div>
		</div>
	);
};

export default OfferIntroSection;