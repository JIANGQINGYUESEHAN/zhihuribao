import { combineReducers } from "redux";
import StoreReducer from "./StoreReducer";
import BaseReducer from "./BaseReducer";

const reducer = combineReducers({
    store: StoreReducer,
    base: BaseReducer
})

export default reducer