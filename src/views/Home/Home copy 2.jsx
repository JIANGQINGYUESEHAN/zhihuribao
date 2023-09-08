import React, { useEffect, useState } from "react";
import HomeHead from "../../component/HomeHead/HomeHead";
import utils from "../../assets/utils";
import { Swiper, Image } from "antd-mobile";
import img from "../../assets/images/timg.jpg";
import api from "../../api/index";
import "./Home.less";
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
        <Swiper
          loop
          autoplay
          onIndexChange={(i) => {
            console.log(i, "onIndexChange1");
          }}
        >
          <Swiper.Item>
            <div className="item_div">
              <img src={img} alt="" className="img" />
              <div className="info">
                <div className="content">
                  <span className="content_span ">
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                  </span>
                </div>
                <div className="author"></div>
              </div>
            </div>
          </Swiper.Item>
        </Swiper>
      </div>
    </div>
  );
}
