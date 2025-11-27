import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons';
import './home.css'
import { getData } from '../../api'
import MyEchart from '../../component/Echarts'

//table列配置
const columns = [
    {
        title: '手机品牌',
        dataIndex: 'name',
    },

    {
        title: '今日购买',
        dataIndex: 'todayBuy',
    },
    {
        title: '本月购买',
        dataIndex: 'monthBuy',
    },
    {
        title: '总购买',
        dataIndex: 'totalBuy',
    }
]

//订单统计数据
const countData = [
    {
        'name': '今日支付订单',
        'value': 1234,
        'icon': 'CheckCircleOutlined',
        'color': '#2ec7c9'
    },
    {
        'name': '今日收藏订单',
        'value': 1234,
        'icon': 'ClockCircleOutlined',
        'color': '#ffb980'
    },
    {
        'name': '今日未支付订单',
        'value': 1234,
        'icon': 'CloseCircleOutlined',
        'color': '#5ab1ef'
    },
    {
        'name': '本月支付订单',
        'value': 1234,
        'icon': 'CheckCircleOutlined',
        'color': '#2ec7c9'
    },
    {
        'name': '本月收藏订单',
        'value': 1234,
        'icon': 'ClockCircleOutlined',
        'color': '#ffb980'
    },
    {
        'name': '本月未支付订单',
        'value': 1234,
        'icon': 'CloseCircleOutlined',
        'color': '#5ab1ef'
    }
]

const iconToElement = (name) => React.createElement(Icon[name])

export default function Home() {
    const userImg = require('../../assets/images/user.png')

    //创建echart响应数据
    const [echartData, setEchartData] = useState([])
    useEffect(() => { //在组件挂载后执行

        //使用被二次封装的axios，往mock后台请求数据
        getData().then(({ data }) => {
            console.log(data, 'res')
            const { tableData, orderData, userData, videoData } = data.data
            setTableData(tableData)

            //对于echarts数据的组装
            const order = orderData
            //x轴的数据
            const xData = order.date
            console.log(order.data, 'order.data')
            //series数据的组装
            const keyArray = Object.keys(order.data[0]) //把第一个对象的属性名取出作为一个数组
            const series = []
            keyArray.forEach((key) => {  //相当于两层循环，第一层取出属性名，第二层到每一个对象里按照属性名找属性值
                series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
            })

            //数据组装完成之后完成更新
            setEchartData({
                order: {
                    xData, //x轴数据
                    series
                },
                user: {
                    xData: userData.map(item => item.date), //x轴数据  
                    series: [
                        {
                            name: '新增用户',
                            data: userData.map(item => item.new), //y轴数据
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: userData.map(item => item.active), //y轴数据
                            type: 'bar'
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            data: videoData,
                            type: 'pie'
                        }
                    ]
                }
            })
        })


    }, [])



    //定义table数据
    const [tableData, setTableData] = useState([])


    return (
        <Row className='home'>
            <Col span={8}>
                <Card hoverable>
                    <div className='user'>
                        <img src={userImg} alt='' />
                        <div className='userinfo'>
                            <p className='name'>admin</p>
                            <p className='access'>管理员</p>
                        </div>
                    </div>
                    <div className='login-info'>
                        <p>上次登录时间：<span>2022-08-01</span></p>
                        <p>上次登录地点：<span>北京</span></p>
                    </div>
                </Card>
                <Card hoverable>
                    <Table rowKey={'name'} columns={columns} dataSource={tableData} pagination={false} />
                </Card>
            </Col>
            <Col span={16}>
                <div className='num'>
                    {
                        countData.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <div className='icon-box' style={{ background: item.color }}>
                                        {iconToElement(item.icon)}
                                    </div>
                                    <div className='detail'>
                                        <p className='num'>￥{item.value}</p>
                                        <p className='txt'>{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                {echartData.order && <MyEchart chartData={echartData.order} style={{ height: '280px' }} />}
                <div className='graph'>
                    {echartData.user && <MyEchart chartData={echartData.user} style={{ height: '240px', width:'50%'}} />}
                    {echartData.video && <MyEchart chartData={echartData.video} isAxisChart={false} style={{ height: '280px', width:'50%'}} />}
                </div>

            </Col>
        </Row>
    )
}
