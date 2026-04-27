// src/components/Screens/FormScreen.jsx - Экран с формой для ввода данных пользователя
import React, { useState, useRef, useEffect } from 'react';
import IMask from 'imask';

//	Начальное состояние формы
const initialState = {
	//	Поля формы для ввода данных пользователя
	fullName: '',
	phone: '',
	telegram: '',
	email: '',
	agreePolicy: false,
	agreeData: false,
	agreeAds: false,
};

const FormScreen = ({ onSubmit }) => {
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState({});
	const phoneInputRef = useRef(null);
	const maskRef = useRef(null);

	// Инициализация маски для телефона
	useEffect(() => {
		const inputElement = phoneInputRef.current;

		if (inputElement) {
			maskRef.current = IMask(inputElement, {
				mask: '+7 (000) 000-00-00',
				lazy: true,
				placeholderChar: '_',
				overwrite: true,
				autofix: true,
			});

			const handleFocus = () => {
				if (!inputElement.value) {
					maskRef.current.updateOptions({ placeholder: '+7 (___) ___-__-__' });
				}
			};

			const handleBlur = () => {
				if (!inputElement.value) {
					maskRef.current.updateOptions({ placeholder: '' });
				}
			};

			inputElement.addEventListener('focus', handleFocus);
			inputElement.addEventListener('blur', handleBlur);

			return () => {
				inputElement.removeEventListener('focus', handleFocus);
				inputElement.removeEventListener('blur', handleBlur);
				maskRef.current?.destroy();
			};
		}
	}, []);

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const validate = () => {
		const newErrors = {};

		// Валидация ФИО (минимум 3 символа)
		if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
			newErrors.fullName = 'Поле обязательно для заполнения, введите не менее 3 символов';
		}

		// Валидация телефона (формат +7 (XXX) XXX-XX-XX)
		const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
		if (!formData.phone || !phoneRegex.test(formData.phone)) {
			newErrors.phone = 'Поле обязательно для заполнения и должно быть в формате +7 (XXX) XXX-XX-XX';
		}

		// Валидация Telegram (если заполнено - минимум 3 символа)
		if (formData.telegram && formData.telegram.trim().length < 3) {
			newErrors.telegram = 'Если вводите ник, он должен содержать не менее 3 символов';
		}

		// Валидация email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email || !emailRegex.test(formData.email)) {
			newErrors.email = 'Поле обязательно для заполнения и должно иметь формат: example@domain.com';
		}

		// Валидация чекбоксов
		if (!formData.agreePolicy) {
			newErrors.agreePolicy = 'Необходимо подтвердить ознакомление с политикой';
		}
		if (!formData.agreeData) {
			newErrors.agreeData = 'Необходимо дать согласие на обработку данных';
		}

		return newErrors;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			onSubmit(formData);
		}
	};

	return (
		<div className="form-start" id="form-start">
			<div className="form-start__container">
				<div className="form-start__body">
					<h2 className="form-start__title">Тест MBI на выгорание Маслач</h2>
					<h2 className="form-start__subtitle">Введите ваши данные для прохождения теста:</h2>

					<form className="form-start__form" onSubmit={handleSubmit} noValidate>
						{/* ФИО */}
						<div>
							<input
								type="text"
								id="fullName"
								name="fullName"
								placeholder="Введите Фамилию Имя Отчество"
								className="form-start__input"
								value={formData.fullName}
								onChange={handleChange}
								required
							/>
							{errors.fullName && (
								<div id="error-message-fullname" className="form-start__error" style={{ display: 'block' }}>
									{errors.fullName}
								</div>
							)}
						</div>

						{/* Телефон */}
						<div>
							<input
								ref={phoneInputRef}
								type="tel"
								id="phone"
								name="phone"
								placeholder="Введите номер телефона"
								className="form-start__input"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
							{errors.phone && (
								<div id="error-message-phone" className="form-start__error" style={{ display: 'block' }}>
									{errors.phone}
								</div>
							)}
						</div>

						{/* Ник в Telegram */}
						<div>
							<input
								type="text"
								id="telegram-nickname"
								name="telegram"
								placeholder="Введите ник в Telegram"
								className="form-start__input"
								value={formData.telegram}
								onChange={handleChange}
							/>
							{errors.telegram && (
								<div id="error-message-telegram" className="form-start__error" style={{ display: 'block' }}>
									{errors.telegram}
								</div>
							)}
						</div>

						{/* Электронная почта */}
						<div>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Введите электронную почту"
								className="form-start__input"
								value={formData.email}
								onChange={handleChange}
								required
							/>
							{errors.email && (
								<div id="error-message-email" className="form-start__error" style={{ display: 'block' }}>
									{errors.email}
								</div>
							)}
						</div>

						{/* Блок согласия */}
						<div className="form-start__block-check">
							<div className="form-start__check">
								<input
									type="checkbox"
									id="policy-read"
									name="agreePolicy"
									checked={formData.agreePolicy}
									onChange={handleChange}
								/>
								<label htmlFor="policy-read">
									<span>
										*С{' '}
										<a href="personal.html" target="_blank" rel="noopener noreferrer">
											Политикой обработки персональных данных
										</a>{' '}
										ознакомлен (-на).
									</span>
								</label>
								{errors.agreePolicy && (
									<div id="error-message-policy" className="form-start__error error-check" style={{ display: 'block' }}>
										{errors.agreePolicy}
									</div>
								)}
							</div>

							<div className="form-start__check">
								<input
									type="checkbox"
									id="data-consent"
									name="agreeData"
									checked={formData.agreeData}
									onChange={handleChange}
								/>
								<label htmlFor="data-consent">
									<span>
										*Даю согласие на обработку своих персональных данных в соответствии с{' '}
										<a href="personal.html" target="_blank" rel="noopener noreferrer">
											Политикой обработки персональных данных
										</a>
										.
									</span>
								</label>
								{errors.agreeData && (
									<div id="error-message-consent" className="form-start__error error-check" style={{ display: 'block' }}>
										{errors.agreeData}
									</div>
								)}
							</div>

							<div className="form-start__check">
								<input
									type="checkbox"
									id="marketing-consent"
									name="agreeAds"
									checked={formData.agreeAds}
									onChange={handleChange}
								/>
								<label htmlFor="marketing-consent">
									<span>
										Даю{' '}
										<a href="agreement.html" target="_blank" rel="noopener noreferrer">
											Согласие на получение информационных и рекламных материалов
										</a>.
									</span>
								</label>
							</div>
						</div>

						<button type="submit" id="start-test-button" className="button form-start__button">
							Пройти тест
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FormScreen;