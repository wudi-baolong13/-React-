/*
    该文件专门为Count组件生成action对象
*/

import {INCREMENT,DECREMENT} from '../constant'


//同步action，指action的值为Object类型的一般对象 
export const increment = data=>({type:INCREMENT,data}) //传data进去，返回一个对象
export const decrement = data=>({type:DECREMENT,data})

//异步action，指action的值为函数,异步action中一般都会调用同步action
export const incrementAsync =(data,time)=>{
    return(dispatch)=>{
       setTimeout(()=>{
        dispatch(increment(data))
       },time) 
    }
}
