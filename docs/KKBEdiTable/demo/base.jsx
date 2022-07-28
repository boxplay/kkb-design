import { KKBEdiTable } from '@base/kkb-design'
import { Button, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const originData = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i,
    name: `Edrward ${i}`,
    text: '这是一段很长很长很长很长很长很长很长很长很长很很长很长很长很长很长很长很长很长的文本',
    age: 32,
    fel: i % 2,
    time: moment((new Date()).valueOf()),
    old: i % 2
  });
}

const Index = () => {

  const [data, setData] = useState(originData || [])
  const options = [
    {
      label: '男',
      value: 0,
    },
    {
      label: '女',
      value: 1,
    }
  ]
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      ediType: 'input',
      rules: [{ required: true, message: `xxx!`}]
    },
    {
      title: '文本',
      dataIndex: 'text',
      ediType: 'textArea',
      styleType: 'text'
    },
    {
      title: '性别',
      dataIndex: 'fel',
      width: '15%',
      ediType: 'select',
      options: {
        options
      },
      render: (text) => {
        return options.map(item => {if (item.value === text) return item.label})
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '10%',
    },
    {
      title: '时间',
      dataIndex: 'time',
      styleType: 'time',
      width: 300,
      ediType: 'rangePicker',
      options: {
        format: "YYYY-MM-DD HH:mm", // 设置日期格式 默认 YYYY-MM-DD
        allowClear: true, // 是否展示清除按钮
      }
    },
    {
      title: '成年',
      dataIndex: 'old',
      width: 100,
      ediType: 'switch',
      render: (text) => {
        return <Switch checked={text}/>
      },
    },
  ];
  return (
    <>
    <KKBEdiTable 
      onSave={(params)=>{
        const newData = [...data]
        const index = newData.findIndex(item => params.data.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...params.data,
        })
        setData(newData)
        return true
      }}
      ediType="cellEdit"
      dataSource={data} 
      columns={columns}/>
    </>
  )
}

export default Index
