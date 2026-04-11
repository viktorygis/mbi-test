// src/components/Sections/ResultsSections/LiteratureSection.jsx
import React from 'react';

const sources = [
  {
    id: 'toolkit',
    authors: 'К. Маслач и С. Джексон | адаптация Н.Е. Водопьянова',
    title: 'Опросник на определение уровня психического выгорания (MBI)',
  },
  {
    id: 'fetiskin',
    authors: 'Фетискин Н.П., Козлов В.В., Мануйлов Г.М.',
    title: 'Социально-психологическая диагностика развития личности и малых групп.',
    extra: '— М., 2002. С. 360–362.',
  },
  {
    id: 'maslach',
    authors: 'Maslach C., Jackson S.E.',
    title: 'The measurement of experienced burnout',
    extra: '// Journal of Occupational Behaviour. — 1981. — Vol. 2. — P. 99–113.',
  },
  {
    id: 'vodopyanova',
    authors: 'Водопьянова Н.Е., Старченкова Е.С.',
    title: 'Синдром выгорания: диагностика и профилактика.',
    extra: '— СПб.: Питер, 2005.',
  },
];

const LiteratureSection = () => (
  <section className="literature">
    <div className="literature__container">
      <div className="literature__body">
        <h2 className="literature__title">Источник методики</h2>

        <p className="literature__text">
          Ниже приведены основные источники и публикации, на которых основана методика и её адаптация.
        </p>

        <div className="literature__list-container">
          <ol className="literature__list">
            {sources.map((s) => (
              <li key={s.id} className="literature__item">
                {s.authors ? (
                  <p>
                    <span>{s.authors}</span> {s.title} {s.extra}
                  </p>
                ) : (
                  <p>{s.text}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default LiteratureSection;