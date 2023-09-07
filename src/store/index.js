import { applyMiddleware, createStore } from "redux";
import reduxLogger from 'redux-logger'
import reducerPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
import reducer from "./reducer";
const middleWare = [reducerPromise, reduxThunk]

const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
    middleWare.push(reduxLogger)
}
const store = createStore(reducer, applyMiddleware(...middleWare))
export default store