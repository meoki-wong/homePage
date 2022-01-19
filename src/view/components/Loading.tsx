import React from 'react'
import {Space, Spin} from 'antd'



export default function Loading() {
    return (
        <div>
            <Space size="middle">
                <Spin size="large"></Spin>    
            </Space>            
        </div>
    )
}
