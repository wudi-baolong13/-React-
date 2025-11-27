import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import uerApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
//创建拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, uerApi.getUserList)


Mock.mock(/user\/addUser/,'post' ,uerApi.createUser)
Mock.mock(/user\/editUser/,'post' ,uerApi.updateUser)

Mock.mock(/user\/delUser/,'post' ,uerApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post' ,permissionApi.getMenu)