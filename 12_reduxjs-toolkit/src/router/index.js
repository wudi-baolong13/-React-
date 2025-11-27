import { createBrowserRouter } from 'react-router-dom'
import Child from '../components/Child'
import App from '../App'
import Count from '../components/Count'
import ReText from '../components/ReText'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/child', element: <Child /> },
            { path: '/count', element: <Count /> },
            { path: '/retext', element: <ReText /> }
        ]
    },
    
]


export default createBrowserRouter(routes)