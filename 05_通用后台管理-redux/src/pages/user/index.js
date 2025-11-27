import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import './user.css';
import { getUser, editUser, addUser, delUser } from "../../api";

const User = () => {
  const [listData, setListData] = useState({
    name: '',
  })

  const [tableData, setTableData] = useState([])

  const [modalType, setModalType] = useState(0)  //弹窗的标题显示新增还是编辑

  const [isModalOpen, setIsModalOpen] = useState(false)  //弹窗是否显示

  const [form] = Form.useForm()  //创建form实例

  const handleClick = (type, rowData) => {  //点击新增或编辑按钮
    setIsModalOpen(!isModalOpen)
    if (type === 'add') {
      setModalType(0)
    } else {
      //编辑用户 要先把用户数据显示在弹窗中
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(cloneData.birth)
      //表单数据回填
      form.setFieldsValue(cloneData)
    }
  }

  const handleFinish = (e) => {  //提交表单
    setListData({
      name: e.keyword
    })
    console.log(e)
  }

  const hadleDelete = ({ id }) => {  //点击删除按钮
    delUser({ id }).then(() => {
      getTableData()
    })
  }

  const getTableData = () => {
    //调用后端接口，获取用户列表数据
    getUser(listData).then(({ data }) => {
      setTableData(data.list)
    })
  }

  //弹窗确定
  const handleOk = () => {
    //表单校验
    form.validateFields().then((values) => {
      //对日期进行格式化
      values.birth = dayjs(values.birth).format('YYYY-MM-DD')
      console.log(values)

      //调用后端接口，新增或编辑用户
      if (modalType) {
        //编辑用户
        editUser(values).then(() => {
          handleCancel()
          getTableData()
        })
        //新增用户
      } else {
        addUser(values).then(() => {
          handleCancel()
          getTableData()
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //弹窗取消
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (text) => {
        return text ? '女' : '男'
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birth'
    },
    {
      title: '地址',
      dataIndex: 'addr'
    },
    {
      title: '操作',
      render: (rowData) => {
        return (
          <div className='flex-box'>
            <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
            <Popconfirm
              title='提示'
              description='此操作将删除该用户，是否继续？'
              okText='确定'
              cancelText='取消'
              onConfirm={() => hadleDelete(rowData)}
            >
              <Button danger type='primary'>删除</Button>
            </Popconfirm>

          </div>
        )
      }
    }
  ]



  useEffect(() => {
    //调用后端接口，获取用户列表数据
    getTableData()
  }, [listData]) //当listData发生变化时，重新获取用户列表数据,从而实现搜索功能

  return (
    <div className='user'>
      <div className='flex-box space-between'>
        <Button type="primary" onClick={() => handleClick('add')}>新增</Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name='keyword'>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          
          <Form.Item>
            <Button htmlType='submit' type='primary'>搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={'id'} />
      <Modal
        open={isModalOpen}
        title={modalType ? '编辑用户' : '新增用户'}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确定'
        cancelText='取消'
      >

        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='left'

        >
          {
            modalType == 1 &&
            <Form.Item name='id' hidden>

            </Form.Item>
          }
          <Form.Item
            label='姓名'
            name='name'
            rules={[
              { required: true, message: '请输入姓名' },
            ]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label='年龄'
            name='age'
            rules={[
              { required: true, message: '请输入年龄' },
              { type: 'number', message: '年龄必须是数字' }
            ]}
          >
            <InputNumber placeholder='请输入年龄' />
          </Form.Item>
          <Form.Item
            label='性别'
            name='sex'
            rules={[
              { required: true, message: '性别是必选' },
            ]}
          >
            <Select
              placeholder='请选择性别'
              options={[
                { label: '男', value: 0 },
                { label: '女', value: 1 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label='出生日期'
            name='birth'
            rules={[
              { required: true, message: '请选择出生日期' },
            ]}
          >
            <DatePicker placeholder='请选择出生日期' format="YYYY/MM/DD"></DatePicker>
          </Form.Item>
          <Form.Item
            label='地址'
            name='addr'
            rules={[
              { required: true, message: '请输入地址' },
            ]}
          >
            <Input placeholder='请输入地址' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User;