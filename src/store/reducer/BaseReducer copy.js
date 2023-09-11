import _ from '../../assets/utils'
import * as TYPES from '../action/action_type';
const InitState = {
    info: null
}
const BaseReducer = function (state = InitState, action) {
    //浅克隆
    state = _.clone(state)
    switch (action.type) {
        case TYPES.BASE_INFO:
            state.info = action.info
            // console.log(State);
            break;

        default:

    }

    return state
}

export default BaseReducer