import { React } from 'react';
import { Layout, theme } from 'antd';
import CommonAside from '../component/commonAside';
import CommonHeader from '../component/commonHeader';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RouterAuth } from '../router/routerAuth'

const { Content } = Layout;


const Main = () => {

  //获取主题色
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //获取展开收起的状态
  const collapsed = useSelector((state) => state.tab.isCollapse);

  return (
    <RouterAuth>
      <Layout className='main-container'>
        <CommonAside collapsed={collapsed} />

        <Layout>
          <CommonHeader collapsed={collapsed} />
          {/* <CommonTag/> */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>

  );
}

export default Main;