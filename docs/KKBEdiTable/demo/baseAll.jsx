import { Button, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { KKBEdiTable } from '@base/kkb-design'

const Index = () => {

  const [data, setData] = useState([])
  const ref = useRef()
  useEffect(()=>{
    const originData = [];
    for (let i = 0; i < 3; i++) {
      originData.push({
        id: i,
        name: `Edrward ${i}`,
        text: '这是一段很长很长很长很长很长很长很长很长很长很很长很长很长很长很长很长很长很长的文本',
        age: 32,
        fel: i % 2,
        time: moment((new Date()).valueOf()),
        old: i % 2
      });
    }
    setData(originData)
  }, [])

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
      width: 200,
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
    {
      title: '操作',
      dataIndex: 'setting',
      width: 200,
      afterEditRender: (props) => {
        const { record, rowKey } = props
        return (
          <>      
            <Button type='link' onClick={() => {ref.current.onDelete(record)}}>删除</Button>
          </>
        )
      },
      beforeEditRender: (props) => {
        const {editingKey, rowKey, record} = props
        return (
          <Button type='link' onClick={() => console.log(rowKey)}>
            查看
          </Button>
        )
      },
    },
  ];

  return (
    <>
      <Button onClick={() => {ref.current.onEdit()}}>编辑</Button>
      <Button onClick={() => {ref.current.onAllSave().then(res => {
        setData(res)
        ref.current.onCancel()
      })}}>保存</Button>
      <Button onClick={() => ref.current.onCancel()}>取消</Button>
      <KKBEdiTable 
        ref={ref}
        allEdit
        rowKey='id'
        multiple
        dataSource={data} 
        columns={columns}/>
      <Button onClick={()=>{
        ref.current.onAdd()
      }}>底部新增</Button>
    </>
  )
}

export default Index
