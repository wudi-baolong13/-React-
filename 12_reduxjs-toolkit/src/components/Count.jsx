import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'




export default function Count() {

    const {count} = useSelector(state => state.count)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    const [inputValue, setInputValue] = useState(1)

    const increment = () => {
        
        dispatch({ type: 'count-slice/increment', payload: inputValue*1 });  //注意type的写法，出错在-和-的写法是不一样的，一个是中文一个是英文

    }

    const decrement = () => {
        dispatch({ type: 'count-slice/decrement', payload: inputValue*1 });
    }

    const addAge = () => {
        dispatch({ type: 'user-slice/setAge', payload: user.age+inputValue*1 });
    }

    return (
        <div>
            <h3>当前求和为：{count}</h3>
            <input type="text" onChange={e => setInputValue(e.target.value)} defaultValue={1} />
            <button onClick={increment}>点我+{inputValue}</button>
            <button onClick={decrement}>点我-{inputValue}</button><br />
            <button onClick={addAge}>点我child组件的年龄+{inputValue}</button>

        </div>
    )
}
