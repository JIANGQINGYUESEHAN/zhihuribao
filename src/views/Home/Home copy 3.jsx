import React, { useEffect, useState } from "react";
import HomeHead from "../../component/HomeHead/HomeHead";
import utils from "../../assets/utils";
import { Swiper, Divider } from "antd-mobile";
import img from "../../assets/images/timg.jpg";
import api from "../../api/index";
import "./Home.less";
import { Link } from "react-router-dom";

import SkeletonAgain from "../../component/SkeletonAgain/SkeletonAgain";
import NewsItem from "../../component/NewsItem/NewsItem";
export default function Home() {
  const [today, setToday] = useState(() => {
    return utils.formatTime(null, "{0}{1}{2}");
  });
  const [StoreInfo, SetStore] = useState([]);
  const [TopStores, SetTopStore] = useState([]);
  console.log(
    window.scrollY + window.innerHeight + 10 >= document.body.offsetHeight
  );
  //在开头发送请求
  /* 第一次渲染完毕:向服务器发送数据请求 */
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        SetStore(stories);
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
      {/* 未加载出信息时 */}
      {/* <SkeletonAgain /> */}
      {/* <Divider contentPosition="left">左侧内容</Divider>
      <NewsItem /> */}
      {StoreInfo.length == 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {StoreInfo.map((item, index) => {
            return (
              <>
                {/* {index == 0 ? (
                  <Divider contentPosition="left">
                    {utils.formatTime(today, "{1}月{2}日")}
                  </Divider>
                ) : null} */}
                {/* <NewsItem key={index} /> */}
              </>
            );
          })}
        </>
      )}
    </div>
  );
}
