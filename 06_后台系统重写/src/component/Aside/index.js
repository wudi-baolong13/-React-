import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import MenuConfig from '../../config'
import { useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js';
const { Sider } = Layout;

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

const items = MenuConfig.map(item => {

    const child = {
        key: item.path,
        icon: iconToElement(item.icon),
        label: item.label
    }

    //有子菜单
    if (item.children) {
        child.children = item.children.map(item => {
            return {
                key: item.path,
                label: item.label
            }
        })
    }

    return child
})






export default function Aside() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Navigate = useNavigate()

    useEffect(() => {
        console.log('item@',items)
        //订阅消息
        const token = PubSub.subscribe('tab_Menu', (msg, data) => {
            setIsMenuOpen(data); // 将发布的值保存到本地状态
        });

        // 清理订阅
        return () => {
            PubSub.unsubscribe(token);
        };

    }, [])

    const selectMenu = (e) => {
        
        Navigate(e.key)
    }
    return (
        <Sider trigger={null} collapsed={isMenuOpen} >
            <div className="demo-logo-vertical" />
            <h3 className='app-name'>{isMenuOpen ? '后台' : '后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{
                    height: "100%",
                }}
                onClick={selectMenu}
            />
        </Sider>
    )
}
