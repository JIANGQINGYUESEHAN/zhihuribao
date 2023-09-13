import React, { useEffect, useMemo } from "react";
import "./HomeHead.less";
import img from "../../assets/images/timg.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import action from "../../store/action";
import store from "../../store";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
function HomeHead(props) {
  console.log(props);
  const { today, info, queryUserInfoAsync } = props;
  const navigate = useNavigate();
  //点击头像
  async function clickAvatar() {
    //判断是否获得了info ，获得了info就说明已经登录 ，info没有就重新派发一下，然后还没有 就 直接跳转到 登录页记录要去的路由地址，登录后直接跳转
    if (!info) {
      let ActionInfo = await queryUserInfoAsync();
      let { info: Info } = ActionInfo;

      //继续判段
      if (!Info) {
        Toast.show({
          icon: "fail",
          content: "请先登录",
        });
        //跳转到登录路由
        navigate({
          pathname: "/login",
          search: `?to=${"/update"}`,
        });
      }
      store.dispatch(ActionInfo);
    }
    navigate("/person");
  }

  //判断info是否存在
  useEffect(() => {
    if (!info) {
      queryUserInfoAsync();
    }
  });

  //计算 today
  const day = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
      area = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];

    return {
      month: area[+month] + "月",
      day,
    };
  }, [today]);
  return (
    <div className="HomeHead">
      <div className="left">
        <div className="left_top">
          <span className="top_span">{day.day}</span>
        </div>
        <div className="left_bottom">
          <span className="bottom_span">{day.month}</span>
        </div>
      </div>
      <div className="middle">
        <span className="middle_span">早安，世界</span>
      </div>
      <div className="right">
        <div className="img_div" onClick={clickAvatar}>
          <img src={info ? info.pic : img} alt="" className="img" />
        </div>
      </div>
    </div>
  );
}
HomeHead.defaultProps = {};
HomeHead.propTypes = {
  today: PropTypes.string,
};
export default connect((state) => state.base, action.Base)(HomeHead);
