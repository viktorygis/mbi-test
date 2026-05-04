import { getLevelForScore, getRecommendation, combinedInterpretation } from "../../mbiNorms";
import { getLevelColor, centerLine } from "../../mbiHelpers";
import { GRAY } from "../pdfStyles";

function levelIcon(level) {
  // Для fontSize 13 — идеально height: 13, центр y: 6.5
  return {
    canvas: [{ type: "ellipse", x: 6.5, y: 6.5, color: getLevelColor(level), r1: 6.5, r2: 6.5 }],
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
  if (typeof reco === "object") {
    const arr = [];
    if (reco.short) {
      arr.push({ text: reco.short, fontSize: 11, margin: [0, 0, 0, 2], color: GRAY, bold: true }); // <-- bold!
    }
    if (Array.isArray(reco.details) && reco.details.length) {
      // Лучше делать список, а не просто массив строк
      arr.push({ ul: reco.details, fontSize: 10, margin: [0, 0, 0, 4], color: GRAY });
    }
    return arr;
  }
  return "";
}

export function recommendationsBlock(mbiResults) {
  const { scores } = mbiResults;

  const recos = [
    {
      key: "exhaustion",
      label: "Эмоциональное истощение",
      level: getLevelForScore(mbiResults.scales, "exhaustion", scores.exhaustion),
      reco: getRecommendation(mbiResults.scales, "exhaustion", scores.exhaustion),
    },
    {
      key: "depersonalization",
      label: "Деперсонализация",
      level: getLevelForScore(mbiResults.scales, "depersonalization", scores.depersonalization),
      reco: getRecommendation(mbiResults.scales, "depersonalization", scores.depersonalization),
    },
    {
      key: "reduction",
      label: "Редукция личных достижений",
      level: getLevelForScore(mbiResults.scales, "reduction", scores.reduction),
      reco: getRecommendation(mbiResults.scales, "reduction", scores.reduction),
    },
  ].filter((r) => isRecoValid(r.reco));

  const combinedReco = combinedInterpretation(scores);

  return [
    { text: "Рекомендации по результатам", fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 4] },
    centerLine(300),
    ...recos
      .map((r) => [
        { text: r.label, fontSize: 13, bold: true, margin: [0, 6, 0, 2] },
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
        recoTextObj(r.reco),
      ])
      .flat(),
    ...(combinedReco && combinedReco.length
      ? [
          { text: "Профиль выгорания", fontSize: 13, bold: true, margin: [0, 12, 0, 4] },
          { ul: combinedReco, fontSize: 11, color: GRAY, margin: [0, 0, 0, 6] },
        ]
      : []),
    { text: "", margin: [0, 0, 0, 6] },
    { text: "", pageBreak: "after" },
  ];

}
