//	pdfIntroBlock.js - Блок введения в PDF
import logoBase64 from "./logo";

export function pdfIntroBlock(resultsData) {

  const userFullName = resultsData?.user?.fullName || resultsData?.userData?.fullName || "";
  const testDate = resultsData?.date || "";

  const content = [];

  // Шапка с логотипом и ссылками (см. твой предыдущий вариант)
  content.push({
    columns: [
      {
        text: "www.ai4g.ru",
        link: "https://ai4g.ru/",
        color: "#007BFF",
        fontSize: 14,
        margin: [0, 10, 0, 0],
        decoration: "underline",
        bold: true,
      },
      {
       /*  width: "*", */
        image: logoBase64,
        width: 90,
        height: 36,
        alignment: "center",
        margin: [0, 0, 0, 0],
      },
      {
        text: "Пройти тест еще раз",
        link: "https://ai4g.ru/test-mbi",
        color: "#007BFF",
        fontSize: 14,
        margin: [0, 10, 0, 0],
        decoration: "underline",
        alignment: "right",
      },
    ],
    margin: [0, 0, 0, 10],
  });

  // Горизонтальная черта
  content.push({
    canvas: [{ type: "rect", x: 0, y: 0, w: 515, h: 2, color: "#ff008a" }],
    margin: [0, 0, 0, 12],
  });

  // ФИО и дата
  content.push({
    columns: [
      {
        text: userFullName ? `ФИО: ${userFullName}` : "",
        style: "clientInfo",
        alignment: "left",
      },
      {
        text: testDate ? `Дата: ${testDate}` : "",
        style: "clientInfo",
        alignment: "right",
      },
    ],
    margin: [0, 0, 0, 4],
  });

  // Главный заголовок
  content.push({
    text: [
      { text: "PT ", style: "mainLogo" },
      { text: "Тест паттернов", style: "mainTitle" },
    ],
    alignment: "center",
    margin: [0, 100, 0, 20],
  });

  // Описание под заголовком
  content.push({
    text: [
      { text: "Паттерн ", style: "descriptionTextAccent" },
      { text: "— устойчивая модель реагирования,  предпочтение мыслить, действовать и чувствовать определенным образом", style: "descriptionText" },
    ],
    alignment: "center",
    margin: [0, 0, 0, 30],
  });

  //Заголовок для блока Паттерны
  content.push({
    text: "Зачем нужны паттерны",
    style: "mainListTitle",
  });

  content.push({
    ul: [
      {
        text: "Паттерн не бывает «хороший» или «плохой». Паттерн всегда нейтрален.",
        style: "mainListText",
      },
      {
        text: "Паттерны зависят от контекста и уровня стресса и способны со временем изменяться.",
        style: "mainListText",
      },
      {
        text: "Паттерн отвечает на вопрос о том, что находится в фокусе внимания, а что отфильтровывается из области осознания.",
        style: "mainListText",
      },
      {
        text: "Зная свои паттерны, мы осознаем свои привычные способы реагирования.",
        style: "mainListText",
      },
      {
        text: "Осознание своей структуры паттернов делает доступными новые стратегии как думать, чувствовать, действовать, что в свою очередь создает новые возможности.",
        style: "mainListText",
      },
      {
        text: "Если вы хотите понять человека, работайте с его паттернами, а не против них.",
        style: "mainListText",
      },
    ],
    margin: [0, 10, 0, 10],
  });

  // Разрыв страницы
  content.push({ text: "", pageBreak: "after" });

  return content;
}
