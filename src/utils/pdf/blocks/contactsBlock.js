// src/utils/pdf/blocks/contactsBlock.js
import { PINK, GRAY, BLUE } from '../pdfStyles';
import { centerLine} from "../../mbi/mbiHelpers";

export function contactsBlock() {
  return [
    { text: "Контакты", fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 4] },
    centerLine(300),
    { text: "По любым вопросам вы можете обратиться к автору проекта Елене Семеновой:", fontSize: 12, margin: [0, 16, 0, 8] },
    {
      text: [
        { text: "Телефон: ", fontSize: 12 },
        { text: "+7 916 960 1863", fontSize: 12, color: BLUE, link: "tel:+79169601863" },
      ],
      margin: [0, 0, 0, 4],
    },
    {
      text: [
        { text: "Telegram: ", fontSize: 12 },
        { text: "@SemenovaElena", fontSize: 12, color: BLUE, link: "https://t.me/SemenovaElena" },
      ],
      margin: [0, 0, 0, 4],
    },
    {
      text: [
        { text: "Email: ", fontSize: 12 },
        { text: "es@ai4g.ru", fontSize: 12, color: BLUE, link: "mailto:es@ai4g.ru" },
      ],
      margin: [0, 0, 0, 4],
    },
    {
      text: [
        { text: "Сайт: ", fontSize: 12 },
        { text: "www.coachsemenova.com", fontSize: 12, color: BLUE, link: "https://coachsemenova.com/" },
      ],
      margin: [0, 0, 0, 16],
    },
    { text: "Наш проект AI4G:", fontSize: 12, bold: true, margin: [0, 0, 0, 4] },
    {
      text: [
        { text: "Сайт: ", fontSize: 12 },
        { text: "www.ai4g.ru", fontSize: 12, color: BLUE, link: "https://ai4g.ru/" },
      ],
      margin: [0, 0, 0, 4],
    },
    {
      text: [
        { text: "Email: ", fontSize: 12 },
        { text: "info@ai4g.ru", fontSize: 12, color: BLUE, link: "mailto:info@ai4g.ru" },
      ],
      margin: [0, 0, 0, 4],
    },
    {
      text: [
        { text: "Telegram-канал: ", fontSize: 12 },
        { text: "@life_watch", fontSize: 12, color: BLUE, link: "https://t.me/life_watch" },
      ],
      margin: [0, 0, 0, 4],
    },
    { canvas: [{ type: "rect", x: 0, y: 0, w: 515, h: 1, color: "#e5e7eb" }], margin: [0, 16, 0, 12] },
    { text: "Источники методики", fontSize: 12, bold: true, margin: [0, 0, 0, 6] },
    {
      ol: [
        { text: "Фетискин Н.П., Козлов В.В., Мануйлов Г.М. Социально-психологическая диагностика развития личности и малых групп. — М., 2002. С. 360–362.", fontSize: 10, margin: [0, 0, 0, 4] },
        { text: "Maslach C., Jackson S.E. The measurement of experienced burnout // Journal of Occupational Behaviour. — 1981. — Vol. 2. — P. 99–113.", fontSize: 10, margin: [0, 0, 0, 4] },
        { text: "Водопьянова Н.Е., Старченкова Е.С. Синдром выгорания: диагностика и профилактика. — СПб.: Питер, 2005.", fontSize: 10, margin: [0, 0, 0, 4] },
      ],
    },
  ];
}
