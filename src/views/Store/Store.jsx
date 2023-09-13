import React, { useEffect } from "react";
import { connect } from "react-redux";
import action from "../../store/action";
import store from "../../store";
import { SwipeAction, NavBar, Toast } from "antd-mobile";
import NewsItem from "../../component/NewsItem/NewsItem";
import api from "../../api/index";
function Store(props) {
  function back() {
    props.navigate(-1);
  }
  let {
    base,
    store: Store,
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
      console.log(base.info);
      console.log(storeList);
      if (!(base.info && !storeList)) {
        await queryStoreListAsync();
      }
    })();
  }, []);
  async function Delete(id) {
    console.log(id);
    try {
      let { code } = await api.storeRemove(id);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "移除失败",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "移除成功",
      });
      removeStoreListById(id);
    } catch (_) {}
  }
  return (
    <div className="store">
      <NavBar onBack={back}>我的收藏</NavBar>
      <div className="storeList">
        {Store.storeList.map((item, index) => {
          console.log(item);
          return (
            <SwipeAction
              key={index}
              className="Action"
              rightActions={[
                {
                  key: "delete",
                  text: "删除",
                  color: "danger",
                  onClick: Delete.bind(null, item.id),
                },
              ]}
            >
              <NewsItem item={item} />;
            </SwipeAction>
          );
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
