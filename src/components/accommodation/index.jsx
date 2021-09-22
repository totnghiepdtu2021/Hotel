import { Checkbox } from "antd";
import React from "react";
import "./style.css";

function Accommodation(props) {
  const { accommodationList } = props;
  return (
    <Checkbox.Group>
      {accommodationList.map((item) => (
        <Checkbox className="priceRange-item" value={item.value} key={item.id}>
          {item.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}

export default Accommodation;
