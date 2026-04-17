import React from 'react';
const ContactsIntroSection = () => {
  return (
    <div className="share">
      <div className="share__container">
        <div className="share__body">
          <h2 className="share__title">Контакты</h2>
          <div className="share__subtitle">
            По лю­бым возни­кающим вопро­сам можно свя­заться с авто­ром проек­та Еленой Семеновой
          </div>

          <ContactList />

          <SocialShare />
        </div>
      </div>
    </div>
  );
};

const ContactList = () => (
  <div className="share__list">
    <ContactItem label="email Елены Семеновой:" value={<a href="mailto:es@ai4g.ru">es@ai4g.ru</a>} />
    <ContactItem label="email проекта:" value={<a href="mailto:info@ai4g.ru">info@ai4g.ru</a>} />
    <ContactItem label="Ник в телеграм:" value="@SemenovaElena" />
    <ContactItem label="Канал в телеграм:"
      value={<a href="https://t.me/life_watch" target="_blank" rel="noopener noreferrer">@life_watch</a>} />
    <ContactItem label="Сайт:"
      value={<a href="https://coachsemenova.com/" target="_blank" rel="noopener noreferrer">www.coachsemenova.com</a>} />
  </div>
);

const ContactItem = ({ label, value }) => (
  <>
    <div>{label}</div>
    <div>{value}</div>
  </>
);

const SocialShare = () => (
  <>
    <div className="share__subtitle">Поделиться ссылкой на тест на выгорание MBI:</div>
    <div className="share__block">
      <SocialButton
        title="telegram"
        href={
          "https://t.me/share/url?" +
          "url=https://ai4g.ru/test-mbi" +
          "&text=Пройди%20онлайн-тест%20на%20профессиональное%20выгорание%20(MBI)%20и%20узнай%20свой%20уровень!%20Результаты%20с%20интерпретацией%20и%20рекомендациями:%20https://ai4g.ru/test-mbi"
        }
        icon="telegram.svg"
        alt="Telegram"
      />
      <SocialButton
        title="whatsapp"
        href={
          "https://api.whatsapp.com/send?text=" +
          encodeURIComponent("Пройди онлайн-тест на профессиональное выгорание (MBI) и узнай свой уровень! Результаты с интерпретацией и рекомендациями: https://ai4g.ru/test-mbi")
        }
        icon="whatsapp.svg"
        alt="WhatsApp"
      />
    </div>
  </>
);

const SocialButton = ({ title, href, icon, alt }) => (
  <a className="share__button" title={title} target="_blank" rel="noopener noreferrer" href={href}>
    <img src={`img/test-mbi/${icon}`} alt={alt} />
  </a>
);

export default ContactsIntroSection;