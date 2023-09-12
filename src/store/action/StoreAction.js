import * as TYPES from '../action/action_type'
import api from '../../api/index'
const StoreAction = {
    //一个个方法
    async queryStoreListAsync() {
        let list = null;
        try {
            let { code, data } = await api.storeList();
            if (+code === 0) {
                list = data;
            }
        } catch (_) { }
        return {
            type: TYPES.STORE_LIST,
            list
        };
    },
    // 清空收藏列表
    clearStoreList() {
        return {
            type: TYPES.STORE_LIST,
            list: null
        };
    },
    // 移除某一项收藏
    removeStoreListById(id) {
        return {
            type: TYPES.STORE_REMOVE,
            id
        };
    }
}
export default StoreAction 