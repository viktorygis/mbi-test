// src/components/Sections/ResultsSections/LiteratureSection.jsx
import React from 'react';

const LiteratureSection = () => (
	<div className="literature">
		<div className="literature__container">
			<div className="literature__body">
				<h2 className="literature__title">📚 Литература</h2>
				<h2 className="literature__text">Подробнее о паттернах можно прочитать в приведённых ниже источниках.</h2>


				<div className='literature__list-container'>
					{/* 1 */}
					<ol className="literature__list">
						<li className="literature__item"><p><span>Аузан А. А. Культурные коды экономики.</span> – М.: Альпина Паблишер, 2022. – 284 с.</p></li>
						<li className="literature__item"><p><span>Гестеланд Р. Р. Кросс-культурное поведение в бизнесе: маркетинговые исследования.</span> – Днепропетровск: Баланс Бизнес Букс, 2003. – 280 с.</p></li>
						<li className="literature__item"><p><span>Ливермор Д. Культурный интеллект. Как выжить и преуспеть в мультикультурном мире.</span> – М.: Манн, Иванов и Фербер, 2023. – 320 с.</p></li>
						<li className="literature__item"><p><span>Льюис Р. Д. Деловые культуры в международном бизнесе.</span> – М.: Дело, 2001. – 448 с.</p></li>
						<li className="literature__item"><p><span>Льюис Р. Д. Столкновение команд.</span> – М.: Альпина Паблишер, 2013. – 352 с.</p></li>
						<li className="literature__item"><p><span>Мейер Э. Карта культурных различий. Как научиться понимать представителей других стран и избегать ложных стереотипов.</span> – М.: Альпина Паблишер, 2019. – 376 с.</p></li>

					</ol>

					{/* 2 */}
					<ol className="literature__list literature__list--second">
						<li className="literature__item"><p><span>Росински Ф. Кросс-культурный коучинг.</span> – М.: Эксмо, 2020. – 320 с.</p></li>
						<li className="literature__item"><p><span>Тромпенаарс Ф., Хампден-Тернер Ч. Национально-культурные различия в контексте глобального бизнеса.</span> – Мн.: ООО «Попурри», 2004. – 528 с.</p></li>
						<li className="literature__item"><p><span>Hofstede G., Hofstede G. J., Minkov M. Cultures and Organizations: Software of the Mind. 3rd ed.</span> – New York: McGraw-Hill, 2010. – 561 p.</p></li>
						<li className="literature__item"><p><span>Тендрякова М. В. Многообразие типичного. Очерки по культурно-исторической психологии народов.</span> – М.: Издательский Дом ЯСК, 2020. – 411 с.</p></li>
						<li className="literature__item"><p><span>Росински Ф. Глобальный коучинг.</span> – М.: Принтлето, 2020. – 366 с.</p></li>
						<li className="literature__item">
							<p>
								<span>Аузан А. Культурные коды экономики. Как ценности влияют на конкуренцию, демократию и благосостояние народа. </span>  – М.: Издательство  АСТ, 2023. – 147 с.
							</p>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
);

export default LiteratureSection;