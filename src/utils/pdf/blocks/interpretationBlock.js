// src/utils/pdf/blocks/interpretationBlock.js
import { getNormLevel, getInterpretation } from "../../mbiNorms";

export function interpretationBlock(mbiResults) {
  const { scores, scales } = mbiResults;
  const blocks = [];

  for (const key of ["exhaustion", "depersonalization", "reduction"]) {
    const scale = scales[key];
    if (!scale) continue;

    // Берём балл по шкале из scores
    const score = scores[key]; // <-- тут была ошибка, раньше "results[key]"

    const level = getNormLevel(scales, key, score);
    const interp = getInterpretation(scales, key, level);

    blocks.push(
      { text: scale.title, bold: true, margin: [0, 10] },
      { text: scale.description, margin: [0, 0, 0, 4] },
      { text: `Ваш балл: ${score} (${level})`, margin: [0, 0, 0, 2] },
      { text: interp?.short || "", italics: true, margin: [0, 2, 0, 2] },
      ...(interp?.details
        ? interp.details.map((item) => ({
            // pdfMake ul форматирует как список
            ul: [item],
            margin: [0, 0, 0, 4],
          }))
        : [])
    );
  }

  return blocks;
}