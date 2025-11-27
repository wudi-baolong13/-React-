import React from 'react'
import axios from 'axios'
import textSlice from '../stores/text'
import { useSelector, useDispatch } from "react-redux"


const {setContent} = textSlice.actions

export default function ReText() {

    const user=useSelector(state=>state.user)
    const content=useSelector(state=>state.text)
    const dispatch = useDispatch()
    

    const submit = () => {
        
        axios.get(`https://api.apiopen.top/api/sentences`).then(
            res => {
                dispatch(setContent(res.data.result.name))
            },
            err => {
                console.log(err)
            }
        )
    }

    return (
        <div>
            <h1>随机生成一句话</h1>
            <button onClick={submit}>提交</button>
            <p>{JSON.stringify(content.content)}</p>
            <p>上方组件的对象信息为：{JSON.stringify(user)}</p>
        </div>
    )
}
