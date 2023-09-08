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
  const [ImagInfo, SetImageInfor] = useState([]);
  //在开头发送请求
  useEffect(() => {
    (async () => {
      let { date, stories, top_stories } = await api.queryNewsLatest();
      setToday(date);
      SetImageInfor(top_stories);
      // 更新新闻列表状态
      ImagInfo.push({
        date,
        stories,
      });
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
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="item_div">
              <img src={img} alt="" className="img" />
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="item_div">
              <img src={img} alt="" className="img" />
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="item_div">
              <img src={img} alt="" className="img" />
            </div>
          </Swiper.Item>
        </Swiper>
      </div>
    </div>
  );
}
