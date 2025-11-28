import { INCREMENT,DECREMRNT } from "../constant";

export const increment =data=>({type:INCREMENT,data})
export const decrement =data=>({type:DECREMRNT,data})

export const incrementAsync=(data,time)=>{
    return(dispatch)=>{
        setTimeout(()=>{
            dispatch(increment(data))
        },time)
    }
}
