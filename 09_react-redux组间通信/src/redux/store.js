/*
    该文件专门用于暴漏一个store对象，整个应用只有一个store对象
*/



//专门用于创建redux中的store对象
import { legacy_createStore as createStore ,applyMiddleware} from 'redux'

//引入汇总之后的reducer
import reducer from './reducers'

//引入redux-devtools-extension,使用开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'


//引入redux-thunk，用于支持异步action
import {thunk} from 'redux-thunk'



export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
