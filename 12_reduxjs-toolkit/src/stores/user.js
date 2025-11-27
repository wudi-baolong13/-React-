import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user-slice',
    initialState: {
        name: '张三',
        gender: '男',
        age: 18,
    },
    reducers:{
        setName(state,action){ //action.type代表执行什么方法，action.payload代表修改之后的数据
            //正常写法，默认是不能直接修改state的值，所以要返回一个新的state覆盖之前的state
            // return{
            //     ...state,
            //     name: action.payload
            // }
            state.name = action.payload //在toolkit中可以直接修改state的值

        },
        setGender(state,action){
            state.gender = action.payload
        },
        setAge(state,action){
            state.age = action.payload
        }
    }

})


export default userSlice