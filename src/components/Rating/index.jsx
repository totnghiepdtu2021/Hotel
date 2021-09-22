import { Checkbox, Rate } from "antd";
import React from "react";
import "./style.css";

function Rating(props) {
  const { onChangeCheckBox, ratingList } = props;
  return (
    <Checkbox.Group onChange={onChangeCheckBox}>
      {ratingList.map((item) => (
        <Checkbox value={item.value} key={item.id} className="ranking-item">
          <Rate disabled value={item.value}></Rate>
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}

export default Rating;
