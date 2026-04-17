// src/utils/pdf/blocks/recommendationsBlock.js
import { getLevelForScore, getRecommendation} from "../../mbiNorms";
import { centerLine} from "../../mbiHelpers";
import { PINK, GRAY, BLUE } from '../pdfStyles';


export function recommendationsBlock(mbiResults) {
  const { scores } = mbiResults;

  const recos = [
    {
      key: "exhaustion",
      label: "Эмоциональное истощение",
      level: getLevelForScore("exhaustion", scores.exhaustion),
      reco: getRecommendation("exhaustion", scores.exhaustion),
    },
    {
      key: "depersonalization",
      label: "Деперсонализация",
      level: getLevelForScore("depersonalization", scores.depersonalization),
      reco: getRecommendation("depersonalization", scores.depersonalization),
    },
    {
      key: "reduction",
      label: "Редукция профессиональных достижений",
      level: getLevelForScore("reduction", scores.reduction),
      reco: getRecommendation("reduction", scores.reduction),
    },
  ].filter((r) => r.reco && r.reco.trim());

  return [
    { text: "Рекомендации по результатам", fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 4] },
    centerLine(300),
    { text: "Коротко о том, что означает ваш результат и на что обратить внимание:", fontSize: 11, color: GRAY, margin: [0, 6, 0, 8] },
    {
      ul: recos.length
        ? recos.map((r) => ({
            text: [{ text: `${r.label}: `, bold: true }, `${r.level} — ${r.reco}`],
          }))
        : ["Уровни по шкалам находятся в средней зоне. Если есть субъективное ощущение перегрузки — ориентируйтесь на самочувствие и добавляйте восстановление."],
      fontSize: 11,
      margin: [0, 0, 0, 10],
    },
    { text: "", margin: [0, 0, 0, 6] },
  ];
}
