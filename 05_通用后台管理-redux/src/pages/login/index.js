import React from 'react'
import { Form, Input, Button, message } from 'antd'
import './login.css'
import { getMenu } from '../../api'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    if (localStorage.getItem('token')) {
        return <Navigate to='/home'></Navigate>
    }
    const handleSubmit = (val) => {
        if (!val.username || !val.password) {
            return message.open({
                type: 'warning',
                content: '请输入账号或密码'
            })
        }

        getMenu(val).then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.data.token)
            if (data.code > 0) navigate('/home')
            else {
                return message.open({
                    type: 'error',
                    content: '账号或密码错误'
                })
            }

        })

    }
    return (
        <Form className='login-container' onFinish={handleSubmit}>
            <div className='login_title'>
                系统登录
            </div>
            <Form.Item
                label='账号'
                name="username"
            >
                <Input placeholder='请输入账号'></Input>
            </Form.Item>

            <Form.Item
                label='密码'
                name="password"
            >
                <Input placeholder='请输入密码'></Input>
            </Form.Item>

            <Form.Item className='login-button'>
                <Button type='primary' htmlType='submit'>登录</Button>
            </Form.Item>
        </Form>
    )
}


export default Login
