import React, { useEffect } from "react";
import { connect } from "react-redux";
import action from "../../store/action";
import { SwipeAction, NavBar } from "antd-mobile";
import NewsItem from "../../component/NewsItem/NewsItem";
function Store(props) {
  function back() {
    props.navigate(-1);
  }
  let {
    base,
    store,
    removeStoreListById,
    clearStoreList,
    queryStoreListAsync,
    queryUserInfoAsync,
  } = props;
  let { storeList } = Store;

  useEffect(() => {
    (async () => {
      if (!base.info) {
        console.log(11);
        let { info } = await queryUserInfoAsync();
        if (!info) {
          //重新派发
          store.dispatch(await queryUserInfoAsync());
        }
      }

      if (!(base.info && !storeList)) {
        await queryStoreListAsync();
      }
    })();
  }, []);

  return (
    <div className="store">
      <NavBar onBack={back}>我的收藏</NavBar>
      <div className="storeList">
        {store.storeList.map((item, index) => {
          return <NewsItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
}
export default connect(
  (state) => {
    return {
      store: state.store,
      base: state.base,
    };
  },
  { ...action.Store, ...action.Base }
)(Store);
