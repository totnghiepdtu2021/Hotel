import { Rate, Tooltip } from "antd";
import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import laundry from "../../images/listHotel/iconlaunky.svg";
import iconmaps from "../../images/listHotel/iconmaps.svg";
import parking from "../../images/listHotel/iconparking.svg";
import pool from "../../images/listHotel/iconpool.svg";
import restaurant from "../../images/listHotel/iconrestaurant.svg";
import history from "../../util/history";
import Point from "./../Point/index";
import Service from "./../Service/index";
import "./style.css";

function Room(props) {
  const { newList, place } = props;

  // Danh sách dịch vụ
  const serviceList = [
    {
      id: 1,
      name: "Nhà hàng",
      img: restaurant,
      alt: "restaurant",
    },
    {
      id: 2,
      name: "Bể bơi",
      img: pool,
      alt: "pool",
    },
    {
      id: 3,
      name: "Giặt ủi",
      img: laundry,
      alt: "laundry",
    },
    {
      id: 4,
      name: "Đỗ xe",
      img: parking,
      alt: "parking",
    },
  ];

  //render  1 khách sạn
  return (
    <div>
      {newList().map((hotelItem, hotelIndex) => (
        <div
          key={`hotel-${hotelItem.id}-${hotelIndex}`}
          className="hotel-wrapper"
          onClick={() => history.push(`/hotel/${place}/${hotelItem.id}`)}
        >
          <div className="hotel-wrapper-left">
            <img src={hotelItem.url[0].src} alt={hotelItem.url[0].alt} />
          </div>
          <div className="hotel-wrapper-right">
            <div className="hotel-wrapper-right-item">
              <div>
                <h2>{hotelItem.name}</h2>
              </div>
              <div className="right-item-information">
                <div className="right-item-information-rate">
                  <Rate disabled allowHalf defaultValue={hotelItem.rate}></Rate>
                </div>
                <Tooltip
                  placement="topRight"
                  title={hotelItem.address}
                  color="#ff9633"
                >
                  <div className="right-item-information-place text-clamp">
                    <img src={iconmaps} alt="iconmaps" />
                    <span>{hotelItem.address}</span>
                  </div>
                </Tooltip>
                {/* Render danh sách dịch vụ */}
                <Service serviceList={serviceList} hotelItem={hotelItem} />
                {/* Render điểm */}
                <Point point={hotelItem.point} />
              </div>
            </div>
            <div className="right-item-price">
              <div>
                {1 ? (
                  <FcLikePlaceholder className="non-like"></FcLikePlaceholder>
                ) : (
                  <FcLike className="point-heart" />
                )}
              </div>
              <div>
                <div className="right-item-price-oldPrice">
                  <p>
                    {hotelItem.oldPrice.toLocaleString()}
                    <span className="under-line">đ</span>
                  </p>
                  <p>
                    {Math.ceil(
                      -100 + (hotelItem.defaultPrice * 100) / hotelItem.oldPrice
                    )}
                    &#37;
                  </p>
                </div>
                <p className="right-item-price-newPrice">
                  <b>
                    {hotelItem.defaultPrice.toLocaleString()}
                    <span className="under-line">đ</span>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Room;
