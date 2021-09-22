import { Button, DatePicker, Input, Pagination, Select, Slider } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Accommodation from "../../components/accommodation";
import Price from "../../components/Price";
import Rating from "../../components/Rating";
import Sort from "../../components/Sort";
import { getHotelList, getSearchHotelList } from "../../redux/actions";
import Room from "./../../components/Room/index";
import "./styles.css";

const { Search } = Input;
function Hotel({
  match,
  hotelList,
  getHotelList,
  searchHotelList,
  getSearchHotelList,
}) {
  const [isLike, setIsLike] = useState(false);
  const place = match.params.place;
  const [searchKey, setSearchKey] = useState("");
  const [current, setCurent] = useState(1);
  const [tempRate, settempRate] = useState();
  const [isShowSearchList, setIsShowSearchList] = useState(false);
  //   console.log("Log: : isShowSearchList", isShowSearchList);
  const [dataSelect, setDataSelect] = useState([]);
  const [valueSelect, setValueSelect] = useState(undefined);

  //Danh sách sao
  const ratingList = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
  ];

  //Danh sách giá
  const priceList = [
    {
      id: 1,
      value: 1,
      price: "Dưới 500.000đ",
    },
    {
      id: 2,
      value: 2,
      price: "500.000đ - 1.000.000đ",
    },
    {
      id: 3,
      value: 3,
      price: "1.000.000đ - 2.000.000đ",
    },
    {
      id: 4,
      value: 4,
      price: "2.000.000đ - 3.000.000đ",
    },
    {
      id: 5,
      value: 5,
      price: "Trên 3.000.000đ",
    },
  ];

  //Danh sách chỗ ở
  const accommodationList = [
    {
      id: 1,
      value: 1,
      name: "Hotel",
    },
    {
      id: 2,
      value: 2,
      name: "Apartment",
    },
    {
      id: 3,
      value: 3,
      name: "Guesthouse",
    },
    {
      id: 4,
      value: 4,
      name: "Hostel",
    },
    {
      id: 5,
      value: 5,
      name: "Aparthotel",
    },
    {
      id: 6,
      value: 6,
      name: "Homestay",
    },
    {
      id: 7,
      value: 7,
      name: "Resort",
    },
    {
      id: 8,
      value: 8,
      name: "Villa",
    },
  ];

  //Danh sách sắp xếp
  const sortList = [
    {
      id: 1,
      value: "a",
      name: "Sắp xếp theo",
    },
    {
      id: 2,
      value: "bestFit",
      name: "Phù hợp nhất",
    },
    {
      id: 3,
      value: "asc",
      name: "Giá thấp nhất trước",
    },
    {
      id: 4,
      value: "desc",
      name: "Giá cao nhất trước",
    },
    {
      id: 5,
      value: "point",
      name: "Được đánh giá hàng đầu",
    },
  ];

  useEffect(() => {
    getHotelList({
      place: place,
      page: current,
      limit: 10,
    });
    getSearchHotelList();
  }, []);
  const hotelPagination = [...hotelList.slice(0, 10)];
  //   console.log("Console.log:  > hotelhotelPaginationList", hotelPagination);
  const allHotel = [...hotelList.slice(10)];
  //   console.log("Console.log:  > allHotel", allHotel);
  //select
  const { Option } = Select;
  const options = dataSelect.map((d) => (
    <Option key={d.value}>{d.text}</Option>
  ));
  const handleSearchSelect = (value) => {
    if (value) {
      fetch(value, (data) => setDataSelect([data]));
    } else {
      setDataSelect([]);
    }
  };

  const handleChangeSelect = (value) => {
    setValueSelect(value);
  };

  //search date
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }
  const { RangePicker } = DatePicker;
  //định dạng ngày cho datetime Picker
  const dateFormat = ["MM/DD/YYYY"];

  //sort  giá thấp đến cao
  const handelSort = (e) => {
    if (e.target.value === "bestFit") {
      setIsShowSearchList(false);
    }
    getSearchHotelList({
      place: place,
      sort: e.target.value,
      page: 1,
    });
    setCurent(1);
    settempRate({
      ...tempRate,
      sort: e.target.value,
    });
    setIsShowSearchList(true);
  };

  //hàm lấy giá trị của checkbox: sort bằng sao
  const onChangeCheckBox = (value) => {
    if (value != 0) {
      //lấy đc sao lẻ đi cùng với sao chẵn. vd:4 thì có cả 4.5
      const decimalRate = value.map((item) => {
        return (parseInt(item) + 0.5).toString();
      });
      //xoá trường hợp sao = 5.5
      const deleteV = decimalRate.findIndex((item) => item == 5.5);
      if (deleteV != -1) {
        decimalRate.splice(deleteV, 1);
      }
      //nối 2 mảng sao nguyên và sao lẻ
      const totalRate = [...value, ...decimalRate];
      setCurent(1);
      getSearchHotelList({
        place: place,
        rate: totalRate,
      });
      settempRate({
        ...tempRate,
        rate: totalRate,
      });
      setIsShowSearchList(true);
    } else setIsShowSearchList(false);
  };

  //sort bằng khoảng giá
  const onchangeRangePrice = (value) => {
    if (value.length > 0) {
      let rangePrice;
      if (value[0] == "1") {
        rangePrice = ["0", "500000"];
      } else if (value[0] == "2") {
        rangePrice = ["500000", "1000000"];
      } else if (value[0] == "3") {
        rangePrice = ["1000000", "2000000"];
      } else if (value[0] == "4") {
        rangePrice = ["2000000", "3000000"];
      } else rangePrice = ["3000000", "9000000"];
      getSearchHotelList({
        place: place,
        rangePrice: rangePrice,
        page: 1,
      });
      setCurent(1);
      settempRate({
        ...tempRate,
        rangePrice: rangePrice,
      });
      setIsShowSearchList(true);
    } else setIsShowSearchList(false);
  };

  const handelChangeSearch = (value) => {
    if (value.target.value.length === 0) {
      setSearchKey("");
    }
  };
  //fn lấy value input search
  const handelGetValueSearch = (value) => {
    if (value != "") {
      setSearchKey(value);
    } else setIsShowSearchList(false);
  };

  //search bằng name. nếu search sao có dữ liệu thì filter trên list của search sao. còn không có sẽ là list hotel
  const filterSearchListData = (
    searchHotelList.length > 0 && isShowSearchList == true && searchKey != ""
      ? searchHotelList
      : allHotel
  ).filter((item) => {
    return item.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
  });

  //dùng gán dữ liệu để in list nào [hotelList , searchList] trong hàm render list khách sạn
  const newList = () => {
    if (isShowSearchList) {
      if (searchHotelList && searchKey == false) return searchHotelList;
      else if (searchHotelList && searchKey) return filterSearchListData;
    } else {
      if (searchKey) return filterSearchListData;
      return hotelPagination > allHotel ? [] : hotelPagination;
    }
  };

  return (
    <div className="page-hotel">
      <div className="container">
        <div className="hotel-search">
          <Select
            showSearch
            value={valueSelect}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearchSelect}
            onChange={handleChangeSelect}
            notFoundContent={null}
            className="hotel-search-input"
          >
            {options}
          </Select>
          <RangePicker
            className="hotel-search-dateTime"
            disabledDate={disabledDate}
            defaultValue={[
              moment(moment().startOf("day"), dateFormat),
              moment(moment().add(1, "days"), dateFormat),
            ]}
            format={dateFormat}
          />

          <Button className="hotel-search-button">Tìm Kiếm</Button>
        </div>
        <div className="hotel-container">
          <div className="hotel-content">
            <div className="hotel-left">
              <div className="hotel-left-number-one">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/Golden_Medal_-1_Icon.svg"
                    alt="anh"
                  />
                </div>
                <h2>Số 1 về chất lượng và dịch vụ</h2>
              </div>
              <div className="hotel-left-container">
                <div>
                  <h3>Tìm khách sạn</h3>
                  <Search
                    placeholder="Nhập tên Khách sạn"
                    onChange={(value) => handelChangeSearch(value)}
                    onSearch={(value) => handelGetValueSearch(value)}
                    className="hotel-left-content-search"
                  />
                </div>
                <div className="hotel-left-content-ranking">
                  <h3>Xếp hạng khách sạn</h3>
                  {/* Render sao */}
                  <Rating
                    ratingList={ratingList}
                    onChangeCheckBox={onChangeCheckBox}
                  />
                </div>
                <div className="hotel-left-content-sortPrice">
                  <h3>Mức giá</h3>
                  <div className="sortPrice-slider">
                    <Slider
                      range
                      step={1}
                      defaultValue={[0, 500000]}
                      max={3000000}
                      min={0}
                    />
                  </div>
                  <div className="hotel-left-content-priceRange">
                    {/* render giá */}
                    <Price
                      priceList={priceList}
                      onchangeRangePrice={onchangeRangePrice}
                    />
                  </div>
                </div>
                <div className="hotel-left-content-type">
                  <h3>Loại chỗ ở</h3>
                  {/* render chỗ ở */}
                  <Accommodation accommodationList={accommodationList} />
                </div>
              </div>
            </div>
            <div className="hotel-right">
              <div className="hotel-right-sort">
                {/* render sort */}
                <Sort sortList={sortList} handelSort={handelSort} />
              </div>
              {/* <div className="hotel-right-container">{renderHotelList()}</div> */}
              <div className="hotel-right-container">
                <Room newList={newList} place={place} />
              </div>
              <div className="hotel-pagination">
                {(current === 1
                  ? current === 1 && hotelList.length >= 10
                  : hotelList.length >= 0) && (
                  <Pagination
                    current={current}
                    total={40}
                    onChange={(page) => {
                      return (
                        window.scrollTo(0, 53),
                        setCurent(page),
                        isShowSearchList !== true
                          ? getHotelList({ page, limit: 10, place: place })
                          : getSearchHotelList({
                              place: place,
                              page,
                              rate: tempRate.rate,
                              sort: tempRate.sort,
                              rangePrice: tempRate.rangePrice,
                            })
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-description"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { hotelList, searchHotelList } = state.hotelReducer;
  return {
    hotelList,
    searchHotelList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getHotelList(params)),
    getSearchHotelList: (params) => dispatch(getSearchHotelList(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
