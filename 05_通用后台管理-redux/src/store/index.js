import {configureStore} from '@reduxjs/toolkit'
import TabReducer from './reducers/tab'

export default configureStore({
    reducer: {
        // 添加reducer
        tab: TabReducer
    }
})