import React from "react";

const MbiInterpretationSection = () => {
  return (
    <section className="mbi-interpretation">
      <div className="mbi-interpretation__container">
        <h2 className="mbi-interpretation__title">Как понимать шкалы</h2>

        <article className="mbi-interpretation__card">
          <h3 className="mbi-interpretation__card-title">Шкала Эмоциональное истощение</h3>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Что измеряет:</div>
            <div className="mbi-interpretation__text">
              Насколько человек психологически «выгорел» и исчерпан эмоционально.
            </div>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как проявляется:</div>
            <ul className="mbi-interpretation__list">
              <li>постоянная усталость, даже после отдыха</li>
              <li>ощущение «нет сил» на работу и общение</li>
              <li>снижение интереса к людям и задачам</li>
              <li>раздражительность, перепады настроения</li>
              <li>общее чувство неудовлетворенности жизнью</li>
            </ul>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как понимать результат:</div>
            <ul className="mbi-interpretation__list">
              <li>Высокие значения → ключевой признак выгорания. Человек перегружен и истощен.</li>
              <li>Средние значения → есть риск развития выгорания, требуется контроль нагрузки.</li>
              <li>Низкие значения → эмоциональный ресурс сохранен.</li>
            </ul>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Практический смысл:</div>
            <div className="mbi-interpretation__text">
              Это базовая шкала. Если она высокая — необходимо в первую очередь работать с восстановлением ресурсов
              (отдых, снижение нагрузки, темпа, количества задач, изменение режима работы, окружения).
            </div>
          </div>
        </article>

        <article className="mbi-interpretation__card">
          <h3 className="mbi-interpretation__card-title">Шкала Деперсонализация</h3>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Что измеряет:</div>
            <div className="mbi-interpretation__text">
              Степень отчуждения и «обезличивания» в отношении людей, с которыми человек работает.
            </div>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как проявляется:</div>
            <ul className="mbi-interpretation__list">
              <li>формальное, «холодное» отношение к людям</li>
              <li>снижение эмпатии, сопереживания</li>
              <li>циничность, раздражение, негативизм</li>
              <li>
                использование ярлыков, шуток, сарказма или профессионального сленга вместо личного отношения
              </li>
              <li>общение «по инструкции», без вовлеченности</li>
            </ul>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как понимать результат:</div>
            <ul className="mbi-interpretation__list">
              <li>Высокие значения → выраженное эмоциональное дистанцирование, защитная реакция на стресс</li>
              <li>Средние значения → начальные признаки отчуждения</li>
              <li>Низкие значения → сохранена вовлеченность и эмпатия</li>
            </ul>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Практический смысл:</div>
            <div className="mbi-interpretation__text">
              Это индикатор того, как выгорание влияет на отношения с людьми. Рост этой шкалы часто означает,
              что человек уже не справляется с эмоциональной нагрузкой и начинает «отгораживаться».
            </div>
          </div>
        </article>

        <article className="mbi-interpretation__card">
          <h3 className="mbi-interpretation__card-title">Шкала Редукция профессиональных достижений</h3>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Что измеряет:</div>
            <div className="mbi-interpretation__text">
              Насколько человек удовлетворен собой как специалистом и чувствует свою эффективность.
            </div>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как проявляется:</div>
            <ul className="mbi-interpretation__list">
              <li>ощущение «я плохо справляюсь»</li>
              <li>обесценивание своих результатов</li>
              <li>снижение мотивации к работе</li>
              <li>избегание задач и ответственности</li>
              <li>чувство профессиональной бесполезности</li>
            </ul>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Как понимать результат:</div>
            <ul className="mbi-interpretation__list">
              <li>
                Высокие значения редукции (т.е. сильное снижение достижений) → человек не верит в свою компетентность,
                демотивирован, снижена вовлеченность
              </li>
              <li>Низкие значения редукции → ощущение профессиональной эффективности и значимости</li>
            </ul>

            <div className="mbi-interpretation__warn">
              ⚠️ Важно: эта шкала интерпретируется «в обратную сторону» — чем выше редукция, тем хуже состояние.
            </div>
          </div>

          <div className="mbi-interpretation__block">
            <div className="mbi-interpretation__label">Практический смысл:</div>
            <div className="mbi-interpretation__text">
              Это показатель профессиональной самооценки. Он влияет на мотивацию, вовлеченность и риск ухода из профессии.
            </div>
          </div>
        </article>

        <div className="mbi-interpretation__summary">
          <h3 className="mbi-interpretation__summary-title">Как использовать шкалы вместе</h3>
          <ul className="mbi-interpretation__list">
            <li>Высокое истощение + высокая деперсонализация → активная фаза выгорания</li>
            <li>Высокое истощение + снижение достижений → риск утраты профессиональной мотивации</li>
            <li>Высокие значения по всем трём шкалам → выраженный синдром выгорания</li>
          </ul>

          <h3 className="mbi-interpretation__summary-title">Кратко про шкалы</h3>
          <ul className="mbi-interpretation__list">
            <li>Эмоциональное истощение — про «нет сил»</li>
            <li>Деперсонализация — про «не хочу чувствовать»</li>
            <li>Редукция достижений — про «я не справляюсь»</li>
          </ul>

          <div className="mbi-interpretation__text">
            Такое разделение помогает точнее понять, где именно проблема и какие меры будут наиболее эффективны:
            восстановление ресурсов, работа с отношением к людям или поддержка профессиональной самооценки.
          </div>
        </div>
      </div>
    </section>
  );
};

export default MbiInterpretationSection;