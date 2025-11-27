import React from 'react'
import { Badge, Descriptions } from 'antd';

export default function Admin() {

    const items = [
  {
    key: '1',
    label: '管理员',
    children: 'admin',
  },
  {
    key: '2',
    label: '密码',
    children: 'admin',
  },
  {
    key: '3',
    label: 'Ip地址',
    children: '北京',
  },
  {
    key: '4',
    label: '上线时间',
    children: '2022-08-01 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="在线" />,
    span: 3,
  },
  {
    key: '7',
    label: '用户数量',
    children: '30',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];
  return (
    <Descriptions title="User Info" bordered items={items} />
  )
}
