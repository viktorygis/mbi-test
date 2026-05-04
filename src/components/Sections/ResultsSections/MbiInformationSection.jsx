import React from "react";

const ICONS = {
  exhaustion: "img/mbi-test/emotional-exhaustion.svg",
  depersonalization: "img/mbi-test/depersonalization.svg",
  reduction: "img/mbi-test/reduced-achievement.svg",
  burnoutIndex: "img/mbi-test/burnout-index.svg",
};

const CardHeader = ({ iconSrc, title }) => (
  <div className="mbi-interpretation__card-header">
    <div className="mbi-interpretation__icon-wrap" aria-hidden="true">
      <img className="mbi-interpretation__icon" src={iconSrc} alt="" />
    </div>
    <h3 className="mbi-interpretation__card-title">{title}</h3>
  </div>
);

const LabelBlock = ({ label, children }) => (
  <div className="mbi-interpretation__block">
    <div className="mbi-interpretation__label">{label}</div>
    <div className="mbi-interpretation__value">{children}</div>
  </div>
);

const MbiInformationSection = () => {
  return (
    <section className="mbi-interpretation" aria-labelledby="mbi-interpretation-title">
      <div className="mbi-interpretation__container">
        <h2 className="mbi-interpretation__title" id="mbi-interpretation-title">
          Справочная информация
        </h2>

        <div className="mbi-interpretation__grid">
          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.exhaustion} title="Эмоциональное истощение" />

            <LabelBlock label="Что измеряет">
              Насколько человек эмоционально, физически и психически истощён.
            </LabelBlock>

            <LabelBlock label="Как проявляется">
              <ul className="mbi-interpretation__list">
                <li>Постоянная усталость, даже после отдыха.</li>
                <li>Ощущение, что не хватает сил на работу и общение.</li>
                <li>Раздражительность, снижение интереса к людям и задачам.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат">
              <ul className="mbi-interpretation__list">
                <li>Высокие значения — ключевой признак выгорания.</li>
                <li>Средние значения — есть риск перегрузки.</li>
                <li>Низкие значения — ресурс в целом сохранен.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Практический смысл">
              Если эта шкала высокая, в первую очередь нужен отдых, снижение нагрузки и восстановление ресурса.
            </LabelBlock>
          </article>

          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.depersonalization} title="Деперсонализация" />

            <LabelBlock label="Что измеряет">
              Степень эмоциональной дистанции и отчуждения в общении с людьми.
            </LabelBlock>

            <LabelBlock label="Как проявляется">
              <ul className="mbi-interpretation__list">
                <li>Формальное, «холодное» отношение к людям.</li>
                <li>Снижение эмпатии, раздражение, циничность.</li>
                <li>Общение без вовлечённости и личного контакта.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат">
              <ul className="mbi-interpretation__list">
                <li>Высокие значения — выраженное эмоциональное дистанцирование.</li>
                <li>Средние значения — появляются признаки отчуждения.</li>
                <li>Низкие значения — вовлечённость и эмпатия сохранены.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Практический смысл">
              Рост этой шкалы часто говорит о том, что человек начинает защищаться от перегрузки через дистанцию.
            </LabelBlock>
          </article>

          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.reduction} title="Редукция личных достижений" />

            <LabelBlock label="Что измеряет">
              Насколько человек чувствует себя компетентным, эффективным и профессионально значимым.
            </LabelBlock>

            <LabelBlock label="Как проявляется">
              <ul className="mbi-interpretation__list">
                <li>Ощущение «я плохо справляюсь».</li>
                <li>Обесценивание собственных результатов.</li>
                <li>Снижение мотивации и чувство бесполезности.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат">
              <ul className="mbi-interpretation__list">
                <li>
                  Низкие значения — более выраженная редукция и более высокий риск выгорания.
                </li>
                <li>Высокие значения — ощущение эффективности и профессиональной значимости сохранено.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Практический смысл">
              Это обратная шкала: чем ниже балл, тем сильнее выражено выгорание и хуже ощущение собственной компетентности.
            </LabelBlock>
          </article>

          <article className="mbi-interpretation__card mbi-interpretation__card--summary">
            <CardHeader iconSrc={ICONS.burnoutIndex} title="Как использовать шкалы вместе" />

            <ul className="mbi-interpretation__list">
              <li><b>Высокое истощение</b> + <b>высокая деперсонализация</b> → активная фаза выгорания.</li>
              <li><b>Высокое истощение</b> + <b>снижение достижений</b> → риск утраты профессиональной мотивации.</li>
              <li><b>Высокие значения</b> по всем трём шкалам → выраженный синдром выгорания.</li>
            </ul>

            <div className="mbi-interpretation__mini-title">Кратко про шкалы</div>
            <ul className="mbi-interpretation__list">
              <li><b>Истощение</b> — про «нет сил».</li>
              <li><b>Деперсонализация</b> — про «отстраняюсь от людей».</li>
              <li><b>Редукция личных достижений</b> — про «я не справляюсь».</li>
            </ul>

            <div className="mbi-interpretation__text">
              Это разделение помогает понять, где именно проблема: в ресурсе, в отношениях с людьми или в профессиональной самооценке.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default MbiInformationSection;