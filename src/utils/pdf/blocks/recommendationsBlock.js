import { getLevelForScore, getRecommendation } from "../../mbiNorms";
import { getLevelColor, centerLine } from "../../mbiHelpers";
import { GRAY } from "../pdfStyles";

function levelIcon(level) {
  // Для fontSize 13 — идеально height: 13, центр y: 6.5
  return {
    canvas: [
      { type: "ellipse", x: 6.5, y: 6.5, color: getLevelColor(level), r1: 6.5, r2: 6.5 }
    ],
    width: 13,
    height: 13,
    margin: [0, 0, 4, 0],
  };
}

function isRecoValid(reco) {
  if (!reco) return false;
  if (typeof reco === "string") return reco.trim().length > 0;
  if (typeof reco === "object") {
    const short = reco.short && String(reco.short).trim();
    return !!(short || (Array.isArray(reco.details) && reco.details.length));
  }
  return false;
}

function recoTextObj(reco) {
  if (!reco) return "";
  if (typeof reco === "string") return reco;
  if (typeof reco === "object") {
    return [
      reco.short ? { text: reco.short, margin: [0, 0, 0, 2] } : undefined,
      Array.isArray(reco.details) && reco.details.length ? { ul: reco.details, fontSize: 10 } : undefined,
    ].filter(Boolean);
  }
  return "";
}

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
  ].filter((r) => isRecoValid(r.reco));

  return [
    { text: "Рекомендации по результатам", fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 4] },
    centerLine(300),
    { text: "Коротко о том, что означает ваш результат и на что обратить внимание:", fontSize: 11, color: GRAY, margin: [0, 6, 0, 8] },
    ...(recos.length
      ? recos
          .map((r) => [
            // Подзаголовок
            { text: r.label, fontSize: 13, bold: true, margin: [0, 6, 0, 2] },
            // Уровень с цветным кружком и текстом
            {
              columns: [
                levelIcon(r.level),
                {
                  text: r.level,
                  color: getLevelColor(r.level),
                  fontSize: 11,
                  bold: true,
                  margin: [0, 0, 8, 0],
                },
              ],
              columnGap: 4,
              margin: [0, 0, 0, 2],
            },
            // Текст рекомендации (строка или объект)
            { text: recoTextObj(r.reco), fontSize: 11, margin: [0, 0, 0, 6], color: GRAY },
          ])
          .flat()
      : [
          {
            text: "Уровни по шкалам находятся в средней зоне. Если есть субъективное ощущение перегрузки — ориентируйтесь на самочувствие и добавляйте восстановление.",
            fontSize: 11,
            margin: [0, 0, 0, 10],
          },
        ]),
    { text: "", margin: [0, 0, 0, 6] },
  ];
}