import React from "react";
import { getLevelColor } from "../../../utils/mbiHelpers";

const RecommendationCard = ({ icon, title, level, recommendation }) => {
  let content = null;

  if (!recommendation) {
    content = null;
  } else if (typeof recommendation === "string") {
    // Старый формат: просто строка
    content = <div className="mbi-recommendations__text">{recommendation}</div>;
  } else if (typeof recommendation === "object" && recommendation !== null) {
    // Новый формат: объект с short и details (массив строк)
    content = (
      <div className="mbi-recommendations__text">
        {recommendation.short && <div className="mbi-recommendations__short">{recommendation.short}</div>}
        {Array.isArray(recommendation.details) && recommendation.details.length > 0 && (
          <ul className="mbi-recommendations__list">
            {recommendation.details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="mbi-recommendations__card">
      <div className="mbi-recommendations__header">
        <div className="mbi-recommendations__icon-wrap">
          <img src={icon} alt="" className="mbi-recommendations__icon" />
        </div>
        <div>
          <div className="mbi-recommendations__card-category">{title}</div>
          <div
            className="mbi-recommendations__card-title"
            style={{ color: getLevelColor(level) }}
          >
            {level}
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default RecommendationCard;