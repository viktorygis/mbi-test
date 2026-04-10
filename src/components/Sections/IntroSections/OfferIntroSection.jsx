//src/components/Sections/IntroSections/OfferIntroSection.jsx - Секция с предложением пройти тест MBI
import React from 'react';

const OfferIntroSection = () => {
	return (
		<div className="offer-test">
			<div className="offer-test__container">
				<div className="offer-test__body">
					<div className="offer-test__content">
						<div className="offer-test__overhead overhead">
							Опросник на определение уровня психического выгорания
						</div>
						<h1 className="offer-test__title">Тест MBI</h1>

						<div className="offer-test__subtitle">
							<span>Maslach Burnout Inventory</span> (MBI)
						</div>

						<div className="offer-test__text">
							Профессиональное выгорание — это синдром, возникающий вследствие длительного воздействия
							стрессоров на рабочем месте. Он проявляется в эмоциональном истощении, деперсонализации
							и снижении ощущения личных достижений. Своевременная диагностика выгорания позволяет
							принять меры для восстановления ресурсов и профилактики.
						</div>

						<div className="offer-test__text">
							Опросник MBI разработан американскими психологами К. Маслач и С. Джексон,
							данный вариант адаптирован Н.Е. Водопьяновой. Результаты теста помогут оценить
							уровень психоэмоционального истощения, деперсонализации и редукции личных достижений.
						</div>

						<div className="offer-test__bottom">
							<a href="#button-hipe-test" className="offer-test__button patterns-button">Пройти тест</a>
							<div className="offer-test__clarification">Попробуй прямо сейчас</div>
						</div>
					</div>

					<img className="offer-test__image"
						src="img/test-mbi/plane.png"
						alt="Тест MBI" />
				</div>
			</div>
		</div>
	);
};

export default OfferIntroSection;