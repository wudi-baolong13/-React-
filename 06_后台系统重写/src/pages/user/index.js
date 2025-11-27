import React,{useState,useEffect, useRef} from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd';
import { getUser, editUser, addUser, delUser } from "../../api";
import dayjs from 'dayjs';
import './index.css'

export default function User() {
  const[tableData,setTableData]=useState([])
  const[listData,setListData]=useState({
    name:'',
  })

  const [modalType,setModalType]=useState(0) //弹窗标题为新增还是编辑
  const[isModalOpen,setIsModalOpen]=useState(false)

  const [form]=Form.useForm() //创建form实例

  const handleDelete=({id})=>{
    
    delUser({id}).then(()=>{  //delUser接受的是一个对象,所以要把解构出来的id包装成一个对象
      getTableData()
    })

  }

  const getTableData=()=>{
    //通过后端接口,获取用户列表数据
    getUser(listData).then(({data})=>{
      setTableData(data.list)
    })
  }

  useEffect(()=>{
    //[]为空,则页面第一次挂载的时候执行函数
    getTableData()

  },[listData])  

  
  const handleClick = (type,rowData) => { //处理按钮点击事件，根据不同type执行新增或编辑操作
    setIsModalOpen(!isModalOpen)
    if(type==='add'){
      setModalType(0)
    }else{
      //把数据显示在编辑框中
      setModalType(1)
      const cloneData=JSON.parse(JSON.stringify(rowData))
      cloneData.birth=dayjs(cloneData.birth)
      form.setFieldsValue(cloneData)
    }
  }

  const handleFinish = (values) => {  //表单提交事件
    setListData({
      name:values.username
    })
    
  }

  const handleOk=()=>{
    form.validateFields().then((values)=>{
      values.birth=dayjs(values.birth).format('YYYY-MM-DD')
      console.log(values)

      if(modalType){
        editUser(values).then(()=>{
          handleCancel()
          getTableData()
        })
      }else{
        addUser(values).then(()=>{
          handleCancel()
          getTableData()
        })
      }

    }).catch(err=>{
      console.log(err)
    })
    
    

  }

  const handleCancel=()=>{
    setIsModalOpen(!isModalOpen)
    form.resetFields()

  }

    const columns=[   //对表格的第一行进行配置
    {
      title:'姓名',
      dataIndex:'name'
    },
    {
      title:'年龄',
      dataIndex:'age'
    },
   {
      title:'性别',
      dataIndex:'sex',
      render:(text)=>{
        return text?'女':'男'
      }
    },
    {
      title:'出生日期',
      dataIndex:'birth'
    },
    {
      title:'地址',
      dataIndex:'addr'
    },
    {
      title:'操作',
      render:(rowData)=>{
        return(
          <div className='flex-box'>
            <Button style={{marginRight:'5px'}} onClick={()=>handleClick('edit',rowData)}>编辑</Button>
            <Popconfirm
            title='提示'
            description='此操作将删除该用户,是否继续?'
            okText='确定'
            cancelText='取消'
            onConfirm={()=>handleDelete(rowData)}
            >
              <Button danger type='primary'>删除</Button>

            </Popconfirm>
          </div>
        )
      }
    },
  ]

  return (
    <div className='user'>
      <div className='flex-box space-between'>
        <Button type='primary' onClick={()=>handleClick('add')}>新增</Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name='username'>
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>

        </Form>
      </div>
      <Table columns={columns} dataSource={tableData}  rowKey={'id'}/>

      <Modal
      open={isModalOpen}
      title={modalType?'编辑用户':'新增用户'}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
      >
        <Form
        form={form}
        labelCol={{span:6}}
        wrapperCol={{span:18}}
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
            {required:true,message:'请输入姓名'},
          ]}
          >
            <Input placeholder='请输入姓名'/>

          </Form.Item>

          <Form.Item
          label='年龄'
          name='age'
          rules={[
            {required:true,message:'请输入年龄'},
          ]}
          >
            <Input placeholder='请输入年龄'/>

          </Form.Item>

           <Form.Item
          label='性别'
          name='sex'
          rules={[
            {required:true,message:'性别是必选项'},
          ]}
          >
            <Select
            placeholder='请选择性别'
            options={[
              {label:'男',value:0},
              {label:'女',value:1},
            ]}
            />

          </Form.Item>

          <Form.Item
          label='出生日期'
          name='birth'
          rules={[
            {required:true,message:'请选择出生日期'},
          ]}
          >
            <DatePicker placeholder='请选择出生日期' format="YYYY/MM/DD"/>
          </Form.Item>

          <Form.Item
          label='地址'
          name='addr'
          rules={[
            {required:true,message:'请输入地址'},
          ]}
          >
            <Input placeholder='请输入地址'/>
          </Form.Item>

        </Form>
      </Modal>

      
    </div>
  )
}
