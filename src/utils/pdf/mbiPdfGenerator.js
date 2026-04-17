// src/utils/pdf/mbiPdfGenerator.js

import { headerBlock } from './blocks/headerBlock';
import { resultsBlock } from './blocks/resultsBlock';
import { recommendationsBlock } from './blocks/recommendationsBlock';
import { interpretationBlock } from './blocks/interpretationBlock';
import { contactsBlock } from './blocks/contactsBlock';
import { docStyles } from './pdfStyles'; // Теперь стили и цвета в отдельном файле!

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
      ...interpretationBlock(),
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

  const fullName = userData?.fullName || "";
  const date = userData?.date || "";
  const lastName = fullName.trim().split(" ")[0] || "Results";
  const fileName = `${lastName}${date ? "_" + date : ""}_MBI.pdf`;

  pdfMake.createPdf(docDefinition).download(fileName);
}