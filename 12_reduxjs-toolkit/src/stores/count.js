import { createSlice } from "@reduxjs/toolkit"


const countSlice = createSlice({
    name: 'count-slice',
    initialState: {
        count: 0

    },
    reducers: {
        increment(state, action) {
            console.log(111)
            state.count+= action.payload

        },
        decrement(state, action) {
            state.count-=action.payload
        }
    }
})

export default countSlice