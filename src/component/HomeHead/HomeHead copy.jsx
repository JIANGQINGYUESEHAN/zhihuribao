import React, { useEffect, useMemo } from "react";
import "./HomeHead.less";
import img from "../../assets/images/timg.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import action from "../../store/action";
function HomeHead(props) {
  console.log(props);
  const { today, info, queryUserInfoAsync } = props;
  //判断info是否存在
  useEffect(() => {
    (async () => {
      if (!info) {
        //info重新派发获取参数如果派发不成功 就说明得重新登录
        let ActionInfo = await queryUserInfoAsync();
        //从中获取info
      }
    })();
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
        <div className="img_div">
          <img src={img} alt="" className="img" />
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
