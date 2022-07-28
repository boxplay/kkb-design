import React, { useEffect, useRef, useState } from 'react';
import {
  KKBTable,
  SEARCH_TYPE,
  KKBContent,
  Input,
  Modal,
  ConfigProvider,
  Popconfirm,
} from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';
import moment from 'moment';
import { createFromIconfontCN, StepForwardOutlined } from '@ant-design/icons';
import { text, time, money, avatar, group, name } from '../../mock/index';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const Index = () => {
  const Formref = useRef()
  const [dataSource, setdataSource] = useState([]);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [title, settitle] = useState('');
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      styleType: 'name',
      width: 100,
      fixed: 'left'
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
      sorter: null,
      width: 132,
      defaultVisible: false
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      styleType: 'time',
      width: 132,
      defaultVisible: false
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
      width: 200,
      fixed: 'right',
      actionList: [
        {
          id: 1,
          label: '编辑',
          onClick: (props) => {
            console.log(props);
          }
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

  const tableProps = {
    columns,
    dataSource,
    rowKey: 'id',
    loading,
    onChange: (e, b, c) => {
      setStatus(b.group);
      setParams({
        ...params,
        status: b.group,
      });
    },
  };


  const searchProps = {
    resetPageSize: true,
    ref: Formref,
    boxData: [
      {
        type: SEARCH_TYPE.searchSelect,
        label: '带搜索框',
        name: 'basicName', // 只参数唯一值不可重复
        span:12,
        options: {
          placeholder: '请输入搜索内容',
          allowClear: true,
          style:{width: '200px'}
        },
      },
      {
          type: SEARCH_TYPE.select,
          label: '性别',
          name: 'basic_gender',
          options: {
            size: 'middle', // 大小 large | middle | small
            placeholder: '请输入',
            optionType: 'button', // 风格样式 default | button
             onChange: () => {
              Formref.current.setValue({'basicName': null})
            },
          },
          // 选项数据
          data: [
            { value: '1', label: '男生1' },
            { value: '2', label: '女生2' },
            { value: '3', label: '未知', disabled: true },
          ],
        },
      {
        type: SEARCH_TYPE.datePicker,
        label: '日期',
        span: 16,
        name: 'date',
        span: 16,
        options: {
          placeholder: '请选择日期',
          picker: 'date', // date | week | month | quarter | year
          disabledDate: (current) => {
            return current && current < moment().endOf('day');
          },
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
          {
            label: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
            value: 1,
          },
          { label: 'aa', value: 2 },
        ],
      },
      {
        type: SEARCH_TYPE.searchSelect, // BOX_TYPE.select下拉组件
        label: '搜索组件',
        name: 'basicSearchSelect',
        data: [
          { value: '1', label: 'male' },
          { value: '2', label: 'female' },
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
    defaultValue: {
      basicName: '默认数据',
    },
  };

  useEffect(() => {
    setValue('');
  }, [isModalVisible]);
  const handleProps = {
    rightArea: [
        {
            id: 1,
            label: '+ 操作按钮操作按钮',
            onClick: () => {
            settitle('新增');
            setisModalVisible(true);
            },
        },
    ],
    leftArea: [],
  };
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
      <KKBContent>
        <KKBTable
          searchProps={searchProps}
          miniSearch={true}
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
