import React, { useEffect, useState } from 'react';
import {
  KKBTable,
  KKBHeader,
  SEARCH_TYPE,
  Tabs,
  KKBContent,
} from '@base/kkb-design';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { createFromIconfontCN } from '@ant-design/icons';
import { text, time, money, avatar, group, name } from '../../mock/index';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const { TabPane } = Tabs;
const Index = () => {
  const [dataSource, setdataSource] = useState([]);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      styleType: 'name',
      width: 100,
    },
    {
      title: '文本',
      dataIndex: 'text',
      key: 'text',
      styleType: 'text',
    },
    {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      styleType: 'money',
      sorter: true,
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
      width: 250,
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
          id: 5,
          label: '复制',
          onClick: (props) => {
            console.log(props);
          },
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
        name: name[getRandomNumberByRange(0, name.length)],
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
      id: 1,
      label: '订单管理',
      path: '/home',
    },
    {
      id: 3,
      label: '订单中心',
      path: '/table/table',
    },
  ];

  const tableProps = {
    columns,
    dataSource,
    rowKey: 'id',
    loading,
    onChange: (e, b, c) => {
      setStatus(b.group);
      console.log(e, b, c);
      setParams({
        ...params,
        status: b.group,
      });
    },
  };

  const paginationProps = {
    total: 87,
  };
  const searchProps = {
    boxData: [
      {
        type: SEARCH_TYPE.input,
        label: '带搜索框',
        name: 'basicName', // 只参数唯一值不可重复
        options: {
          placeholder: '请输入搜索内容',
          allowClear: true,
        },
      },
      {
        type: SEARCH_TYPE.inputNumber,
        label: '数字输入框',
        name: 'basicNumber', // 只参数唯一值不可重复
        options: {
          placeholder: '请输入',
        },
      },
      {
        type: SEARCH_TYPE.select,
        label: '下拉',
        name: 'basicSelect',
        options: {
          placeholder: '请选择',
          allowClear: true,
        },
        data: [
          { label: 'hh', value: 1 },
          { label: 'aa', value: 2 },
        ],
      },
      {
        type: SEARCH_TYPE.searchSelect, // BOX_TYPE.select下拉组件
        label: '搜索组件',
        name: 'basicSearchSelect',
        data: [
          { value: 'male', label: 'male' },
          { value: 'female', label: 'female' },
        ],
        options: {
          placeholder: '请选择',
          allowClear: true, // 支持清除
          mode: 'multiple', // 设置 Select 的模式为多选或标签
        },
      },
      {
        type: SEARCH_TYPE.cascader,
        label: '级联',
        name: 'basicCascader', // 只参数唯一值不可重复
        options: {
          allowClear: true,
          placeholder: '请选择',
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
    searchFn: (values) => {
      setParams({ ...values, ...params });
      console.log(params);
    }, // 搜索按钮回调
    searchResetFn: (values) => setParams({ ...values }), // 重置按钮回调
    defaultValue: {
      basicName: '默认数据',
    },
  };

  const options = [
    { label: '全部', value: '全部' },
    { label: '已接通', value: '已接通' },
    { label: '未接通', value: '未接通' },
  ];
  const handleProps = {
    leftArea: [
      {
        id: 0,
        label: '操作',
        options: {
          defaultValue: 'Apple',
          name: 'radio',
          options,
          optionType: 'button',
        },
      },
    ],
    rightArea: [
      {
        id: 1,
        label: '+ 新增',
        onClick: () => {
          console.log('新增');
        },
        options: { disabled: true },
        // render: () => {
        //   return (
        //     <Button
        //       onClick={() => {
        //         console.log(11);
        //       }}
        //     >
        //       aaa
        //     </Button>
        //   );
        // },
      },
      {
        id: 2,
        label: '操作1',
        onClick: () => {
          console.log('操作1');
        },
      },
      {
        id: 3,
        label: '操作2',
        onClick: () => {
          console.log('操作2');
        },
      },
      {
        id: 4,
        label: '操作3',
        onClick: () => {
          console.log('操作3');
        },
      },
    ],
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <KKBHeader
        title="订单中心"
        description="页面内容简介，用来解释当前页面的内容（可无）"
        breadcrumbList={list}
      />
      <div>
        <Tabs defaultActiveKey="1" commonstyle>
          <TabPane tab="选中项" key="1">
            <KKBContent>
              <KKBTable
                searchProps={searchProps}
                tableProps={tableProps}
                paginationProps={paginationProps}
                handleProps={handleProps}
                onChange={(e) => {
                  setParams({
                    ...params,
                    ...e,
                  });
                }}
              />
            </KKBContent>
          </TabPane>
          <TabPane tab="可选项" key="2">
            <KKBContent>
              <KKBTable
                searchProps={searchProps}
                tableProps={tableProps}
                paginationProps={paginationProps}
                handleProps={handleProps}
                onChange={(e) => {
                  setParams({
                    ...params,
                    ...e,
                  });
                }}
              />
            </KKBContent>
          </TabPane>
          <TabPane tab="不可选项" disabled key="3">
            <KKBContent>
              <KKBTable
                searchProps={searchProps}
                tableProps={tableProps}
                paginationProps={paginationProps}
                handleProps={handleProps}
                onChange={(e) => {
                  setParams({
                    ...params,
                    ...e,
                  });
                }}
              />
            </KKBContent>
          </TabPane>
        </Tabs>
      </div>
    </ConfigProvider>
  );
};

export default Index;
