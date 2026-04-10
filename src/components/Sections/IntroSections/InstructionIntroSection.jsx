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
							text="Тест состоит из 90 вопросов. Вам нужно выбрать один вариант из предложенных. Не ориентируйтесь на предыдущий опыт и значение слова. Выбирайте то слово, которое вам больше нравится."
						/>

						<InstructionItem
							number="2"
							text="Прохождение теста займет не более 5-и минут. Перед прохождением теста убедитесь, что вас никто и ничто не отвлекает. Не прерывайте выполнение теста."
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