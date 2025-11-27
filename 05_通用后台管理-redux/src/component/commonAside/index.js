import React from 'react'
import MenuConfig from '../../config'
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout;

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

//处理菜单的数据
const items = MenuConfig.map(item => {
  //没有子菜单
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



const CommonAside = ({ collapsed }) => {

  const navigate = useNavigate()

  const selectMenu = (e) => {
    console.log(e)
    let data
    MenuConfig.forEach(item => {
      // 找到当前的数据
      if(item.path===e.keyPath[e.keyPath.length-1]){//无子菜单
        data = item

        if(e.keyPath.length>1){
          data=item.children.find(child=>{
            return child.path==e.key
          })
        }
      }
    })
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className='app-name'>{collapsed ? '后台' : '后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%',
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside