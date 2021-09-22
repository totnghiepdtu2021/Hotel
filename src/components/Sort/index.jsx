import { Radio } from "antd";
import React from "react";
import "./style.css";

function Sort(props) {
  const { sortList, handelSort } = props;
  return (
    <Radio.Group size="large" defaultValue="a">
      {sortList.map((item) => (
        <Radio.Button
          value={item.value}
          key={item.id}
          onChange={(e) => handelSort(e)}
        >
          {item.name}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export default Sort;
