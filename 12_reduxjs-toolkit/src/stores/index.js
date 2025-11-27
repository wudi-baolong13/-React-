//对各个切片进行合并
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import goodsSlice from "./goods";
import textSlice from "./text";
import countSlice from "./count";

const store=configureStore({
    reducer:{
        //将各个切片的reducer合并到一起
        user:userSlice.reducer,
        goods:goodsSlice.reducer,
        text:textSlice.reducer,
        count:countSlice.reducer
    }
})

export default store

//action:{type:'user-slice/setGender',payload:'女'}
//action会传给各个切片的reducer(xxx.reducer)，reducer会根据type的类型在Slice里的reducers中找配对的方法
