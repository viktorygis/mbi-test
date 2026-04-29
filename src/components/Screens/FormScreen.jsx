import React, { useState, useRef, useEffect } from "react";
import IMask from "imask";

const initialState = {
  fullName: "",
  phone: "",
  telegram: "",
  email: "",
  agreePolicy: false,
  agreeData: false,
  agreeAds: false,
};

const FormScreen = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const phoneInputRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const inputElement = phoneInputRef.current;
    if (!inputElement) return;

    maskRef.current = IMask(inputElement, {
      mask: "+7 (000) 000-00-00",
      lazy: true,
      placeholderChar: "_",
      overwrite: true,
      autofix: true,
    });

    return () => {
      maskRef.current?.destroy();
      maskRef.current = null;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Введите ФИО минимум из 3 символов.";
    }

    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите номер в формате +7 (XXX) XXX-XX-XX.";
    }

    if (formData.telegram && formData.telegram.trim().length < 3) {
      newErrors.telegram = "Ник Telegram должен содержать не менее 3 символов.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email.";
    }

    if (!formData.agreePolicy) {
      newErrors.agreePolicy = "Подтвердите ознакомление с политикой.";
    }

    if (!formData.agreeData) {
      newErrors.agreeData = "Дайте согласие на обработку данных.";
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
    <section className="form-start" id="form-start" aria-labelledby="form-start-title">
      <div className="form-start__container">
        <div className="form-start__body">
          <h2 className="form-start__title" id="form-start-title">
            Тест MBI на выгорание Маслач
          </h2>

          <p className="form-start__subtitle">
            Введите ваши данные для прохождения теста.
          </p>

          <form className="form-start__form" onSubmit={handleSubmit} noValidate>
            <div className="form-start__field">
              <label htmlFor="fullName" className="form-start__label">
                ФИО
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Введите фамилию, имя, отчество"
                className="form-start__input"
                value={formData.fullName}
                onChange={handleChange}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "error-fullName" : undefined}
              />
              {errors.fullName && (
                <div id="error-fullName" className="form-start__error">
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="form-start__field">
              <label htmlFor="phone" className="form-start__label">
                Телефон
              </label>
              <input
                ref={phoneInputRef}
                type="tel"
                id="phone"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                className="form-start__input"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "error-phone" : undefined}
              />
              {errors.phone && (
                <div id="error-phone" className="form-start__error">
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="form-start__field">
              <label htmlFor="telegram" className="form-start__label">
                Ник в Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                placeholder="Например, @username"
                className="form-start__input"
                value={formData.telegram}
                onChange={handleChange}
                aria-invalid={!!errors.telegram}
                aria-describedby={errors.telegram ? "error-telegram" : undefined}
              />
              {errors.telegram && (
                <div id="error-telegram" className="form-start__error">
                  {errors.telegram}
                </div>
              )}
            </div>

            <div className="form-start__field">
              <label htmlFor="email" className="form-start__label">
                Электронная почта
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@domain.com"
                className="form-start__input"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "error-email" : undefined}
              />
              {errors.email && (
                <div id="error-email" className="form-start__error">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-start__block-check">
              <label className="form-start__check" htmlFor="policy-read">
                <input
                  type="checkbox"
                  id="policy-read"
                  name="agreePolicy"
                  checked={formData.agreePolicy}
                  onChange={handleChange}
                  aria-invalid={!!errors.agreePolicy}
                />
                <span>
                  *С{" "}
                  <a href="personal.html" target="_blank" rel="noopener noreferrer">
                    политикой обработки персональных данных
                  </a>{" "}
                  ознакомлен(-на).
                </span>
              </label>
              {errors.agreePolicy && <div className="form-start__error">{errors.agreePolicy}</div>}

              <label className="form-start__check" htmlFor="data-consent">
                <input
                  type="checkbox"
                  id="data-consent"
                  name="agreeData"
                  checked={formData.agreeData}
                  onChange={handleChange}
                  aria-invalid={!!errors.agreeData}
                />
                <span>
                  *Даю согласие на обработку персональных данных в соответствии с{" "}
                  <a href="personal.html" target="_blank" rel="noopener noreferrer">
                    политикой обработки персональных данных
                  </a>
                  .
                </span>
              </label>
              {errors.agreeData && <div className="form-start__error">{errors.agreeData}</div>}

              <label className="form-start__check" htmlFor="marketing-consent">
                <input
                  type="checkbox"
                  id="marketing-consent"
                  name="agreeAds"
                  checked={formData.agreeAds}
                  onChange={handleChange}
                />
                <span>
                  Даю{" "}
                  <a href="agreement.html" target="_blank" rel="noopener noreferrer">
                    согласие на получение информационных и рекламных материалов
                  </a>
                  .
                </span>
              </label>
            </div>

            <button type="submit" id="start-test-button" className="button form-start__button">
              Пройти тест
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormScreen;