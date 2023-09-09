import React, { useEffect, useRef, useState } from "react";
import HomeHead from "../../component/HomeHead/HomeHead";
import utils from "../../assets/utils";
import { Swiper, Divider, DotLoading } from "antd-mobile";
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

  const div = useRef(null);
  console.log(div.current);
  useEffect(() => {});
  //在开头发送请求
  /* 第一次渲染完毕:向服务器发送数据请求 */
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        StoreInfo.push({ date, stories });
        SetStore([...StoreInfo]);
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
      信息行
      {StoreInfo.length == 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {StoreInfo.map((item, index) => {
            let { date, stories } = item;
            return (
              <div className="news-box" key={date}>
                {index !== 0 ? (
                  <Divider contentPosition="left">
                    {utils.formatTime(date, "{1}月{2}日")}
                  </Divider>
                ) : null}
                <div className="list">
                  {stories.map((cur) => {
                    return <NewsItem key={cur.id} info={cur} />;
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}
      {/* 最底层的正在加载 */}
      <div className="loading" ref={div}>
        <DotLoading />
      </div>
    </div>
  );
}
