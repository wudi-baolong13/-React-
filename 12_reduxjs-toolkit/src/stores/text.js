import {createSlice} from '@reduxjs/toolkit'

const textSlice = createSlice({
    name:'text-slice',
    initialState:{
        content:'咏鹅'
    },
    reducers:{
        setContent(state,action){
            state.content = action.payload
        }
    }
})


export default textSlice