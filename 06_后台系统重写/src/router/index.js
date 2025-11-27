//配置路由
import { createBrowserRouter } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'
import PageTwo from '../pages/other/pageTwo'
import Login from '../pages/login'
import Admin from '../pages/adminInfo'



const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/mall',
                Component: Mall
            },
            {
                path: '/user',
                Component: User
            },
            {
                path:'/admin',
                Component:Admin
            },
            {
                path: '/other',
                children: [
                    {
                        path: '/other/pageOne',
                        Component: PageOne
                    },
                    {
                        path: '/other/pageTwo',
                        Component: PageTwo
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    },
    
]


export default createBrowserRouter(routes)