import { headerBlock } from "./blocks/headerBlock";
import { resultsBlock } from "./blocks/resultsBlock";
import { recommendationsBlock } from "./blocks/recommendationsBlock";
import { informationBlock } from "./blocks/informationBlock";
import { contactsBlock } from "./blocks/contactsBlock";
import { docStyles } from "./pdfStyles";

// Функция для форматирования даты: если dateString уже в формате dd-mm-yyyy, то оставляем как есть
function formatDate(dateString) {
  if (!dateString) return "";
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return dateString;
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return dateString;
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function getLastName(fullName) {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  return names[0];
}

export async function downloadMbiPDF(mbiResults, userData, timeDisplay) {
  if (!mbiResults) {
    alert("Нет данных для создания PDF!");
    return;
  }
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  pdfMake.addVirtualFileSystem(pdfFonts.pdfMake?.vfs ?? pdfFonts);

  const docDefinition = {
    content: [
      ...headerBlock(userData, timeDisplay),
      ...resultsBlock(mbiResults),
      ...recommendationsBlock(mbiResults),
      ...informationBlock(mbiResults),
      ...contactsBlock(),
    ],
    styles: docStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}   |   ai4g.ru`,
      alignment: "center",
      margin: [0, 10],
      style: "pages",
    }),
    pageMargins: [40, 60, 40, 60],
  };

  // ФИО берем как раньше
  const userFullName = userData?.user?.fullName || userData?.fullName || "";

  // Дату теперь всегда из timeDisplay (как в шапке ResultsHeader)
  const testDate = timeDisplay || "";
  const lastName = getLastName(userFullName) || "Results";
  const formattedDate = formatDate(testDate) || "";
  const fileName = `${lastName}_${formattedDate}_MBI.pdf`;

  pdfMake.createPdf(docDefinition).download(fileName);
}