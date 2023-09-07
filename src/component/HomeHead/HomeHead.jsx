import React from "react";
import "./HomeHead.less";

export default function HomeHead(props) {
  const { today } = props;
  return (
    <div className="HomeHead">
      <div className="left">
        <div className="left_top">
          <span className="topspan">25</span>
        </div>
        <div className="left_bottom">
          <span> 十月</span>
        </div>
      </div>
      <div className="middle"></div>
      <div className="right"></div>
    </div>
  );
}
