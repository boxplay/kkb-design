import { Button, Switch } from 'antd';
import moment from 'moment';
import  React, { useEffect, useState, useRef } from 'react';
import { KKBEdiTable } from '@base/kkb-design'

const Index = () => {

  const [data, setData] = useState([])
  const ref = useRef()
  useEffect(()=>{
    const originData = [];
    for (let i = 0; i < 3; i++) {
      originData.push({
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
      ediType: 'input',
      width: 200,
      rules: [{ required: true, message: `姓名必填!`}],
      defaultValue: '默认姓名'
    },
    {
      title: '文本',
      dataIndex: 'text',
      ediType: 'textArea',
      styleType: 'text',
      rules: [{ required: true, message: `文本必填!`}],
      defaultValue: '默认文本'
    },
    {
      title: '性别',
      dataIndex: 'fel',
      ediType: 'select',
      options: {
        options: options
      },
      render: (text) => {
        return options.map(item => {if (item.value === text) return item.label})
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      ediType: 'inputNumber',
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
      },
    },
    {
      title: '成年',
      dataIndex: 'old',
      width: 100,
      ediType: 'switch',
      afterEditRender: (props) => {
        return <Switch checked={props.text}/>
      },
       beforeEditRender: (props) => {
         const list =  ['未成年', '成年']
        return (
          <div>{list[props.text]}</div>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'setting',
      width: 280,
      afterEditRender: (props) => {
        const { record, rowKey } = props
        return (
          <>      
            <Button type='link' onClick={() => {ref.current.onSave(record)}}>保存</Button>
            <Button type='link' onClick={() => {ref.current.onDelete(record)}}>删除</Button>
            <Button type='link' onClick={() => ref.current.onCancel(record)}>取消</Button>
          </>
        )
      },
      beforeEditRender: (props) => {
        const {editingKey, rowKey, record} = props
        return (
          <Button type='link' onClick={() => ref.current.onEdit(record)}>
            编辑
          </Button>
        )
      },
    },
  ];

  return (
    <>
      <KKBEdiTable 
        ref={ref}
        rowKey={(record) => {
          return record.name}
        }
        rowSave={async (record) => {
          console.log(record)
          return true
        }}
        multiple={true}
        dataSource={data} 
        columns={columns}/>
      <Button onClick={()=>{
        ref.current.onAdd()
      }}>底部新增</Button>
    </>
  )
}

export default Index
