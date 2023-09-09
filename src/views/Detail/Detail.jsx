import React from "react";
import "./Detail.less";
import { LeftOutline } from "antd-mobile-icons";
export default function Detail() {
  return (
    <div className="detail">
      <div className="detail_icon">
        <div className="left">
          <span>
            <LeftOutline />
          </span>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
