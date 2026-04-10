import React from 'react';

const InstructionIntroSection = () => {
	return (
		<div className="instruction-test" id="instruction-test">
			<div className="instruction-test__container">
				<div className="instruction-test__body">
					<h2 className="instruction-test__title _anim-items _anim-no-hide">Инструкция</h2>

					<div className="instruction-test__content">
						<InstructionItem
							number="1"
							text="Ответьте, пожалуйста, как часто вы испытываете чувства, перечисленные ниже в опроснике. Для этого по каждому пункту отметьте позицию, которая соответствует частоте ваших мыслей и переживаний: «Никогда», «Очень редко», «Иногда», «Часто», «Очень часто», «Каждый день»."
						/>

						<InstructionItem
							number="2"
							text="Тест состоит из 22 утверждений. Прохождение займёт около 5 минут. Отвечайте честно и не задумывайтесь долго над каждым пунктом — важна ваша первая реакция."
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const InstructionItem = ({ number, text }) => (
	<div className="instruction-test__item _anim-items _anim-no-hide">
		<div className="instruction-test__number-item">{number}.</div>
		<div className="instruction-test__title-item">
			<div className="instruction-test__text-item">{text}</div>
		</div>
	</div>
);

export default InstructionIntroSection;