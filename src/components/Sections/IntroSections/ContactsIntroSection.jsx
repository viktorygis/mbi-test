import React from "react";

const contacts = [
  { label: "Email Елены Семеновой", value: <a href="mailto:es@ai4g.ru">es@ai4g.ru</a> },
  { label: "Email проекта", value: <a href="mailto:info@ai4g.ru">info@ai4g.ru</a> },
  { label: "Telegram", value: "@SemenovaElena" },
  {
    label: "Канал в Telegram",
    value: (
      <a href="https://t.me/life_watch" target="_blank" rel="noopener noreferrer">
        @life_watch
      </a>
    ),
  },
  {
    label: "Сайт",
    value: (
      <a href="https://coachsemenova.com/" target="_blank" rel="noopener noreferrer">
        coachsemenova.com
      </a>
    ),
  },
];

const shareLinks = [
  {
    title: "Telegram",
    href:
      "https://t.me/share/url?url=https://ai4g.ru/mbi-test/&text=Пройди%20онлайн-тест%20на%20профессиональное%20выгорание%20(MBI)%20и%20узнай%20свой%20уровень!%20Результаты%20с%20интерпретацией%20и%20рекомендациями:%20https://ai4g.ru/mbi-test/",
    icon: "telegram.svg",
    alt: "Поделиться в Telegram",
  },
  {
    title: "WhatsApp",
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      "Пройди онлайн-тест на профессиональное выгорание (MBI) и узнай свой уровень! Результаты с интерпретацией и рекомендациями: https://ai4g.ru/mbi-test/"
    )}`,
    icon: "whatsapp.svg",
    alt: "Поделиться в WhatsApp",
  },
];

const ContactItem = ({ label, value }) => (
  <>
    <dt className="share__label">{label}</dt>
    <dd className="share__value">{value}</dd>
  </>
);

const SocialButton = ({ title, href, icon, alt }) => (
  <a className="share__button" title={title} aria-label={title} target="_blank" rel="noopener noreferrer" href={href}>
    <img src={`img/mbi-test/${icon}`} alt={alt} />
  </a>
);

const ContactsIntroSection = () => {
  return (
    <section className="share" aria-labelledby="share-title">
      <div className="share__container">
        <div className="share__body">
          <h2 className="share__title" id="share-title">
            Контакты
          </h2>

          <p className="share__subtitle">
            По любым вопросам можно связаться с автором проекта — Еленой Семеновой.
          </p>

          <dl className="share__list">
            {contacts.map((item) => (
              <ContactItem key={item.label} label={item.label} value={item.value} />
            ))}
          </dl>

          <div className="share__share">
            <div className="share__subtitle">Поделиться ссылкой на тест:</div>

            <ul className="share__block" aria-label="Кнопки для分享">
              {shareLinks.map((item) => (
                <li key={item.title}>
                  <SocialButton {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsIntroSection;