import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'
import PageTwo from '../pages/other/pageTwo'
import Login from '../pages/login'


const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            //路由重定向
            {
                index: true,
                element: <Navigate to='login' replace />
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component: PageOne
                    },
                    {
                        path: 'pageTwo',
                        Component: PageTwo
                    }
                ]
            },


        ]
    },
    {
        path: '/login',
        Component: Login
    }
]

export default createBrowserRouter(routes)