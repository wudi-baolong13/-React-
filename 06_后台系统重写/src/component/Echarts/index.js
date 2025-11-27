import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const axisOption={
    textStyle:{
        color:'#333'
    },
    tooltip:{
        trigger:'axis'//根据x轴触发提示框
    },
    xAxis:{
        type:"category",
        data:[],
        axisLine:{
            lineStyle:{
                color:"#17b3a3",//轴线颜色
            },
        },
        axisLabel:{
            interval:0,//间隔
            color:'#333',
        }
    },
    yAxis:[
        {
            type:"value",
            axisLine:{
                lineStyle:{
                    color:"#17b3a3",//轴线颜色
                }
            }
        }
    ],
    color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
    series:[],

}

const normalOption = {
    tooltip: {
        trigger: "item",
    },
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
}


const Echarts=({style,chartData,isAxisChart=true})=>{
    const echartRef = useRef()
    const echartObj = useRef(null)
    useEffect(()=>{
        let options
        if(!echartObj.current){
            echartObj.current = echarts.init(echartRef.current)
        }

        if(isAxisChart){
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series
            options= axisOption
        }else{
            normalOption.series = chartData.series
            options = normalOption
        }
        echartObj.current.setOption(options)
    },[chartData])
    return (
        <div ref={echartRef} style={style}></div>
    )

}

export default Echarts