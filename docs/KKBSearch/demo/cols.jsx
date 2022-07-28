import React, { useEffect, useState } from 'react';
import { ConfigProvider } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import { KKBSearch, SEARCH_TYPE } from '@base/kkb-design';

const Clos = () => {
  const [boxData, setBoxKeyData] = useState([]);

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.input,
        label: '订单号',
        name: 'orderNo',
        span: 8,
        options: {
          placeholder: '请输入',
          allowClear: true,
        },
      },
      {
        type: SEARCH_TYPE.inputNumber,
        label: '手机号',
        name: 'phone',
        span: 8,
        options: {
          placeholder: '请输入',
        },
      },
      {
        type: SEARCH_TYPE.select,
        label: '审批状态',
        name: 'status',
        span: 8,
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
        type: SEARCH_TYPE.select,
        label: '所属销售',
        name: 'sale',
        span: 8,
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
        type: SEARCH_TYPE.select,
        label: '课程名称',
        name: 'courseName',
        span: 8,
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
        type: SEARCH_TYPE.select,
        label: '退款理由',
        name: 'refundRease',
        span: 8,
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
        type: SEARCH_TYPE.datePicker,
        label: '申请时间',
        name: 'applyDate',
        span: 16,
        options: {
          placeholder: '请选择日期',
          picker: 'date',
          disabledDate: (current) => {},
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty',
        span: 8,
      },
      {
        type: SEARCH_TYPE.datePicker,
        label: '审核通过时间',
        name: 'adoptDate',
        span: 16,
        options: {
          placeholder: '请选择日期',
          picker: 'date',
          disabledDate: (current) => {},
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty1',
        span: 8,
      },
    ];
    setBoxKeyData(boxDataType);
  };

  useEffect(() => {
    initVgeForm();
  }, []);

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <KKBSearch
          boxData={boxData} // 动态组件定义
          searchFn={(values) => console.log(values)} // 保存按钮回调
          searchResetFn={(values) => console.log(values)} // 重置按钮回调
        />
      </ConfigProvider>
    </div>
  );
};
export default Clos;
