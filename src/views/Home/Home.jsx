import React, { useEffect, useState } from "react";
import HomeHead from "../../component/HomeHead/HomeHead";
import utils from "../../assets/utils";
import { Swiper, Image } from "antd-mobile";
import img from "../../assets/images/timg.jpg";
import api from "../../api/index";
import "./Home.less";
import { Link } from "react-router-dom";
import Detail from "../Detail";
export default function Home() {
  const [today, setToday] = useState(() => {
    return utils.formatTime(null, "{0}{1}{2}");
  });
  const [StoreInfo, SetStore] = useState([]);
  const [TopStores, SetTopStore] = useState([]);
  //在开头发送请求
  /* 第一次渲染完毕:向服务器发送数据请求 */
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        SetStore(stories);
        SetTopStore(top_stories);
      } catch (_) {}
    })();
  }, []);

  return (
    <div>
      <HomeHead today={today} />
      {/* 轮播图 */}
      <div className="swiper_box">
        <Swiper loop autoplay>
          {TopStores.map((item, index) => {
            const { id, image, title, hint } = item;
            return (
              <Swiper.Item key={id}>
                <Link to={{ pathname: `/detail/${id}` }} className="herf">
                  <div className="item_div">
                    <img src={image ? image : img} alt="" className="img" />
                    <div className="info">
                      <div className="content">
                        <h3 className="h3">{title}</h3>
                      </div>
                      <div className="author">
                        <p className="p">{hint}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Swiper.Item>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
