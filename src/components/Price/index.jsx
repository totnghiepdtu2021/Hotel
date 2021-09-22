import { Checkbox } from "antd";
import React from "react";
import "./style.css";

function Price(props) {
  const { onchangeRangePrice, priceList } = props;
  return (
    <Checkbox.Group onChange={onchangeRangePrice}>
      {priceList.map((item) => (
        <Checkbox className="priceRange-item" value={item.value} key={item.id}>
          {item.price}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}

export default Price;
