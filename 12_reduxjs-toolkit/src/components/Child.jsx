import { useSelector, useDispatch } from "react-redux"

import userSlice from '../stores/user'
//这里的setAge是为了 setAge方法生成对应的action对象的
const {setAge} = userSlice.actions
//即setAge(user.age+1) 实际上生成了一个action(type:'user-slice/setAge',payload:user.age+1)



const Child=()=>{
    const user=useSelector(state=>state.user) //从store中取出user切片的数据
    const text=useSelector(state=>state.text)
    const dispatch = useDispatch() //获取dispatch派发器方法，负责把action发给对应的reducer
    const demo=()=>{
        console.log(1)
        console.log(2)
        console.log(3)
    }
    return (
        <div>
            <h1>子组件 - {JSON.stringify(user)}</h1>
            <button onClick={()=>dispatch(setAge(user.age+1))}>年龄加1</button>

            <p>下方组件的诗为: {text.content}</p>
            <button onClick={demo}>demo</button>

        </div>
    )
}

export default Child