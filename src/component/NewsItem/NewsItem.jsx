import React from "react";
import "./NewsItem.less";
import img from "../../assets/images/timg.jpg";
import { Link } from "react-router-dom";

export default function NewsItem(props) {
  const { hint, id, images, title, url } = props.item;

  return (
    <Link to={{ pathname: `/detail/${id}` }} className="a">
      <div className="NewsItem">
        <div className="left">
          <h3 className="h3">{title}</h3>
          <p className="p">{hint}</p>
        </div>
        <div className="right">
          <div className="right_div">
            <img src={images[0]} alt="" className="img" />
          </div>
        </div>
      </div>
    </Link>
  );
}
