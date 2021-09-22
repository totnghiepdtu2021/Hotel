import React from "react";
import "./style.css";

function Service(props) {
  const { serviceList, hotelItem } = props;
  return (
    <div className="right-item-information-extensions">
      {serviceList.map(
        (item) =>
          hotelItem[item.alt] === true && (
            <span key={item.id}>
              <img src={item.img} alt={item.alt} />
              <span>{item.name}</span>
            </span>
          )
      )}
    </div>
  );
}

export default Service;
