import _ from '../../assets/utils'
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