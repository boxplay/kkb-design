import React, { useState } from 'react';
import {
  KKBTable,
  KKBHeader,
  KKBContent,
  ConfigProvider,
  Popconfirm,
} from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const Index = () => {
  const [status, setStatus] = useState('');
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '文本',
      dataIndex: 'text',
      key: 'text',
      styleType: 'text',
      width: 300
    },
    {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      styleType: 'money',
      sorter: null,
      width: 132,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      styleType: 'time',
      width: 132,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      styleType: 'avatar',
      defaultAvatar: 'https://img.kaikeba.com/a/00046112401202kizt.png',
    },
    {
      title: '组别',
      width: 100,
      dataIndex: 'group',
      key: 'group',
      styleType: 'group',
      filteredValue: status || null,
      filters: [
        { text: '0%', value: 0 },
        { text: '20%', value: 1 },
        { text: '40%', value: 2 },
        { text: '60%', value: 3 },
        { text: '80%', value: 4 },
        { text: '100%', value: 5 },
      ],
      groupMapping: [
        {
          value: 0,
          label: '0%',
          color: 'red',
        },
        {
          value: 1,
          label: '20%',
          color: 'green',
        },
        {
          value: 2,
          label: '40%',
          color: 'blue',
        },
        {
          value: 3,
          label: '60%',
          color: 'skyblue',
        },
        {
          value: 4,
          label: '80%',
          color: 'pink',
        },
        {
          value: 5,
          label: '100%',
          icon: <IconFont type="icon-tuichu" />,
        },
      ],
    },
    {
      title: '操作',
      styleType: 'action',
      width: 150,
      actionList: [
        {
          id: 1,
          label: '编辑',
          onClick: (props) => {
            console.log(props);
          },
        },
        {
          id: 2,
          label: <span>删除</span>,
          onClick: (props) => {
            console.log(props);
          },
        },
        {
          id: 3,
          label: '详情',
          onClick: (props) => {
            console.log(props);
          },
        },
        {
          id: 4,
          label: '评论',
          onClick: (props) => {
            console.log(props);
          },
        },
        {
          label: (item) => (
            <Popconfirm
              title="请确认要删除该项目组吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                console.log(item);
              }}
            >
              <span>删除</span>
            </Popconfirm>
          ),
        },
      ],
    },
  ];


  const list = [
    {
      label: '订单管理',
      path: '/home',
    },
    {
      label: '订单中心',
      path: '/table/table',
    },
  ];

  const tableProps = {
    columns,
    dataSource: [],
    rowKey: 'id',
  };


  

  return (
    <ConfigProvider locale={zhCN}>
      <KKBHeader
        title="订单中心"
        breadcrumbList={list}
      />
      <KKBContent>
        <KKBTable
          tableProps={tableProps}
        />
      </KKBContent>
    </ConfigProvider>
  );
};

export default Index;
