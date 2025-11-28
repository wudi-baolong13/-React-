/**
 * 该文件用于汇总所有的reducer
*/

import count from "./count";//为Count组件提供服务的reducer
import persons from "./person";//为Person组件提供服务的reducer
import { combineReducers } from "redux";

export default combineReducers({
    count,
    persons
})




