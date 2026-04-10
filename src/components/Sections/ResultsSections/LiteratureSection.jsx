// src/components/Sections/ResultsSections/LiteratureSection.jsx
import React from 'react';

const LiteratureSection = () => (
	<div className="literature">
		<div className="literature__container">
			<div className="literature__body">
				<h2 className="literature__title">📚 Источник методики</h2>
				<h2 className="literature__text">
					Опросник на определение уровня психического выгорания (MBI): авторы К. Маслач и С. Джексон,
					адаптация Н.Е. Водопьяновой.
				</h2>

				<div className="literature__list-container">
					<ol className="literature__list">
						<li className="literature__item">
							<p>
								<span>Фетискин Н.П., Козлов В.В., Мануйлов Г.М.</span> Социально-психологическая диагностика
								развития личности и малых групп. — М., 2002. С. 360–362.
							</p>
						</li>
						<li className="literature__item">
							<p>
								<span>Maslach C., Jackson S.E.</span> The measurement of experienced burnout //
								Journal of Occupational Behaviour. — 1981. — Vol. 2. — P. 99–113.
							</p>
						</li>
						<li className="literature__item">
							<p>
								<span>Водопьянова Н.Е., Старченкова Е.С.</span> Синдром выгорания: диагностика и профилактика. —
								СПб.: Питер, 2005.
							</p>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
);

export default LiteratureSection;