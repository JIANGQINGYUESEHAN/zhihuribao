import _ from '../../assets/utils'
import * as TYPES from '../action-types';
const InitState = {

}
const StoreReducer = function (state = InitState, action) {
    //浅克隆
    const State = _.clone(state)
    switch (action) {


        default:
            break;
    }
    return State
}

export default StoreReducer