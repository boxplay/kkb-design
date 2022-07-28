import React, { useEffect, useState } from 'react';
import { ConfigProvider, TreeSelect , KKBSearch, SEARCH_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';


const App = () => {
  const [boxData, setBoxKeyData] = useState([]);

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.input,
        label: '输入框',
        span: 8,
        name: 'basicName', // 只参数唯一值不可重复
        span: 16,
        options: {
          span: 8,
          placeholder: '请输入',
          allowClear: true,
        },
      },
      {
        type: SEARCH_TYPE.inputNumber,
        label: '数字输入框',
        name: 'basicNumber', // 只参数唯一值不可重复
        // span: 8,
        options: {
          placeholder: '请输入',
        },
      },
      {
        type: SEARCH_TYPE.searchSelect,
        label: '下拉',
        name: 'basicSelect',
        // span: 8,
        options: {
          placeholder: '请选择',
          allowClear: true,
        },
        data: [
          { label: 'hh', value: 1, disabled: true },
          { label: 'aa', value: 2 },
        ],
      },
      {
        type: SEARCH_TYPE.searchSelect, // BOX_TYPE.select下拉组件
        label: '搜索组件搜索',
        name: 'basicSearchSelect',
        // span: 8,
        data: [
          { value: 'male', label: 'male' },
          { value: 'female', label: 'female' },
          { value: '未知', label: '未知', disabled: true },
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
        // span: 8,
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
      {
        type: SEARCH_TYPE.treeSelect,
        label: '树',
        name: 'basicTreeSelect', // 只参数唯一值不可重复
        // span: 8,
        options: {
          placeholder: '请选择',
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              key: '0-0',
              children: [
                {
                  title: 'Child Node1',
                  value: '0-0-0',
                  key: '0-0-0',
                },
              ],
            },
            {
              title: 'Node2',
              value: '0-1',
              key: '0-1',
              children: [
                {
                  title: 'Child Node3',
                  value: '0-1-0',
                  key: '0-1-0',
                },
                {
                  title: 'Child Node4',
                  value: '0-1-1',
                  key: '0-1-1',
                },
                {
                  title: 'Child Node5',
                  value: '0-1-2',
                  key: '0-1-2',
                },
              ],
            },
          ],
        },
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
          defaultValue={{
            basicName: 'asdfghj',
          }}
          isPasteSearch={false}
        />
      </ConfigProvider>
    </div>
  );
};
export default App;
