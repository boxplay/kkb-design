

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KKBTable,
  KKBHeader,
  KKBContent,
  Input,
  Modal,
  ConfigProvider,
  Popconfirm,
} from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';
import { createFromIconfontCN, StepForwardOutlined } from '@ant-design/icons';
import { text, time, money, avatar, group, name } from '../../mock/index';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const Index = () => {
  const [dataSource, setdataSource] = useState([]);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [title, settitle] = useState('');
  const columns = [
    {
      title: '文本',
      dataIndex: 'text',
      key: 'text',
      width: 100,
      render(textValue) {
        return <Link to={'/'}>{textValue}</Link>
      }
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
      width: 140,
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

  function getRandomNumberByRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  useEffect(() => {
    const list = [];

    setLoading(true);
    for (let i = 0; i < (params?.size || 10); i += 1) {
      list.push({
        id: i,
        name: i % 2 === 1 ? name[getRandomNumberByRange(0, name.length)] : '',
        text: text[getRandomNumberByRange(0, text.length)] || 1,
        money: money[getRandomNumberByRange(0, money.length)] || 0,
        time:
          time[getRandomNumberByRange(0, time.length)] || new Date().valueOf(),
        avatar: avatar[getRandomNumberByRange(0, avatar.length)],
        group: group[getRandomNumberByRange(0, group.length)].value,
      });
    }
    setdataSource(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [params]);

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
    dataSource,
    rowKey: 'id',
    loading,
    onChange: (e, b) => {
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

  useEffect(() => {
    setValue('');
  }, [isModalVisible]);

  return (
    <ConfigProvider locale={zhCN}>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={() => setisModalVisible(false)}
        onCancel={() => setisModalVisible(false)}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '80px' }}>
            请输入:
          </div>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </Modal>
      <KKBHeader
        title="订单中心"
        breadcrumbList={list}
      />
      <KKBContent>
        <KKBTable
          tableProps={tableProps}
          paginationProps={{
            total: '87',
          }}
          handleProps={handleProps}
          onChange={(e) => {
            console.log('KKBTable onChange', e);
            setParams({
              ...params,
              ...e,
            });
          }}
        />
      </KKBContent>
    </ConfigProvider>
  );
};

export default Index;
