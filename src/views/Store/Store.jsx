import React from "react";
import { connect } from "react-redux";
import action from "../../store/action";
import { SwipeAction, NavBar } from "antd-mobile";
function Store(props) {
  function back() {
    props.navigate(-1);
  }
  let { store, removeStoreListById, clearStoreList } = props;
  return (
    <div className="store">
      <NavBar onBack={back}>我的收藏</NavBar>
      <div className="storeList"></div>
    </div>
  );
}
export default connect((state) => {
  return {
    store: state.store,
  };
}, action.Store)(Store);
