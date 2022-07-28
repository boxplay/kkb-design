import React, { useState } from 'react';
import {
  KKBTable,
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
  const [params, setParams] = useState({});
  const [status, setStatus] = useState('');
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      // styleType: 'name',
      width: 200,
      fixed: 'left',
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
      fixed: 'right',
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
  // 固定数据
  const dataSource = [{
    id: 0,
    name: '熊宝儿',
    text: 'Boa',
    money: 666.66,
    time: '2022-04-12 16:17:01',
    avatar: 'https://img1.baidu.com/it/u=3483534024,40664929&fm=26&fmt=auto&gp=0.jpg',
    group: 3,
  },  
  {
    id: 1,
    name: '强尼',
    text: '长文本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本',
    money: 20.42,
    time: '2022-04-11 1:41:11',
    avatar:  'https://img1.baidu.com/it/u=2796144188,439704386&fm=26&fmt=auto&gp=0.jpg',
    group: 5,
  },
  {
    id: 2,
    name: '嘉怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡怡',
    text: 'Joanna',
    money: 4924795.66,
    time: '2022-04-10 13:53:14',
    avatar: 'https://img0.baidu.com/it/u=3324287611,3832720410&fm=26&fmt=auto&gp=0.jpg',
    group: 0,
  },]; 

  const tableProps = {
    columns,
    dataSource,
    rowKey: 'id',
    onChange: (e, b, c) => {
      setStatus(b.group);
      setParams({
        ...params,
        status: b.group,
      });
    },
  };

  const handleProps = {
    leftArea: [],
  };

  return (
    <ConfigProvider locale={zhCN}>
       <KKBTable
          tableProps={tableProps}
          paginationProps={{
            total: '3',
          }}
          handleProps={handleProps}
          onChange={(e) => {
            setParams({
              ...params,
              ...e,
            });
          }}
        />
    </ConfigProvider>
  );
};

export default Index;
