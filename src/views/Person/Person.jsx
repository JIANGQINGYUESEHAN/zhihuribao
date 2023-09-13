import React from "react";
import "./Person.less";
import { connect } from "react-redux";
import action from "../../store/action";
import { RightOutline } from "antd-mobile-icons";
import { NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import img from "../../assets/images/timg.jpg";
function Person(props) {
  function back() {
    props.navigate(-1);
  }

  return (
    <div className="person">
      <div>
        <NavBar onBack={back}></NavBar>
      </div>
      <div className="content">
        <div className="content_person">
          <div className="person_img">
            <img
              src={props.base ? props.base.info.pic : "img"}
              className="img"
              alt=""
            />
          </div>
          <span>{props.base ? props.base.info.name : "江清月色寒"}</span>
        </div>
        <div className="select">
          <Link to="/store" className="select_link">
            我的收藏
            <RightOutline className="icon" />
          </Link>
          <Link to="/store" className="select_link">
            我的消息
            <RightOutline className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default connect((state) => {
  return {
    store: state.store,
    base: state.base,
  };
}, action.Base)(Person);
