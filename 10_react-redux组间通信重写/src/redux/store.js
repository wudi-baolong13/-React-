import { legacy_createStore as createStore ,applyMiddleware} from 'redux'
import reducer from './reducers'

import {composeWithDevTools} from 'redux-devtools-extension' //引入该模块使用开发者工具
import {thunk} from 'redux-thunk' //引入该模块以支持异步action

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

//composeWithDevTools()==>使用开发者模块
//applyMiddleware(thunk)==>支持异步action
