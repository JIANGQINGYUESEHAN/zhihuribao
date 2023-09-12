import React, { useEffect, useState } from "react";
import api from "../../api/index";
import "./Detail.less";
import action from "../../store/action/index";
import {
  LeftOutline,
  LikeOutline,
  StarOutline,
  SendOutline,
  MailOutline,
  StarFill,
} from "antd-mobile-icons";
import { Badge, Space } from "antd-mobile";
import { flushSync } from "react-dom";
import SkeletonAgain from "../../component/SkeletonAgain/SkeletonAgain";
import { connect } from "react-redux";
function Detail(props) {
  const { params, navigate } = props;
  console.log(props);
  /* 定义状态 */
  let [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);
  let link;
  function HandleCss(result) {
    //解构出 result
    let { css } = result;

    //判断css是不是数组不是直接返回

    link = document.createElement("link");

    link.rel = "stylesheet1";

    link.href = css[0];
    document.head.appendChild(link);
  }
  function HandleImage(result) {
    let imgPlaceHolder = document.querySelector(".img-place-holder");
    if (!imgPlaceHolder) return;
    // 创建大图
    let tempImg = new Image();
    tempImg.src = result.image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    };
  }
  useEffect(() => {
    //发送请求(结构样式)
    (async () => {
      try {
        const result = await api.queryNewsInfo(params.id);
        flushSync(() => {
          setInfo(result);

          //处理结构
          HandleImage(result);
        });
        //处理样式
        HandleCss(result);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);

        setExtra(result);
      } catch (error) {}
    })();
  }, []);

  function store() {
    //点击判段受否登录，没有没有登录，进行登录获取信息然后重新跳转
    //然后在获取到store里面的信息 在外面进行是否收藏的比较收藏了就渲染成实心，点击时会出现 已经收藏的字样，然后没有收藏进行收藏进行样式的同步
    //判读是否登录
  }
  return (
    <>
      {setInfo == null ? (
        <SkeletonAgain />
      ) : (
        <div className="detail">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: info ? info.body : null }}
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
              <span className="left_span star" onClick={store}>
                {/* <StarOutline  /> */}
                <StarFill color="var(--adm-color-primary)" />
              </span>
              <span className="left_span">
                <SendOutline />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default connect(
  (state) => {
    return {
      store: state.store,
      base: state.base,
    };
  },
  { ...action.Base, ...action.Store }
)(Detail);
