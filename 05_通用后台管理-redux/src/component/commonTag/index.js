import React from 'react'
import { Tag, Space } from 'antd'
import './index.css'

export default function CommonTag() {
    const handleClose = () => {

    }
    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            <Tag>首页</Tag>
            <Tag color='#55acee' closeIcon onClose={() => handleClose()}>
                用户列表
            </Tag>
        </Space >
    )
}
