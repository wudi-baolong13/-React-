import React from 'react'
import '../../src/index.css'
import {Layout,theme } from 'antd';
import Aside from '../component/Aside';
import Headers from '../component/Headers';
import { Outlet } from 'react-router-dom';
import { RouterAuth } from '../router/routerAuth'
const {Content } = Layout;

export default function Main() {


  //获取主题色
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  return (
    <RouterAuth>
      <Layout className='main-container'>
      <Aside />
      <Layout>
        <Headers />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </RouterAuth>
    
  )
}
