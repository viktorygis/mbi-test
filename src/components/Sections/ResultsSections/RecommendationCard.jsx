// src/components/Sections/ResultsSections/RecommendationCard.jsx
import React from "react";
import { getLevelColor } from "../../../utils/mbiHelpers";

const RecommendationCard = ({ icon, title, level, recommendation }) => (
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
    <div className="mbi-recommendations__text">{recommendation}</div>
  </div>
);
export default RecommendationCard;