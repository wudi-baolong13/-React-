import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // 处理加法
        increment: state => {
            state.value += 1;
        },
        // 处理减法
        decrement: state => {
            state.value -= 1;
        },
        // 处理加法
        addValue: (state, action) => {
            state.value += action.data;
        }
    }

})

export const { increment, decrement, addValue } = counterSlice.actions;
export default counterSlice.reducer;
export const syncAddvalue = value => dispatch => {
  setTimeout(() => {
    dispatch(addValue(value));
  }, 2000);
};