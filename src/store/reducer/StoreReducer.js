import _ from '../../assets/utils'
import * as TYPES from '../action/action_type';
const InitState = {
    storeList: []
}
const StoreReducer = function (state = InitState, action) {
    //console.log(action);
    //浅克隆
    state = _.clone(state)
    switch (action.type) {
        case TYPES.STORE_LIST:
            state.storeList = action.list

            break;
        case TYPES.STORE_REMOVE:
            state.storeList = state.storeList.filter(item => {
                return item.id !== action.id
            })
            break;
        default:
            break;
    }
    return state
}

export default StoreReducer