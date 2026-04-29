import { centerLine } from "../../mbiHelpers";

import mindBase64 from "../image/mind";
import emotionalBase64 from "../image/emotional";
import depersonalizationBase64 from "../image/depersonalization";
import reductionBase64 from "../image/reduction";
import burnoutBase64 from "../image/burnout";

const iconRow = (image, title) => ({
  columns: [
    {
      image,
      width: 20,
      height: 20,
      margin: [0, 2, 8, 0],
    },
    {
      text: title,
      bold: true,
      fontSize: 13,
      alignment: "left",
      margin: [0, 4, 0, 0],
    },
  ],
  columnGap: 8,
  style: "ulitem",
});

const bulletList = (items, margin = [0, 0, 0, 8]) => ({
  ul: items,
  fontSize: 11,
  margin,
});

export function informationBlock() {
  return [
    {
      text: "Справочная информация",
      style: "sectionTitle",
      margin: [0, 0, 0, 4],
    },
    centerLine(300),

    iconRow(mindBase64, "MBI Тест на выгорание Маслач"),

    {
      text: "MBI — один из самых известных инструментов для оценки профессионального выгорания. Он измеряет три компонента: истощение, деперсонализацию и редукцию достижений.",
      style: "infoSubtleText",
      margin: [0, 0, 0, 8],
    },

    {
      text: "Что измеряют шкалы",
      style: "infoSectionTitle",
    },
    bulletList(
      [
        { text: [{ text: "Психоэмоциональное истощение", bold: true }, { text: " — про усталость и нехватку ресурса." }] },
        { text: [{ text: "Деперсонализация", bold: true }, { text: " — про дистанцию и холодность в общении." }] },
        { text: [{ text: "Редукция личных достижений", bold: true }, { text: " — про снижение ощущения эффективности." }] },
      ],
      [0, 0, 0, 10],
    ),

    {
      text: "Как читать результат",
      style: "infoSectionTitle",
    },
    bulletList(
      [
        "Высокое истощение — нужен фокус на восстановлении.",
        "Высокая деперсонализация — стоит обратить внимание на общение.",
        "Высокая редукция достижений — может снижаться вера в собственную эффективность.",
      ],
      [0, 0, 0, 10],
    ),

    {
      text: "Психоэмоциональное истощение",
      style: "infoSectionTitle",
      margin: [0, 2, 0, 4],
    },
    iconRow(emotionalBase64, "Про усталость и ресурс."),
    bulletList(["Постоянная усталость, даже после отдыха.", "Ощущение «нет сил» на работу и общение.", "Раздражительность и перепады настроения."], [0, 0, 0, 4]),
    {
      text: "Высокие значения указывают на перегрузку и истощение. В первую очередь важно снизить нагрузку и усилить восстановление.",
      style: "infoSmallText",
      margin: [0, 0, 0, 8],
    },

    {
      text: "Деперсонализация",
      style: "infoSectionTitle",
      margin: [0, 2, 0, 4],
    },
    iconRow(depersonalizationBase64, "Про дистанцию в общении."),
    bulletList(["Формальное, «холодное» отношение к людям.", "Снижение эмпатии и раздражение.", "Общение без вовлеченности и личного контакта."], [0, 0, 0, 4]),
    {
      text: "Рост этой шкалы часто говорит о том, что человек начинает отстраняться от эмоциональной нагрузки.",
      style: "infoSmallText",
      margin: [0, 0, 0, 8],
    },

    {
      text: "Редукция личных достижений",
      style: "infoSectionTitle",
      margin: [0, 2, 0, 4],
    },
    iconRow(reductionBase64, "Про профессиональную эффективность."),
    bulletList(["Ощущение «я плохо справляюсь».", "Обесценивание своих результатов.", "Снижение мотивации и чувство бесполезности."], [0, 0, 0, 4]),
    {
      text: "Эта шкала показывает, насколько человек сохраняет ощущение собственной компетентности и значимости в работе.",
      style: "infoSmallText",
      margin: [0, 0, 0, 8],
    },

    {
      text: "Как использовать шкалы вместе",
      style: "infoSectionTitle",
      margin: [0, 4, 0, 4],
    },
    iconRow(burnoutBase64, "Сочетания помогают понять общую картину."),
    bulletList(
      [
        "Высокое истощение + высокая деперсонализация — активная фаза выгорания.",
        "Высокое истощение + снижение достижений — риск утраты мотивации.",
        "Высокие значения по всем трём шкалам — выраженный синдром выгорания.",
      ],
      [0, 0, 0, 10],
    ),

    {
      text: "Кратко про шкалы",
      style: "infoSectionTitle",
      margin: [0, 4, 0, 4],
    },
    bulletList(["Истощение — про «нет сил».", "Деперсонализация — про «не хочу чувствовать».", "Редукция достижений — про «я не справляюсь»."], [0, 0, 0, 6]),
    {
      text: "Такое разделение помогает понять, где именно проблема: в ресурсе, в отношениях с людьми или в профессиональной самооценке.",
      style: "infoSmallText",
      margin: [0, 0, 0, 0],
    },

    { text: "", pageBreak: "after" },
  ];
}
