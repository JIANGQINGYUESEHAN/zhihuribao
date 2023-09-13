import React, { useEffect, useState } from "react";
import "./NewsItem.less";
import img from "../../assets/images/timg.jpg";
import { Link } from "react-router-dom";

export default function NewsItem(props) {
  //先判断这个 item有没有 news
  let [obj, setObj] = useState({});
  useEffect(() => {
    if ("news" in props.item) {
      const { id, image, title } = props.item.news;
      setObj({ id, image, title });
    } else {
      const { hint, id, images, title, url } = props.item;
      setObj({ hint, id, images, title, url });
    }
    return () => {
      setObj({});
    };
  }, []);

  return (
    <Link to={{ pathname: `/detail/${obj.id}` }} className="a">
      <div className="NewsItem">
        <div className="left">
          <h3 className="h3">{obj.title}</h3>
          {"url" in obj ? <p className="p">{obj.hint}</p> : null}
        </div>
        <div className="right">
          <div className="right_div">
            <img
              src={"url" in obj ? obj.images[0] : obj.image}
              alt=""
              className="img"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
