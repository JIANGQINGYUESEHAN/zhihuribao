import _ from '../../assets/utils'
// import * as TYPES from '../action/action_type';
const InitState = {

}
const BaseReducer = function (state = InitState, action) {
    //浅克隆
    const State = _.clone(state)
    switch (action) {


        default:
            break;
    }
    return State
}

export default BaseReducer