import React,{useState} from 'react'
import { Dropdown, Layout, Avatar,Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js'
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import './index.css'

const { Header } = Layout;


const Headers = () => {
    const navigate = useNavigate();
    const [isMenuCollapse,setIsMenuCollapse]=useState(false)
    const logout = () => {
        console.log(2)
        // 清除 token
        localStorage.removeItem('token');
        //跳转登录页
        navigate('/login')
        
    }

    const admin=()=>{
        navigate('/admin')
    }

    const items =[
        {
            key: '1',
            label: (
                <a onClick={()=>admin()} target='_blank' rel='noopener noreferrer'>
                    个人中心
                </a>
            )
        },
        {
            key:'2',
            label:(
                <a onClick={()=>logout()} target='_blank' rel='noopener noreferrer'>
                    退出登录
                </a>
            )
        }
    ]
    const setCollapsed=()=>{
        const newIsMenuCollapse=!isMenuCollapse
        setIsMenuCollapse(newIsMenuCollapse)
        //发布消息
        PubSub.publish('tab_Menu',newIsMenuCollapse)
    }


    return (
        <Header className='header-container'>
            <Button
                type="text"
                icon={isMenuCollapse? <MenuUnfoldOutlined/>:<MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff',
                    
                }}
                onClick={() => setCollapsed()}
            />
            <Dropdown menu={{ items }}>
                <Avatar size={36} src={<img src={require("../../assets/images/user.png")} />} />
            </Dropdown>
        </Header>
    )
}


export default Headers