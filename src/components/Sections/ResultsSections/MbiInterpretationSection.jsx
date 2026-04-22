import React from "react";

const ICONS = {
  exhaustion: "img/test-mbi/emotional-exhaustion.svg",
  depersonalization: "img/test-mbi/depersonalization.svg",
  reduction: "img/test-mbi/reduced-achievement.svg",
  burnoutIndex: "img/test-mbi/burnout-index.svg",
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

const MbiInterpretationSection = () => {
  return (
    <section className="mbi-interpretation" aria-labelledby="mbi-interpretation-title">
      <div className="mbi-interpretation__container">
        <h2 className="mbi-interpretation__title" id="mbi-interpretation-title">
          Справочная информация
        </h2>

        <div className="mbi-interpretation__grid">
          {/* Эмоциональное истощение */}
          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.exhaustion} title="Шкала Эмоциональное истощение" />

            <LabelBlock label="Что измеряет:">
              Насколько человек психологически «выгорел» и исчерпан эмоционально.
            </LabelBlock>

            <LabelBlock label="Как проявляется:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--manifestation">
                <li>постоянная усталость, даже после отдыха</li>
                <li>ощущение «нет сил» на работу и общение</li>
                <li>снижение интереса к людям и задачам</li>
                <li>раздражительность, перепады настроения</li>
                <li>общее чувство неудовлетворенности жизнью</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--results">
                <li>Высокие значения → ключевой признак выгорания. Человек перегружен и истощен.</li>
                <li>Средние значения → есть риск развития выгорания, требуется контроль нагрузки.</li>
                <li>Низкие значения → эмоциональный ресурс сохранен.</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Практический смысл:">
              Это базовая шкала. Если она высокая — необходимо в первую очередь работать с восстановлением ресурсов
              (отдых, снижение нагрузки, темпа, количества задач, изменение режима работы, окружения).
            </LabelBlock>
          </article>

          {/* Деперсонализация */}
          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.depersonalization} title="Шкала Деперсонализация" />

            <LabelBlock label="Что измеряет:">
              Степень отчуждения и «обезличивания» в отношении людей, с которыми человек работает.
            </LabelBlock>

            <LabelBlock label="Как проявляется:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--manifestation">

                <li>формальное, «холодное» отношение к людям</li>
                <li>снижение эмпатии, сопереживания</li>
                <li>циничность, раздражение, негативизм</li>
                <li>использование ярлыков, шуток, сарказма или профессионального сленга вместо личного отношения</li>
                <li>общение «по инструкции», без вовлеченности</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--results">
                <li><b>Высокие значения</b> → выраженное эмоциональное дистанцирование, защитная реакция на стресс</li>
                <li><b>Средние значения</b> → начальные признаки отчуждения</li>
                <li><b>Низкие значения</b> → сохранена вовлеченность и эмпатия</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Практический смысл:">
              Это индикатор того, как выгорание влияет на отношения с людьми. Рост этой шкалы часто означает,
              что человек уже не справляется с эмоциональной нагрузкой и начинает «отгораживаться».
            </LabelBlock>
          </article>

          {/* Редукция достижений */}
          <article className="mbi-interpretation__card">
            <CardHeader iconSrc={ICONS.reduction} title="Шкала Редукция профессиональных достижений" />

            <LabelBlock label="Что измеряет:">
              Насколько человек удовлетворен собой как специалистом и чувствует свою эффективность.
            </LabelBlock>

            <LabelBlock label="Как проявляется:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--manifestation">

                <li>ощущение «я плохо справляюсь»</li>
                <li>обесценивание своих результатов</li>
                <li>снижение мотивации к работе</li>
                <li>избегание задач и ответственности</li>
                <li>чувство профессиональной бесполезности</li>
              </ul>
            </LabelBlock>

            <LabelBlock label="Как понимать результат:">
              <ul className="mbi-interpretation__list mbi-interpretation__list--results">
                <li>
                  <b>Высокие значения редукции</b> (т.е. сильное снижение достижений) → человек не верит в свою компетентность,
                  демотивирован, снижена вовлеченность
                </li>
                <li><b>Низкие значения редукции</b> → ощущение профессиональной эффективности и значимости</li>
              </ul>

              <div className="mbi-interpretation__warn">
                ⚠️ <b>Важно</b>: эта шкала интерпретируется «в обратную сторону» — чем выше редукция, тем хуже состояние.
              </div>
            </LabelBlock>

            <LabelBlock label="Практический смысл:">
              Это показатель профессиональной самооценки. Он влияет на мотивацию, вовлеченность и риск ухода из профессии.
            </LabelBlock>
          </article>

          {/* Короткая “шпаргалка” + комбинации */}
          <article className="mbi-interpretation__card mbi-interpretation__card--summary">
            <CardHeader iconSrc={ICONS.burnoutIndex} title="Как использовать шкалы вместе" />

            <ul className="mbi-interpretation__list">
              <li><b>Высокое истощение</b> + <b>высокая деперсонализация</b> → активная фаза выгорания</li>
              <li><b>Высокое истощение</b> + <b>снижение достижений</b> → риск утраты профессиональной мотивации</li>
              <li><b>Высокие значения</b> по всем трём шкалам → выраженный синдром выгорания</li>
            </ul>

            <div className="mbi-interpretation__mini-title">Кратко про шкалы</div>
            <ul className="mbi-interpretation__list">
              <li><b>Эмоциональное истощение </b>  — про «нет сил»</li>
              <li><b>Деперсонализация </b> — про «не хочу чувствовать»</li>
              <li><b>Редукция достижений </b> — про «я не справляюсь»</li>
            </ul>

            <div className="mbi-interpretation__text">
              Такое разделение помогает точнее понять, где именно проблема и какие меры будут наиболее эффективны:
              восстановление ресурсов, работа с отношением к людям или поддержка профессиональной самооценки.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default MbiInterpretationSection;