import React from "react";
import "./style.css";

function Point(props) {
  const { point } = props;
  return (
    <div className="point-child">
      <span>{point}</span>

      {point >= 9 ? (
        <span>Tuyệt vời</span>
      ) : point >= 8 ? (
        <span>Rất tốt</span>
      ) : point >= 6.5 ? (
        <span>Tốt</span>
      ) : point >= 5 ? (
        <span>Chấp nhận được</span>
      ) : point >= 4 ? (
        <span>Kém</span>
      ) : (
        <span>Quá kém</span>
      )}
    </div>
  );
}

export default Point;
