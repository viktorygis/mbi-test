import { headerBlock } from "./blocks/headerBlock";
import { resultsBlock } from "./blocks/resultsBlock";
import { informationBlock } from "./blocks/informationBlock";
import { contactsBlock } from "./blocks/contactsBlock";
import { docStyles } from "./pdfStyles";
import {formatDateFile, getLastName } from "./pdfHelpers";


export async function downloadMbiPDF(mbiResults, userData, timeDisplay, extra = {}) {
  if (!mbiResults) {
    alert("Нет данных для создания PDF!");
    return;
  }

  const { scalesData } = extra;

  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  pdfMake.addVirtualFileSystem(pdfFonts.pdfMake?.vfs ?? pdfFonts);

  const mbiResultsWithScales = {
    ...mbiResults,
    scalesData: scalesData ?? null,
  };

  const docDefinition = {
    content: [
      ...headerBlock(userData, timeDisplay),
      ...resultsBlock(mbiResultsWithScales),
      ...informationBlock(),
      ...contactsBlock(),
    ],
    styles: docStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}   |   ai4g.ru`,
      alignment: "center",
      margin: [0, 10],
      style: "pages",
    }),

    pageMargins: [40, 50, 40, 50],
  };

  // ФИО берем как раньше
  const userFullName = userData?.user?.fullName || userData?.fullName || "";

  // Дату теперь всегда из timeDisplay (как в шапке ResultsHeader)
  const testDate = timeDisplay || "";
  const lastName = getLastName(userFullName) || "Results";
  const formattedDate = formatDateFile(testDate) || "";
  const fileName = `${lastName}_${formattedDate}_MBI.pdf`;

  pdfMake.createPdf(docDefinition).download(fileName);
}