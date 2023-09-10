import React, { useEffect, useState } from "react";
import api from "../../api/index";
import "./Detail.less";
import {
  LeftOutline,
  LikeOutline,
  StarOutline,
  SendOutline,
  MailOutline,
} from "antd-mobile-icons";
import { Badge, Space } from "antd-mobile";
export default function Detail(props) {
  const { params, navigate } = props;
  /* 定义状态 */
  let [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);
  let link;
  function HandleCss(result) {}
  function HandleImage(result) {}
  useEffect(() => {
    //发送请求(结构样式)
    (async () => {
      try {
        const result = await api.queryNewsInfo(params.id);
        setInfo(result);
        //处理结构
        HandleImage(result);
        //处理样式
        HandleCss(result);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);
        console.log(result);
        setExtra(result);
      } catch (error) {}
    })();
  }, []);
  return (
    <div className="detail">
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: info.body,
        }}
      ></div>
      <div className="detail_icon">
        <div className="left">
          <span>
            <LeftOutline
              onClick={() => {
                navigate(-1);
              }}
            />
          </span>
        </div>
        <div className="right">
          <span className="left_span">
            <Badge
              content={extra ? extra.comments : null}
              bordered
              color="#19adf5"
            >
              <MailOutline />
            </Badge>
          </span>
          <span className="left_span">
            <Badge
              content={extra ? extra.popularity : null}
              bordered
              color="#19adf5"
            >
              <LikeOutline />
            </Badge>
          </span>
          <span className="left_span">
            <StarOutline />
          </span>
          <span className="left_span">
            <SendOutline />
          </span>
        </div>
      </div>
    </div>
  );
}
