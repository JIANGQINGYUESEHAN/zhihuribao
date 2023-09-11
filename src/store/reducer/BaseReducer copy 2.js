import _ from '../../assets/utils'
import * as TYPES from '../action/action_type';
const InitState = {
    info: null
}
const BaseReducer = function (state = InitState, action) {
    state = _.clone(state);
    switch (action.type) {
        // 更新登录者信息
        case TYPES.BASE_INFO:

            state.info = action.info;
            break;
        default:
    }
    return state;
};

export default BaseReducer