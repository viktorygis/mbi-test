import React, { useContext } from "react";
import { MbiDataContext } from "../../context/MbiDataContext";
import { getNormLevel, getInterpretation } from "../../utils/mbiNorms";

export default function MbiInterpretationSection({ results }) {
  const { scales } = useContext(MbiDataContext);
  if (!scales || !results) return null;

  const keys = ["exhaustion", "depersonalization", "reduction"];
  return (
    <section>
      <h2>Справочная информация и интерпретации</h2>
      {keys.map(key => {
        const scale = scales[key];
        const score = results[key];
        const level = getNormLevel(scales, key, score);
        const interp = getInterpretation(scales, key, level);

        return (
          <div key={key} style={{ border: "1px solid #ddd", marginBottom: 16, padding: 16 }}>
            <h3>{scale.title}</h3>
            <div>{scale.description}</div>
            <div>
              <b>Результат:</b> {score} — {level}
            </div>
            <div>
              <b>Кратко:</b> {interp?.short}
            </div>
            {interp?.details &&
              <ul>
                {interp.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            }
          </div>
        );
      })}
    </section>
  );
}